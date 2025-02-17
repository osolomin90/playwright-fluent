import * as path from 'path';
import { Browser, chromium } from 'playwright';
import * as SUT from '../index';

describe('handle has text', (): void => {
  let browser: Browser | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach((): void => {});
  afterEach(async (): Promise<void> => {
    if (browser) {
      await browser.close();
    }
  });

  test('should return true when selector has text', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-text.test.html')}`;
    await page.goto(url);

    const selector = '#p1';
    const handle = await page.$(selector);

    // When
    const result = await SUT.hasHandleText(handle, 'foo');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });

  test('should return true when selector has uppercased text', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-text.test.html')}`;
    await page.goto(url);

    const selector = '#upper-case';
    const handle = await page.$(selector);

    // When
    const result = await SUT.hasHandleText(handle, 'FOO');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });

  test('should return false when selector has not the text', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-text.test.html')}`;
    await page.goto(url);

    const selector = '#p1';
    const handle = await page.$(selector);

    // When
    const result = await SUT.hasHandleText(handle, 'yo');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(false);
  });

  test('should return true when selector is empty and expected is empty', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-text.test.html')}`;
    await page.goto(url);
    const handle = await page.$('#empty');

    // When
    const result = await SUT.hasHandleText(handle, '');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });
});
