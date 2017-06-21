import { EducationForAllPage } from './app.po';

describe('education-for-all App', () => {
  let page: EducationForAllPage;

  beforeEach(() => {
    page = new EducationForAllPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
