import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { NgModule, ApplicationRef, APP_INITIALIZER } from '@angular/core';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { RouterModule, PreloadAllModules, RouteReuseStrategy } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
         MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
         MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
         MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
         MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatSlideToggleModule,
         MatPseudoCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import {MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { AppDateAdapter } from './app.dates';

import { FlexLayoutModule } from '@angular/flex-layout';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { NoContentComponent } from './no-content';
import { CheckServerComponent } from './check/check-server.component';
import { CoreModule } from './core';
import { RuntimeConfigurationService } from './runtime.configuration.service';
import { SharedModule } from './shared/shared.module';
import { CookieModule } from 'ngx-cookie';

import '../styles/styles.scss';
import '../styles/headings.css';
import { CustomReuseStrategy } from './app.reuse.strategy';

/**
 * Load the runtime confiuguration
 * @param rcs The runtime configuration service
 */
export function loadRuntimeConfiguration(rcs: RuntimeConfigurationService) {
  return () => rcs.load();
}

/**
 * Export this function to allow TranslateModule initilizing in AOT mode
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NoContentComponent,
    CheckServerComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules, enableTracing: false }),
    TranslateModule.forRoot({loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }}),
    CoreModule.forRoot(),
    SharedModule,
    CookieModule.forRoot(),
    MatSnackBarModule,
    MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
    MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
    MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
    MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
    MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatMomentDateModule, MatProgressBarModule, MatSlideToggleModule,
    MatPseudoCheckboxModule, MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  exports: [
    TranslateModule,
    MatSnackBarModule,
    MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
    MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
    MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
    MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
    MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatSlideToggleModule,
    MatPseudoCheckboxModule, MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    AppState,
    RuntimeConfigurationService,
    { provide: APP_INITIALIZER, useFactory: loadRuntimeConfiguration, deps: [RuntimeConfigurationService], multi: true },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    { provide: DateAdapter, useValue: AppDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS }
  ]
})
export class AppModule {
}
