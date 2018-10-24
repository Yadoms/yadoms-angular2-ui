import { DateAdapter } from '@angular/material/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './yd.service';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import fontawesome from 'font-awesome-webpack2';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'yd-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./yd.component.css'],
  templateUrl: './yd.component.html'
})
export class YdComponent implements OnInit {
  /**
   * Path to Yadoms logo
   */
  public yadomsLogo = 'assets/img/logo.png';

  /**
   * Application name
   */
  public name = 'Yadoms web client';

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
