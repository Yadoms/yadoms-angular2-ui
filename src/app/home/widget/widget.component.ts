import { Component, OnInit, Input, Compiler, Injector, Directive  } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';

import { WidgetFactoryService } from '../../core/widget.factory.service';
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import { PluginHostDirective } from './plugin-host.directive';


@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @ViewChild(PluginHostDirective) pluginHost: PluginHostDirective;

  @Input() configuration;

  constructor(private _wfs: WidgetFactoryService) {
  }


  ngOnInit() {
    //this.config = JSON.stringify(this.configuration.configuration);

    this._wfs.load({ name: 'numeric-display', module:'PluginModule', componentSelector:'app-plugin-component' }, this.pluginHost.viewContainerRef)
    .then( (componentRef)=>{ 
      componentRef.instance.data = this.configuration;
    } );
    
  }
}
