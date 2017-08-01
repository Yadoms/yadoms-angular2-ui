import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { RestServerService } from '../core/restserver.service';
import { NavigatorService } from '../core/navigator.service';
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
  public nseLogo: string = 'assets/img/nse.png';

  constructor(public appState: AppState, public _authenticationService: AuthenticationService, private router: Router,
              private restServerService: RestServerService, public navigatorService: NavigatorService) {
  }

  public ngOnInit() {
    console.log('home component loaded');

    this.initializeSidenav();
  }

  public get loggedUserName(): string {
    return this._authenticationService.getLogin();
  }

  public onLogout() {
      this._authenticationService.signout();
      this.router.navigate(['/']);
  }

  /**
   * Initialize sidenav
   */
  private initializeSidenav() {
    $('.button-collapse').sideNav({
      menuWidth: 240, // Default is 240
      closeOnClick: false // force to false (if true => issue on large screen, the sidenav disappear and should not)
    });

    // fix hiding the sidenav on click (only on small devices = only if sidenav-overlay is shown)
    $('.side-nav').on('click', () => {
      if ($('sidenav-overlay' ) !== null) {
        $('.button-collapse').sideNav('hide');
      }
    });
  }
}
