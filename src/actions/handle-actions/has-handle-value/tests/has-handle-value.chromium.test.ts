import * as path from 'path';
import { Browser, ElementHandle, chromium } from 'playwright';
import * as SUT from '../index';

describe('handle has value', (): void => {
  let browser: Browser | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach((): void => {});
  afterEach(async (): Promise<void> => {
    if (browser) {
      await browser.close();
    }
  });
  test('should return false when handle is undefined', async (): Promise<void> => {
    // Given
    const handle: ElementHandle<Element> | undefined = undefined;

    // When
    const result = await SUT.hasHandleValue(handle, 'foobar');

    // Then
    expect(result).toBe(false);
  });

  test('should return false when handle is null', async (): Promise<void> => {
    // Given
    const handle: ElementHandle<Element> | null = null;

    // When
    const result = await SUT.hasHandleValue(handle, 'foobar');

    // Then
    expect(result).toBe(false);
  });

  test('should return false when handle is null and expected value is empty', async (): Promise<void> => {
    // Given
    const handle: ElementHandle<Element> | null = null;

    // When
    const result = await SUT.hasHandleValue(handle, '');

    // Then
    expect(result).toBe(false);
  });

  test('should return false when handle is undefined and expected value is empty', async (): Promise<void> => {
    // Given
    const handle: ElementHandle<Element> | undefined = undefined;

    // When
    const result = await SUT.hasHandleValue(handle, '');

    // Then
    expect(result).toBe(false);
  });

  test('should return true when selector has value', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-value.test.html')}`;
    await page.goto(url);

    const inputSelector = '#emptyInput';
    await page.click(inputSelector);
    await page.type(inputSelector, ' yo ');
    const handle = await page.$(inputSelector);

    // When
    const result = await SUT.hasHandleValue(handle, 'yo');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });

  test('should return false when selector has not the value', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-value.test.html')}`;
    await page.goto(url);

    const inputSelector = '#emptyInput';
    await page.click(inputSelector);
    await page.type(inputSelector, ' yo ');
    const handle = await page.$(inputSelector);

    // When
    const result = await SUT.hasHandleValue(handle, 'foobar');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(false);
  });

  test('should return true when selector has undefined value and expected is empty', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-value.test.html')}`;
    await page.goto(url);
    const handle = await page.$('#withUndefinedValue');

    // When
    const result = await SUT.hasHandleValue(handle, '');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });

  test('should return true when selector has empty value and expected is empty', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-value.test.html')}`;
    await page.goto(url);

    const handle = await page.$('#emptyInput');

    // When
    const result = await SUT.hasHandleValue(handle, '');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });

  test('should return true when selector has null value and expected is empty', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'has-handle-value.test.html')}`;
    await page.goto(url);

    const handle = await page.$('#withNullValue');

    // When
    const result = await SUT.hasHandleValue(handle, '');

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });
});
