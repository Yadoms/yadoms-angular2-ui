import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';
import { HomeComponent } from './home.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { TranslateModule } from 'ng2-translate';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageComponent } from './dashboard/page.component';
import { DclWrapperComponent } from './widget-wrapper.component';

@NgModule({
    imports: [CommonModule, routing, TranslateModule, SharedModule, Ng2PageScrollModule.forRoot()],
    exports: [],
    declarations: [ HomeComponent, DashboardComponent, PageComponent, DclWrapperComponent ],
    providers: []
})
export class HomeModule {
    constructor() {
        console.log('Home module CTOR');
    }
}
