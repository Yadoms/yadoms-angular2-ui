import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'GSS Mobile +@';
    expect(subject).toContain(result);
  });

  it('should have header', () => {
    let subject = element(by.css('h1')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <home>', () => {
    let subject = element(by.css('app home')).isPresent();
    let result  = true;
    expect(subject).toEqual(result);
  });

  it('should have sidenav', () => {
    let subject = element(by.css('material-icons')).getText();
    let result  = 'menu';
    expect(subject).toEqual(result);
  });

});
