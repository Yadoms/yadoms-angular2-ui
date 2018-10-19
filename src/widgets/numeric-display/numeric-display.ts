import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'yd-plugin-component',
  template: `
    <p>
      lazy works! {{data}}
    </p>
  `
})
export class PluginComponent implements OnInit {
  type: "PluginComponent";
  data: string = "Hello!";

  ngOnInit() {
  }

}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ PluginComponent ],
  entryComponents: [ PluginComponent ]
})
export class PluginModule { }
