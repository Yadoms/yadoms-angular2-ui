import { Component, OnInit, Input  } from '@angular/core';
import { ViewContainerRef, ViewChild } from '@angular/core';

import { WidgetFactoryService } from '../../core/widget.factory.service';

@Component({
  selector: 'yd-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css']
})
export class WidgetComponent implements OnInit {

  @ViewChild('pluginHost') pluginHost;

  @Input() configuration;

  constructor(private _wfs: WidgetFactoryService, private _vcr: ViewContainerRef) {
  }

  public config: string;

  ngOnInit() {
    this.config = JSON.stringify(this.configuration.configuration);
    this._wfs.load('assets/widgets/lazy.module.js', this._vcr)
    .then( (componentRef)=>{ 
      debugger;
      componentRef.instance.data = this.configuration;
    } );
    
  }

}
