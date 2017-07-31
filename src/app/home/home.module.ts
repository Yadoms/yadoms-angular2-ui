import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErtValidationComponent } from './dashboard/components/ert-validation.component';
import { FullOperatingGroupListComponent } from './dashboard/components/full-operating-group-list.component';
import { FullOperatingGroupComponent } from './dashboard/components/full-operating-group.component';
import { FullOperatingComponent } from './dashboard/components/full-operating.component';
import { WhatsNewComponent } from './dashboard/whatsnew/whatsnew.component';
import { DashboardMapComponent } from './dashboard/map/map.component';
import { SummaryComponent } from './dashboard/summary/summary.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { TranslateModule } from 'ng2-translate';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { UsageComponent } from './usage/usage.component';
import { ChartComponent } from './usage/chart.component';
import { RawDataComponent } from './usage/raw-data.component';
import { OperatingDisplayComponent } from './usage/operating.display.component';
import { SdBs2BrowseComponent } from './import/sdbs2.browse.component';
import { UploadComponent } from './import/upload.component';
import { ImportComponent } from './import/import.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
    imports: [CommonModule, routing, TranslateModule, SharedModule, InfiniteScrollModule,
    Ng2PageScrollModule.forRoot(), ChartsModule],
    exports: [ChartsModule],
    declarations: [ HomeComponent, DashboardComponent, ErtValidationComponent,
                    FullOperatingGroupListComponent, FullOperatingGroupListComponent,
                    FullOperatingGroupComponent, FullOperatingComponent,
                    UsageComponent, OperatingDisplayComponent, SdBs2BrowseComponent,
                    UploadComponent, ImportComponent, ConfigurationComponent, ChartComponent, RawDataComponent,
                    WhatsNewComponent, SummaryComponent, DashboardMapComponent],
    providers: []
})
export class HomeModule {
    constructor() {
        console.log('Home module CTOR');
    }
}
