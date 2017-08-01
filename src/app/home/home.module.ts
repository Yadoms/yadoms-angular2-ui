import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './home.routing';
import { HomeComponent } from './home.component';
import { Ng2PageScrollModule } from 'ng2-page-scroll';
import { TranslateModule } from 'ng2-translate';
import { CoreModule } from '../core';
import { SharedModule } from '../shared';

@NgModule({
    imports: [CommonModule, routing, TranslateModule, SharedModule, Ng2PageScrollModule.forRoot()],
    exports: [],
    declarations: [ HomeComponent, ],
    providers: []
})
export class HomeModule {
    constructor() {
        console.log('Home module CTOR');
    }
}
