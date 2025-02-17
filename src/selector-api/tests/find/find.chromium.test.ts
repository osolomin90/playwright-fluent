import * as path from 'path';
import { PlaywrightFluent } from '../../../fluent-api';

describe('Selector API - find', (): void => {
  let p: PlaywrightFluent;
  beforeEach((): void => {
    p = new PlaywrightFluent();
  });
  afterEach(async (): Promise<void> => {
    await p.close();
  });

  test('should get no handle on wrong selector', async (): Promise<void> => {
    // Given
    const url = `file:${path.join(__dirname, 'find.test.html')}`;
    // prettier-ignore
    await p
      .withBrowser('chromium')
      .withOptions({ headless: true })
      .navigateTo(url);

    // When
    const selector = p.selector('[role="row"]').find('foobar');
    const handles = await selector.getAllHandles();
    const firstHandle = await selector.getFirstHandleOrNull();

    // Then
    expect(Array.isArray(handles)).toBe(true);
    expect(handles.length).toBe(0);
    expect(firstHandle).toBeNull();
  });

  test('should get handles', async (): Promise<void> => {
    // Given
    const url = `file:${path.join(__dirname, 'find.test.html')}`;
    // prettier-ignore
    await p
      .withBrowser('chromium')
      .withOptions({ headless: true })
      .navigateTo(url);

    // When
    // prettier-ignore
    const selector = p
      .selector('[role="row"]')
      .find('td')
      .find('select[data-test-id="my-select"]');
    const handles = await selector.getAllHandles();
    const firstHandle = await selector.getFirstHandleOrNull();

    // Then
    expect(Array.isArray(handles)).toBe(true);
    expect(handles.length).toBe(3);
    expect(await handles[0].evaluate((node) => (node as HTMLSelectElement).value)).toBe('1');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(await firstHandle!.evaluate((node) => (node as HTMLSelectElement).value)).toBe('1');
    expect(await handles[1].evaluate((node) => (node as HTMLSelectElement).value)).toBe('2');
    expect(await handles[2].evaluate((node) => (node as HTMLSelectElement).value)).toBe('3');
    expect(selector.toString()).toBe(`selector([role="row"])
  .find(td)
  .find(select[data-test-id="my-select"])`);
  });

  test('should get handles, even when selector is created before browser is launched', async (): Promise<void> => {
    // Given
    // prettier-ignore
    const selector = p
      .selector('[role="row"]')
      .find('td')
      .find('select[data-test-id="my-select"]');

    const url = `file:${path.join(__dirname, 'find.test.html')}`;
    // prettier-ignore
    await p
      .withBrowser('chromium')
      .withOptions({ headless: true })
      .navigateTo(url);

    // When
    const handles = await selector.getAllHandles();
    const firstHandle = await selector.getFirstHandleOrNull();

    // Then
    expect(Array.isArray(handles)).toBe(true);
    expect(handles.length).toBe(3);
    expect(await handles[0].evaluate((node) => (node as HTMLSelectElement).value)).toBe('1');
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    expect(await firstHandle!.evaluate((node) => (node as HTMLSelectElement).value)).toBe('1');
    expect(await handles[1].evaluate((node) => (node as HTMLSelectElement).value)).toBe('2');
    expect(await handles[2].evaluate((node) => (node as HTMLSelectElement).value)).toBe('3');
    expect(selector.toString()).toBe(`selector([role="row"])
  .find(td)
  .find(select[data-test-id="my-select"])`);
  });
});
