import * as path from 'path';
import { Browser, chromium } from 'playwright';
import * as SUT from '../index';

describe('are options (by value) already selected in handle', (): void => {
  let browser: Browser | undefined = undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach((): void => {});

  afterEach(async (): Promise<void> => {
    if (browser) {
      await browser.close();
    }
  });

  test('should throw when selector is not a select - chromium', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(
      __dirname,
      'are-options-by-value-already-selected-in-handle.test.html',
    )}`;
    await page.goto(url);

    const selector = '#empty-input';
    const handle = await page.$(selector);

    // When
    // Then
    const expectedError = new Error("Cannot find any options in selector '#empty-input'");

    await SUT.areOptionsByValueAlreadySelectedInHandle(handle, selector, ['foobar']).catch(
      (error): void => expect(error).toMatchObject(expectedError),
    );
  });

  test('should check that all options are already selected in a disabled select - chromium', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(
      __dirname,
      'are-options-by-value-already-selected-in-handle.test.html',
    )}`;
    await page.goto(url);

    // When
    const selector = '#disabled-select';
    const expectedOptionValues = ['value 2', 'value 3'];
    const handle = await page.$(selector);
    const result = await SUT.areOptionsByValueAlreadySelectedInHandle(
      handle,
      selector,
      expectedOptionValues,
    );

    // Then
    expect(result).toBe(true);
  });

  test('should check that all options are not already selected in a disabled select - chromium', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(
      __dirname,
      'are-options-by-value-already-selected-in-handle.test.html',
    )}`;
    await page.goto(url);

    // When
    const selector = '#disabled-select';
    const expectedOptionValues = ['value 1', 'value 2', 'value 3'];
    const handle = await page.$(selector);
    const result = await SUT.areOptionsByValueAlreadySelectedInHandle(
      handle,
      selector,
      expectedOptionValues,
    );

    // Then
    expect(result).toBe(false);
  });

  test('should return false when select has no options - chromium', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(
      __dirname,
      'are-options-by-value-already-selected-in-handle.test.html',
    )}`;
    await page.goto(url);

    // When
    const selector = '#no-options-select';
    const expectedOptionValues = ['value 1', 'value 2', 'value 3'];
    const handle = await page.$(selector);
    const result = await SUT.areOptionsByValueAlreadySelectedInHandle(
      handle,
      selector,
      expectedOptionValues,
    );

    // Then
    expect(result).toBe(false);
  });
});
