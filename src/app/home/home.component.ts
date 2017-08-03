import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { RestServerService } from '../core/restserver.service';
import { NavigatorService } from '../core/navigator.service';
import { PageService } from '../core/pages.service';
import { Pages } from '../core/models/pages';
import { Observable } from 'rxjs/Rx';
import * as $ from 'jquery';
import { TranslatePipe } from 'ng2-translate';

@Component({
  selector: 'home',
  providers: [],
  styleUrls: [ './home.component.css' ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public logo: string = 'assets/img/logo.png';
  public pages: Pages = null;

  constructor(public appState: AppState, private router: Router, private restServerService: RestServerService, public navigatorService: NavigatorService, private pageService: PageService) {
  }

  public ngOnInit() {
    console.log('home component loaded');
    this.initializeSidenav();

    this.pageService.getAll()
    .then( (pages: Pages) => {
      this.pages = pages;
    });
  }

  /**
   * Initialize sidenav
   */
  private initializeSidenav() {
    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      closeOnClick: true
    });

    // make all collapsible items behaviors
    $('.collapsible').collapsible();
  }
}
