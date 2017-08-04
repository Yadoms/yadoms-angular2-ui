import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevFakeWidgetComponent } from './dev-fake-widget.component';

@NgModule({
  imports:      [ CommonModule ],
  exports: [  DevFakeWidgetComponent ],
  declarations: [  DevFakeWidgetComponent ]
})
export class DevFakeWidgetModule {
}
