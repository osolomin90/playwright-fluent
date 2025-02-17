import * as path from 'path';
import { Browser, webkit } from 'playwright';
import * as SUT from '../index';
import { getWindowState } from '../../../page-actions';
import { getIntersectionRatioOfHandle } from '../../get-intersection-ratio-of-handle';
import { sleep } from '../../../../utils';
import { defaultVerboseOptions } from '../../is-handle-visible';

describe.skip('handle is visible in viewport', (): void => {
  let browser: Browser | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach((): void => {});
  afterEach(async (): Promise<void> => {
    if (browser) {
      await browser.close();
    }
  });

  test('should return false when selector is hidden - webkit', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#hidden');

    // When
    const result = await SUT.isHandleVisibleInViewport(handle, defaultVerboseOptions);

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(false);
  });

  test('should return true when selector is visible in viewport', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#visible');

    // When
    const result = await SUT.isHandleVisibleInViewport(handle, defaultVerboseOptions);

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(true);
  });

  test('should return false when selector is transparent', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#transparent');

    // When
    const result = await SUT.isHandleVisibleInViewport(handle, defaultVerboseOptions);

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(false);
  });

  test('should return false when selector is out of screen', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#out-of-screen');

    // When
    const result = await SUT.isHandleVisibleInViewport(handle, defaultVerboseOptions);

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(false);
  });

  test('should return false when selector is out of viewport', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#out-of-viewport');

    // When
    const result = await SUT.isHandleVisibleInViewport(handle, defaultVerboseOptions);

    // Then
    expect(handle).toBeDefined();
    expect(result).toBe(false);
  });

  test.skip('should return 1 when selector is in viewport - issue playwright headless', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#visible');

    // When
    const visibleRatio = await getIntersectionRatioOfHandle(handle);
    // eslint-disable-next-line no-console
    console.log(`visible ratio is ${visibleRatio}`);
    const windowState = await getWindowState(page);
    // eslint-disable-next-line no-console
    console.log(`windowState:\n ${JSON.stringify(windowState, null, 2)}`);
    // Then
    expect(handle).toBeDefined();
    expect(visibleRatio).toBe(1);
  });

  test.skip('should return 1 when selector is in viewport - issue playwright headfull', async (): Promise<void> => {
    // Given
    browser = await webkit.launch({ headless: false });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'is-handle-visible-in-viewport.test.html')}`;
    await page.goto(url);
    await sleep(1000);

    const handle = await page.$('#visible');

    // When
    const visibleRatio = await getIntersectionRatioOfHandle(handle);
    // eslint-disable-next-line no-console
    console.log(`visible ratio is ${visibleRatio}`);
    const windowState = await getWindowState(page);
    // eslint-disable-next-line no-console
    console.log(`windowState:\n ${JSON.stringify(windowState, null, 2)}`);
    // Then
    expect(handle).toBeDefined();
    expect(visibleRatio).toBe(1);
  });
});
