import { Browser, chromium, Page } from 'playwright';
import * as SUT from '../index';
import { exists } from '../..';

describe('inject-cursor', (): void => {
  let browser: Browser | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach((): void => {});
  afterEach(async (): Promise<void> => {
    if (browser) {
      await browser.close();
    }
  });

  test('should return an error when page has not been initalized', async (): Promise<void> => {
    // Given
    const page: Page | undefined = undefined;

    // When
    // Then
    const expectedError = new Error('Cannot inject cursor because no browser has been launched');
    await SUT.injectCursor(page).catch((error): void => expect(error).toMatchObject(expectedError));
  });

  test('should show cursor on the page on chromium', async (): Promise<void> => {
    // Given
    const url = 'https://reactstrap.github.io/components/form';
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: null });
    const page = await context.newPage();
    await page.goto(url);

    // When
    await SUT.injectCursor(page);
    await SUT.injectCursor(page);
    await SUT.injectCursor(page);
    await SUT.injectCursor(page);

    // Then
    const cursorExists = await exists('playwright-mouse-pointer', page);
    expect(cursorExists).toBe(true);
  });
});
