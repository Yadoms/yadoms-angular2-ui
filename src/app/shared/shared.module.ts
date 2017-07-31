import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DurationPipe } from './duration.pipe';
import { DateIsoPipe } from './dateiso.pipe';
import { OpacifyDirective } from './opacify.directive';
import { FlightTimePipe } from './flighttime.pipe';
import { FileSizePipe } from './filesize.pipe';
import 'materialize-css';
import { MaterializeModule } from 'angular2-materialize';
import { AircraftIconPipe } from './aircraft.icon.pipe';

@NgModule({
  imports:      [ CommonModule, MaterializeModule ],
  declarations: [ DurationPipe, DateIsoPipe, OpacifyDirective, FlightTimePipe, FileSizePipe, AircraftIconPipe ],
  exports:      [ CommonModule, FormsModule, DurationPipe, DateIsoPipe, OpacifyDirective, FlightTimePipe, FileSizePipe, AircraftIconPipe, MaterializeModule ]
})
export class SharedModule { }
