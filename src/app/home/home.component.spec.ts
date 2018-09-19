import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture } from '@angular/core/testing';
// Other imports
import { TestBed } from '@angular/core/testing';

// Load the implementations that should be tested
import { AppState } from '../app.service';
import { HomeComponent } from './home.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routing } from './home.routing';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
  MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
  MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
  MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
  MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatSlideToggleModule,
  MatPseudoCheckboxModule, MatProgressSpinnerModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PageComponent } from './page/page.component';
import { SystemComponent } from './administration/system/system.component';
import { PluginsComponent } from './administration/plugins/plugins.component';
import { DevicesComponent } from './administration/devices/devices.component';
import { AutomationComponent } from './administration/automation/automation.component';
import { RecipientsComponent } from './administration/recipients/recipients.component';
import { UpdateComponent } from './administration/update/update.component';
import { MaintenanceComponent } from './administration/maintenance/maintenance.component';
import { AboutComponent } from './administration/about/about.component';
import { WidgetComponent } from './widget/widget.component';
import { PluginHostDirective } from './widget/plugin-host.directive';
import { RouterTestingModule } from '@angular/router/testing';
import { RestServerService } from '../core/restserver.service';
import { CoreModule } from '../core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

class RestServerServiceMockup {
  async get() {
    return null;
  }
}

describe(`Home`, () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent, PageComponent, SystemComponent, PluginsComponent, DevicesComponent, AutomationComponent, RecipientsComponent, UpdateComponent, MaintenanceComponent, AboutComponent, WidgetComponent, PluginHostDirective],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ CommonModule, TranslateModule, SharedModule, NgxPageScrollModule,RouterTestingModule, CoreModule,NoopAnimationsModule, HttpClientTestingModule,
        MatSnackBarModule,
        MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
        MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
        MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
        MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
        MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatMomentDateModule, MatProgressBarModule, MatSlideToggleModule,
        MatPseudoCheckboxModule, MatProgressSpinnerModule,
        FlexLayoutModule, TranslateModule.forRoot({loader: { provide: TranslateLoader, useFactory: (createTranslateLoader), deps: [HttpClient] }})  ],
      providers: [
        AppState,
        { provide: RestServerService, useClass:RestServerServiceMockup }
      ]
    })
      .compileComponents(); // compile template and css
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;

    fixture.detectChanges(); // trigger initial data binding
  });


  it('should log ngOnInit', () => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    comp.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  });

});
