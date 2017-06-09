import { RetailManagementPage } from './app.po';

describe('retail-management App', () => {
  let page: RetailManagementPage;

  beforeEach(() => {
    page = new RetailManagementPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
