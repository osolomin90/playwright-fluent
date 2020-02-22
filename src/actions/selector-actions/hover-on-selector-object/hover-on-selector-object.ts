import { waitUntil, report } from '../../../utils';
import { SelectorController } from '../../../selector';
import { HoverOptions, hoverOnHandle } from '../../handle-actions';
import { Page } from 'playwright';

export async function hoverOnSelectorObject(
  selector: SelectorController,
  page: Page | undefined,
  options: HoverOptions,
): Promise<void> {
  if (!page) {
    throw new Error(
      `Cannot hover on '${selector.toString()}' because no browser has been launched`,
    );
  }

  report('waiting for the selector to appear in DOM ...', options.verbose);
  await waitUntil(
    () => selector.exists(),
    `Cannot hover on '${selector.toString()}' because this selector was not found in DOM`,
    {
      timeoutInMilliseconds: options.timeoutInMilliseconds,
      stabilityInMilliseconds: options.stabilityInMilliseconds,
      throwOnTimeout: true,
      verbose: options.verbose,
    },
  );

  const handle = await selector.getHandle();
  await hoverOnHandle(handle, selector.toString(), page, options);
}
