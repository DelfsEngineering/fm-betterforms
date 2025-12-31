---
description: >-
  Good components need to be designed well. Taking the time to think of future
  use cases significantly enhances the components usability.
---

# Component Best Practices

{% hint style="info" %}
**For Third-Party Library Integration:** See the complete guide: [Creating Components with Third-Party Libraries](../../integrations/creating-components-with-third-party-libraries.md) with full FullCalendar, Chart.js, and Leaflet examples.
{% endhint %}

### Sizing and Styling

Generally, it should be the implementation of the component that is responsible for the component's size.  There are some exceptions. This means that the width of your component is generally full width and the parent or 'implementor' of the component will control the width.&#x20;

Examples:

| Component Type        | What sets size | Comments                                                                                                                               |
| --------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Page Header Component | Parent         | this allows the header                                                                                                                 |
| Button Component      | Component      | Buttons generally don't take on the shapre of the parent elements. When you need to override a buttons width, you can pass in a class. |
| Toggle switch         | Component      | Generally this type of component woudl not adapt its size to the parent                                                                |
| Toggle switch Array   | Parent         | An array of toggles would wrap or flow based on the containing element                                                                 |

### Actions





### Context















