import { JobTimelinePage } from './app.po';

describe('job-timeline App', () => {
  let page: JobTimelinePage;

  beforeEach(() => {
    page = new JobTimelinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
