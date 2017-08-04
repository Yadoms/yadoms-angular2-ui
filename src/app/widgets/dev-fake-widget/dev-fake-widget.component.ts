import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'dev-fake-widget',
  providers: [],
  styleUrls: [ './dev-fake-widget.component.scss' ],
  templateUrl: './dev-fake-widget.component.html'
})
export class DevFakeWidgetComponent implements OnInit {

  constructor() {
  }

  public ngOnInit() {
    console.log('dev-fake-widget loaded');

  }

  public static getWidget() {
    return DevFakeWidgetComponent;
  }
}
