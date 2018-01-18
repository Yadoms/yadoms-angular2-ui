import { browser, by, element } from 'protractor';

describe('Home', () => {

  beforeEach((done: DoneFn) => {
    // change hash depending on router LocationStrategy
    browser.driver.getCurrentUrl().then((url) => {
      if (/home\/dashboard/.test(url)) {
        done();
      } else {
        browser.get('/home/dashboard');
        browser.driver.wait(() => {
          return browser.driver.getCurrentUrl().then((urlNew) => {
            return /home\/dashboard/.test(urlNew);
          });
        }, 10000)
        .then( () => {
          browser.waitForAngular();
          done();
        });
      }
    });
  });

  it('should have a navbar', async () => {
    const subject = await element(by.css('div.navbar')).isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

  it('should have a dashboard component', async () => {
    const subject = await element(by.css('dashboard')).isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

});
