import { RetailInventoryManagementPage } from './app.po';

describe('retail-inventory-management App', () => {
  let page: RetailInventoryManagementPage;

  beforeEach(() => {
    page = new RetailInventoryManagementPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
