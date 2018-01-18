import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';
import { HomeComponent } from './home.component';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './dashboard/page.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
    MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
    MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
    MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
    MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatSlideToggleModule,
    MatPseudoCheckboxModule, MatProgressSpinnerModule } from '@angular/material';

import { MAT_MOMENT_DATE_FORMATS, MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { AppDateAdapter } from './../app.dates';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [CommonModule, routing, TranslateModule, SharedModule, NgxPageScrollModule,
        MatSnackBarModule,
        MatButtonModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatButtonToggleModule, MatCardModule,
        MatIconModule, MatLineModule, MatListModule, MatMenuModule, MatSortModule, MatTabsModule, MatChipsModule, MatInputModule,
        MatRadioModule, MatTableModule, MatCommonModule, MatDialogModule, MatOptionModule, MatRippleModule, MatSelectModule,
        MatSliderModule, MatSidenavModule, MatStepperModule, MatToolbarModule, MatTooltipModule, MatGridListModule, MatExpansionModule,
        MatFormFieldModule, MatPaginatorModule, MatDatepickerModule, MatMomentDateModule, MatProgressBarModule, MatSlideToggleModule,
        MatPseudoCheckboxModule, MatProgressSpinnerModule,
        FlexLayoutModule],
    exports: [],
    declarations: [ HomeComponent, DashboardComponent, PageComponent ],
    providers: [
        { provide: DateAdapter, useValue: AppDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})
export class HomeModule {
    constructor() {
        console.log('Home module CTOR');
    }
}
