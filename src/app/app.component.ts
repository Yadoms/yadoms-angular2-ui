/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppState } from './app.service';
import { TranslateService, TranslatePipe } from 'ng2-translate';
import * as moment from 'moment';
import fontawesome from 'font-awesome-webpack2';
import { SdBs2BrowseComponent } from 'core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public nseLogo = 'assets/img/nse.png';
  public name = 'Yadoms';

  constructor(public appState: AppState, translate: TranslateService) {
    // this language will be used as a fallback
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available
    translate.use(translate.getBrowserLang());

    moment.locale(translate.getBrowserLang() || window.navigator.language || 'en');
  }

  public ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
