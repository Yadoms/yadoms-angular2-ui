import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from '../../app.service';
import { OpacifyDirective } from '../../shared/opacify.directive';

@Component({
  selector: 'dashboard',
  providers: [],
  styleUrls: [ './dashboard.component.css' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  constructor(public appState: AppState) {
  }

  public ngOnInit() {
    console.log('DashboardComponent loaded');

  }
}
