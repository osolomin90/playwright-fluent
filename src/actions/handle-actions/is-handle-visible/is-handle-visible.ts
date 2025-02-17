import { ElementHandle } from 'playwright';
import { report } from '../../../utils';
declare const window: Window;

export interface VerboseOptions {
  verbose: boolean;
}

export const defaultVerboseOptions: VerboseOptions = {
  verbose: false,
};

export async function isHandleVisible(
  selector: ElementHandle<Element> | undefined | null,
  options: VerboseOptions,
): Promise<boolean> {
  if (selector === undefined || selector === null) {
    return false;
  }

  const isOutOfScreenOrTransparent = await selector.evaluate((el): boolean => {
    try {
      const style = window.getComputedStyle(el);
      if (style && style.opacity && style.opacity === '0') {
        return true;
      }

      const rect = el.getBoundingClientRect();
      if (rect.top + rect.height < 0 && style?.position === 'absolute') {
        return true;
      }

      if (rect.left + rect.width < 0 && style?.position === 'absolute') {
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  });

  if (isOutOfScreenOrTransparent) {
    report(
      `Selector is not visible because it is either transparent or out of screen`,
      options.verbose,
    );
    return false;
  }

  try {
    const result = await selector.isVisible();
    return result;
  } catch (error) {
    const errorAsError = error as Error;
    const isError = typeof errorAsError?.message === 'string';
    const errorMessage = isError
      ? `Playwright execution of 'ElementHandle.isVisible()' failed with error: ${errorAsError.message}`
      : `Playwright execution of 'ElementHandle.isVisible()' failed: maybe the element was detached from the DOM during execution.`;

    // eslint-disable-next-line no-console
    console.warn(errorMessage);

    report(`Selector is not visible because it has been detached from DOM.`, options.verbose);

    return false;
  }
}
