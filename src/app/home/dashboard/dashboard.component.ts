import { Component, OnInit, Inject } from '@angular/core';
import { AppState } from '../../app.service';
import { OpacifyDirective } from '../../shared/opacify.directive';
import { PageService } from '../../core/pages.service';
import { Pages } from '../../core/models/pages';

@Component({
  selector: 'app-dashboard',
  providers: [],
  styleUrls: [ './dashboard.component.css' ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  public pages: Pages = null;

  constructor(public appState: AppState, private pageService: PageService) {
  }

  public ngOnInit() {
    console.log('DashboardComponent loaded');

    this.pageService.getAll()
    .then( (pages: Pages) => {
      this.pages = pages;
    });

    // this.componentFactoryResolver.resolveComponentFactory()
  }
}
