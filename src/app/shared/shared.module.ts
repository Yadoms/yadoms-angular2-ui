import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DurationPipe} from './duration.pipe';
import {DateIsoPipe} from './dateiso.pipe';
import {FileSizePipe} from './filesize.pipe';
import {PluginInstancesFilterPipe} from './plugin-instances-filter.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [DurationPipe, DateIsoPipe, FileSizePipe, PluginInstancesFilterPipe],
  exports: [CommonModule, FormsModule, DurationPipe, DateIsoPipe, FileSizePipe, PluginInstancesFilterPipe]
})
export class SharedModule {
}
