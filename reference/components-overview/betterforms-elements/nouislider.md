# Range Slider (noUiSlider) Element

The Range Slider element allows users to select a single value or a range of values by sliding handles along a track. It's highly customizable and suitable for selecting numeric ranges, like price, age, or percentages.

In BetterForms, this element leverages the `noUiSlider` library to provide a touch-friendly and flexible range selection interface.

## Common Configuration Properties

| Property          | Type    | Description                                                                                                   |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------ |
| `type`            | `String`| Must be set to `"noUiSlider"`.                                                                                |
| `label`           | `String`| The label for the range slider.                                                                                 |
| `model`           | `String`| The key in your BetterForms data model where the selected value or array of values (for range) will be stored. |
| `disabled`        | `Boolean`| If `true`, the slider will be visible but not interactive. Defaults to `false`.                               |
| `readonly`        | `Boolean`| If `true`, the slider value cannot be changed. Similar to `disabled`. Defaults to `false`.                  |
| `hint`            | `String`| Additional helper text displayed below the slider.                                                              |
| `styleClasses`    | `String` / `Array` | CSS classes for styling the wrapper.                                                                          |
| `noUiSliderOptions`| `Object`| **Crucial property.** An object containing options for the underlying `noUiSlider` component. See examples.     |

### `noUiSliderOptions` common settings:

| Option        | Type    | Description                                                                                                  |
| :------------ | :------ | :----------------------------------------------------------------------------------------------------------- |
| `start`       | `Number` / `Array` | Initial value(s) of the slider. A single number for one handle, an array of two numbers for a range (e.g., `[20, 80]`). |
| `range`       | `Object`| Defines the slider's `min` and `max` values. E.g., `{ 'min': 0, 'max': 100 }`.                                 |
| `connect`     | `Boolean` / `Array` / `String` | Highlights the area between handles or from an edge to a handle. `true` for a range, `[true, false]` for lower connect. |
| `step`        | `Number`| The increment/decrement step size.                                                                             |
| `orientation` | `String`| Orientation of the slider: `"horizontal"` (default) or `"vertical"`.                                         |
| `tooltips`    | `Boolean` / `Array` / `Object` | Whether to show tooltips above the handles. Can be `true`, or an array of formatter objects.                     |
| `format`      | `Object`| An object with `to` and `from` functions for formatting the displayed values (e.g., adding units like '$' or '%'). |
| `behaviour`   | `String`| User interaction behavior, e.g., `'tap-drag'`, `'drag'`.                                                       |
| `pips`        | `Object`| Configuration for displaying pips (markers) along the slider.                                                  |

### Example Schema Snippet (Single Value Slider)

```json
{
  "type": "noUiSlider",
  "label": "Set Volume",
  "model": "volumeLevel",
  "noUiSliderOptions": {
    "start": 50,
    "range": {
      "min": 0,
      "max": 100
    },
    "step": 1,
    "tooltips": true,
    "connect": [true, false] // Connects the lower part to the handle
  }
}
```

### Example Schema Snippet (Range Slider)

```json
{
  "type": "noUiSlider",
  "label": "Price Range",
  "model": "priceRangeArray", // Stores an array like [minPrice, maxPrice]
  "noUiSliderOptions": {
    "start": [200, 800],
    "range": {
      "min": 0,
      "max": 1000
    },
    "step": 10,
    "connect": true, // Connects the area between the two handles
    "tooltips": true, // Can also be an array: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })]
    "format": { // Example using wNumb for formatting (requires wNumb.js)
      "to": function (value) { return '$' + parseInt(value); },
      "from": function (value) { return Number(value.replace('$', '')); }
    }
  }
}
```

## BetterForms Specific Notes

*   The `model` will store a single number if one handle is used, or an array of two numbers if two handles (a range) are used.
*   For advanced tooltip formatting or value formatting (like adding currency symbols or units), you'll typically use the `tooltips` (with formatters) or `format` options within `noUiSliderOptions`. The `wNumb` library is commonly used with `noUiSlider` for number formatting, but it needs to be available in your project.
*   Check the `noUiSlider` documentation for the full extent of customization available through `noUiSliderOptions`.

## Full Property Reference

This element wraps the `noUiSlider` library. For a comprehensive list of all `noUiSliderOptions` and detailed technical specifications, please refer to:
*   [VFG noUiSlider Field Documentation](https://vue-generators.gitbook.io/vue-generators/fields/optional-fields/nouislider)
*   [noUiSlider Official Documentation](https://refreshless.com/nouislider/) 
