import * as path from 'path';
import { Browser, chromium } from 'playwright';
import * as SUT from '../index';
import { querySelectorAllInPage } from '../../../page-actions';

describe('get next siblings', (): void => {
  let browser: Browser | undefined = undefined;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach((): void => {});
  afterEach(async (): Promise<void> => {
    if (browser) {
      await browser.close();
    }
  });

  test('should return an empty array when root elements is empty', async (): Promise<void> => {
    // Given

    // When
    const result = await SUT.getNextSiblingsOf([]);

    // Then
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });

  test('should get next siblings', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'get-next-sibling-of-handles.test.html')}`;
    await page.goto(url);

    // When
    const rootElements = await querySelectorAllInPage('[role="row"]', page);
    const result = await SUT.getNextSiblingsOf(rootElements);

    // Then
    expect(rootElements.length).toBe(3);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(await result[0].evaluate((node) => (node as HTMLElement).tagName)).toContain('TR');
    expect(
      await result[0].evaluate((node) => (node as HTMLElement).getAttribute('data-test-id')),
    ).toBe('row2');
    expect(await result[1].evaluate((node) => (node as HTMLElement).tagName)).toContain('TR');
    expect(
      await result[1].evaluate((node) => (node as HTMLElement).getAttribute('data-test-id')),
    ).toBe('row3');
  });

  test('should get next sibling', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'get-next-sibling-of-handles.test.html')}`;
    await page.goto(url);

    // When
    const rootElements = await querySelectorAllInPage(
      'select[data-test-id="my-select2"] option',
      page,
    );
    const firstOption = rootElements[0];
    const result = await SUT.getNextSiblingsOf([firstOption]);

    // Then
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(1);
    expect(await firstOption.evaluate((node) => (node as HTMLElement).tagName)).toContain('OPTION');
    expect(await firstOption.evaluate((node) => (node as HTMLElement).innerText)).toBe(
      'Select 2 - label 1',
    );
    const nextOption = result[0];
    expect(await nextOption.evaluate((node) => (node as HTMLElement).tagName)).toContain('OPTION');
    expect(await nextOption.evaluate((node) => (node as HTMLElement).innerText)).toBe(
      'Select 2 - label 2',
    );
  });
  test('should return no elements when sibling is not found', async (): Promise<void> => {
    // Given
    browser = await chromium.launch({ headless: true });
    const browserContext = await browser.newContext({ viewport: null });
    const page = await browserContext.newPage();
    const url = `file:${path.join(__dirname, 'get-next-sibling-of-handles.test.html')}`;
    await page.goto(url);

    // When
    const rootElements = await querySelectorAllInPage('html', page);
    const result = await SUT.getNextSiblingsOf(rootElements);

    // Then
    expect(rootElements.length).toBe(1);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
  });
});
