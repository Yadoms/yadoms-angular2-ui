import { AppPage } from './app.po';

describe('gssmobile App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('GSS Mobile');
  });

  it('should have header', async () => {
    const subject = page.getBrandLogo().isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });

  it('should have <main>', async () => {
    const subject = page.getMain().isPresent();
    const result  = true;
    expect(subject).toEqual(result);
  });
});
