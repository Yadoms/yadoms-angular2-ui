import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { TranslateModule, TranslateStaticLoader, TranslateLoader } from 'ng2-translate';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';
import { CheckServerComponent } from './check/check-server.component';
import { LoginComponent } from './login/login.component';
import { CoreModule } from './core';
import { BrowserXhr } from '@angular/http';
import { CustomBrowserXhr } from './http/custom.browser.xhr.service';
import { HttpProgressService } from './http/http.progress.service';
import { RuntimeConfigurationService } from './runtime.configuration.service';
import { SharedModule } from './shared/shared.module';

import '../styles/styles.scss';
import '../styles/headings.css';

export function loadRuntimeConfiguration(rcs: RuntimeConfigurationService) {
  return () => rcs.load();
}

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  RuntimeConfigurationService,
  {
      provide: APP_INITIALIZER,
      useFactory: loadRuntimeConfiguration,
      deps: [RuntimeConfigurationService],
      multi: true
  }
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

/**
 * Export this function to allow TranslateModule initilizing in AOT mode
 */
export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    NoContentComponent,
    CheckServerComponent,
    LoginComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules, enableTracing: false }),
    TranslateModule.forRoot({ provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [Http] }),
    CoreModule.forRoot(),
    SharedModule
  ],
  exports: [
    TranslateModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState ) {
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
