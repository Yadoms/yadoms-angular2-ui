import { DateAdapter } from '@angular/material/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import fontawesome from 'font-awesome-webpack2';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  /**
   * Path to nse logo
   */
  public nseLogo = 'assets/img/nse.png';

  /**
   * Application name
   */
  public name = 'GSS Mobile';

  /**
   * Constructor
   * @param appState The appState
   * @param translate The translate service
   */
  constructor(public appState: AppState, translate: TranslateService, private dateAdapter: DateAdapter<any>) {
    try {
      // this language will be used as a fallback
      translate.setDefaultLang('en');
      // the lang to use, if the lang isn't available
      translate.use(translate.getBrowserLang());
      // define app language
      moment.locale(translate.getBrowserLang() || window.navigator.language || 'en');

      dateAdapter.setLocale(translate.getBrowserLang() || window.navigator.language || 'en');
    } catch (e) {
      console.error('Fail to initialize locale');
      console.error(e);
    }
  }

  /**
   * Initialize component
   */
  public ngOnInit() {
    // log initial appState
    console.log('Initial App State', this.appState.state);
  }
}
