import { TravelManagmentPage } from './app.po';

describe('travel-managment App', () => {
  let page: TravelManagmentPage;

  beforeEach(() => {
    page = new TravelManagmentPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
