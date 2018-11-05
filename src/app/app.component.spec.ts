import { NO_ERRORS_SCHEMA } from '@angular/core';
import { inject, async, TestBed, ComponentFixture } from '@angular/core/testing';
import { BaseRequestOptions, ConnectionBackend, Http } from '@angular/http';

// Load the implementations that should be tested
import { AppComponent } from './app.component';
import { AppState } from './app.service';
import { CoreModule } from './core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SharedModule } from './shared';
import { CommonModule } from '@angular/common';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

TranslateModule.forRoot({loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }}),
describe(`AppComponent`, () => {
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientModule,
        TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }}),
        CoreModule.forRoot()],
      providers: [AppState,
        TranslateModule,
        SharedModule,
        CommonModule]
    })
    .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });

  it(`should be readly initialized`, () => {
    expect(fixture).toBeDefined();
    expect(comp).toBeDefined();
  });

  it(`should be the Yadoms logo`, () => {
    expect(comp.yadomsLogo).toEqual('assets/img/logo.png');
    expect(comp.name).toEqual('GSS Mobile');
  });

  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
