import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './duration.pipe';
import { DateIsoPipe } from './dateiso.pipe';
import { OpacifyDirective } from './opacify.directive';
import { FileSizePipe } from './filesize.pipe';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';

@NgModule({
  imports:      [ CommonModule, MaterializeModule ],
  declarations: [ DurationPipe, DateIsoPipe, OpacifyDirective, FileSizePipe, ],
  exports:      [ CommonModule, FormsModule, DurationPipe, DateIsoPipe, OpacifyDirective, FileSizePipe, MaterializeModule ]
})
export class SharedModule { }
