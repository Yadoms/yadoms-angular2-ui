import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }

  getMain() {
    return element(by.css('main'));
  }

  getBrandLogo() {
    return element(by.css('.brand-logo'));
  }
}
