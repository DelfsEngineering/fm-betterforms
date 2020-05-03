---
description: 'What are they, how are they reusable and why'
---

# Custom Components

Two types, 

### Using

#### Calling as an Element





#### Calling as an HTML Vue Component









### Building and Customizing





Custom Component API As BF Elements

| **Key** | **Description** |
| :--- | :--- |
| HTML | Contains HTML to be rendered as a component. |
| fields | Optional either `html` or `fields` keys must be present. Contains BF schema elements that will be used as a component. |

API as Vue component

| Key | Description |
| :--- | :--- |
| &lt;bfcomp&gt; | html tag name needed to identify a BF component |
| modelSource | used to decide what the model will be for this component |
| modelDev | optional, used to add model keys that can be used for development and tests of components that are rendered where there is no `model` available.  |

