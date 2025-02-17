# Playwright Fluent Selector API

The Selector API enables to find and target a DOM element or a collection of DOM elements embedded in a complex DOM Hierarchy.

- Chainable Methods

  - [find(selector)](#findselector)
  - [nextSibling()](#nextSibling)
  - [nth(index)](#nthindex)
  - [parent()](#parent)
  - [previousSibling()](#previousSibling)
  - [withAriaLabel(text)](#withAriaLabeltext)
  - [withPlaceholder(text)](#withPlaceholdertext)
  - [withExactText(text)](#withExactTexttext)
  - [withText(text)](#withTexttext)
  - [withValue(text)](#withValuetext)

- Helper Methods

  - [count()](#count)
  - [doesNotExist()](#doesNotExist)
  - [doesNotHaveClass(className)](#doesNotHaveClassclassName)
  - [exists()](#exists)
  - [forEach(callback)](#forEachcallback)
  - [getAllHandles()](#getAllHandles)
  - [getHandle()](#getHandle)
  - [hasClass(className)](#hasClassclassName)
  - [innerText()](#innerText)
  - [isChecked()](#isChecked)
  - [isNotReadOnly()](#isNotReadOnly)
  - [isNotVisible()](#isNotVisible)
  - [isReadOnly()](#isReadOnly)
  - [isUnchecked()](#isUnchecked)
  - [isVisible()](#isVisible)
  - [options()](#options)
  - [allSelectedOptions()](#allSelectedOptions)
  - [selectedOption()](#selectedOption)
  - [placeholder()](#placeholder)
  - [toString()](#toString)
  - [value()](#value)

## Usage

To use the Selector API, you must first get a selector object from the fluent API, then use the chainable methods to compose your query, and finally execute the query by calling `getHandle()` if your query targets only one element or by calling `getAllHandles()` if the query targets a collection of elements:

```js
import { PlaywrightFluent } from 'playwright-fluent';

const p = new PlaywrightFluent();

// Given I open The AG Grid demo site
const url = 'https://www.ag-grid.com/example.php';
// prettier-ignore
await p
  .withBrowser('chromium')
  .withCursor()
  .withOptions({ headless: false })
  .navigateTo(url);

// When I select Olivia Brenan's name
const agGridContainer = p.selector('div.ag-body-viewport');
const checkbox = agGridContainer
  .find('div[role="row"]')
  .withText('Olivia Brennan')
  .nth(1) // take the first row that contains 'Olivia Brennan'
  .find('div[col-id="name"]') // in this row, take the cell of the 'Name' column
  .find('span.ag-selection-checkbox'); // in this cell, take the checkbox

const handle = await checkbox.getHandle(); // get the Playwright's element handle
await handle.click();
```

## Chainable Methods

### find(selector)

- selector: `string`

Finds all `selector` elements starting from previous found elements.

---

### withText(text)

- text: `string`

Take, from previous search, only the elements whose innerText contains the specified text.

---

### withExactText(text)

- text: `string`

Take, from previous search, only the elements whose innerText matches exactly the specified text.

---

### withAriaLabel(text)

- text: `string`

Take, from previous search, only the elements whose aria-label matches exactly the specified text.

---

### withPlaceholder(text)

- text: `string`

Take, from previous search, only the elements whose placeholder contains the specified text.

---

### withValue(text)

- text: `string`

Take, from previous search, only the elements whose value contains the specified text.

---

### nth(index)

- index: `number` (1-based index)

Take, from previous search, the nth element.

- To take the first element : `.nth(1)`
- To take the last element : `.nth(-1)`

---

### parent()

Take the direct parent of each element found in the previous step.

---

### nextSibling()

Take the next sibling of each element found in the previous step.

---

### previousSibling()

Take the previous sibling of each element found in the previous step.

---

## Helper Methods

### getAllHandles()

- returns: `Promise<ElementHandle<Element>[]>`

Executes the search. Will return an empty array if no elements are found, will return all found elements otherwise.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### getHandle()

- returns: `Promise<ElementHandle<Element> | null>`

Executes the search and returns the first found element. Will return null if no elements are found.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### count()

- returns: `Promise<number>`

Gets the number of found elements.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### exists()

- returns: `Promise<boolean>`

Checks if the selector exists.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### doesNotExist()

- returns: `Promise<boolean>`

Checks if the selector is removed from the DOM.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### isChecked()

- returns: `Promise<boolean>`

Checks if the selector is checked.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

In order to call this method in an unflaky way, you should do the following:

```js
const selector = p
  .selector('label')
  .withText('Turn on this custom switch')
  .parent()
  .find('input[type=checkbox]');

await p.waitUntil(() => selector.isChecked());
// now we are sure that the selector is checked
```

---

### isUnchecked()

- returns: `Promise<boolean>`

Checks if the selector is unchecked.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

In order to call this method in an unflaky way, you should do the following:

```js
const selector = p
  .selector('label')
  .withText('Turn on this custom switch')
  .parent()
  .find('input[type=checkbox]');

await p.waitUntil(() => selector.isUnchecked());
// now we are sure that the selector is checked
```

---

### isReadOnly()

- returns: `Promise<boolean>`

Checks if the selector is read-only.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

In order to call this method in an unflaky way, you should do the following:

```js
const selector = p.selector('label').withText('Turn on this custom switch').parent().find('input');

await p.waitUntil(async () => await selector.isReadOnly());
// now we are sure that the selector is read-only
```

---

### isNotReadOnly()

- returns: `Promise<boolean>`

Checks if the selector is not read-only.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

In order to call this method in an unflaky way, you should do the following:

```js
const selector = p.selector('label').withText('Turn on this custom switch').parent().find('input');

await p.waitUntil(async () => await selector.isNotReadOnly());
// now we are sure that the selector is not read-only
```

---

### forEach(callback)

- callback: `(selector: SelectorFluent) => Promise<void>`

Iterate over each found selector.

Example:

```js
import { PlaywrightFluent } from 'playwright-fluent';

const p = new PlaywrightFluent();

// Given I open The AG Grid demo site
const url = 'https://www.ag-grid.com/example.php';

// prettier-ignore
await p
  .withBrowser('chromium')
  .withOptions({ headless: true })
  .withCursor()
  .navigateTo(url);

const rows = p.selector('[role="row"]');
await rows.forEach(async (row) => {
  const checkbox = row.find('input[type="checkbox"]');
  await p.hover(checkbox).check(checkbox);
});
```

---

### isVisible()

- returns: `Promise<boolean>`

Checks if the selector is visible in the current viewport.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

In order to call this method in an unflaky way, you should do the following:

```js
const selector = p
  .selector('[role="row"]')
  .find('td')
  .find('p');
  .withText('foobar');

await p.waitUntil(() => selector.isVisible());
// now we are sure that the selector is visible

```

---

### hasClass(className)

- className: `string`
- returns: `Promise<boolean>`

Checks that selector has the specified class `className`.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### doesNotHaveClass(className)

- className: `string`
- returns: `Promise<boolean>`

Checks that selector does not have the specified class `className`.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### innerText()

- returns: `Promise<string | undefined | null>`

Returns the innerText of the selector.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### options()

- returns: `Promise<SelectOptionInfo[]>`

```js
interface SelectOptionInfo {
  value: string;
  label: string;
  selected: boolean;
}
```

Returns the list of all options of a `select` element.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### allSelectedOptions()

- returns: `Promise<SelectOptionInfo[]>`

```js
interface SelectOptionInfo {
  value: string;
  label: string;
  selected: boolean;
}
```

Returns the list of all selected options of a `select` element.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### selectedOption()

- returns: `Promise<SelectOptionInfo | undefined>`

```js
interface SelectOptionInfo {
  value: string;
  label: string;
  selected: boolean;
}
```

Returns the first selected option of a `select` element.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### value()

- returns: `Promise<string | undefined | null>`

Returns the value of the selector.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### placeholder()

- returns: `Promise<string | null>`

Returns the selector's placeholder.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### isNotVisible()

- returns: `Promise<boolean>`

Checks if the selector is not visible in the current viewport.

The result may differ from one execution to another especially if targeted element is rendered lately because its data is based on some backend response.

---

### toString()

- returns: `string`

Gets the full query used to build the selector.

Example:

```js
const url = 'https://www.ag-grid.com/example.php';
// prettier-ignore
await p
  .withBrowser('chromium')
  .withCursor()
  .withOptions({ headless: false })
  .navigateTo(url);

const agGridContainer = p.selector('div.ag-body-viewport');
const checkbox = agGridContainer
  .find('div[role="row"]')
  .withText('Olivia Brennan')
  .nth(1) // take the first row that contains 'Olivia Brennan'
  .find('div[col-id="name"]') // take the cell in column name
  .find('span.ag-selection-checkbox'); // take the checkbox in that cell

console.log(checkbox.toString());
// will produce:
`selector(div.ag-body-viewport)
  .find(div[role="row"])
  .withText(Olivia Brennan)
  .nth(1)
  .find(div[col-id="name"])
  .find(span.ag-selection-checkbox)`;
```

---
