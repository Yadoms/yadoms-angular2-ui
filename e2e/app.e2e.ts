import { browser, by, element } from 'protractor';

describe('App', () => {

  beforeEach( (done: DoneFn)  => {
    browser.get('/');

    browser.isElementPresent(by.id('userLoginInput'))
    .then( (present: boolean) => {
      if (present) {
        browser.driver.findElement(by.id('userLoginInput')).sendKeys('nse');
        browser.driver.findElement(by.id('userPasswordInput')).sendKeys('nse@2016');
        browser.driver.findElement(by.css('button')).click();

        // Login takes some time, so wait until it's done.
        // For the test app's login, we know it's done when it redirects to
        // index.html.
        browser.driver.wait(() => {
          return browser.driver.getCurrentUrl().then((url) => {
            return /home/.test(url);
          });
        }, 10000)
        .then( () => {
          done();
        });
      } else {
        done();
      }
    })
    .catch( () => {
      done();
    });
  });

  it('should have a title', () => {
    const subject = browser.getTitle();
    const result  = 'GSS Mobile +@';
    expect(subject).toContain(result);
  });

  it('should have header', async () => {
    const subject = await element(by.css('.brand-logo')).isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <main>', async () => {
    const subject = await element(by.css('main')).isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

  /*
  it('should have sidenav', async () => {
    const subject = await element(by.css('material-icons')).getText();
    const result  = 'menu';
    expect(subject).toEqual(result);
  });
  */
});
