---
description: 'What are they, how are they reusable and why'
---

# Custom Components

### Building and Customizing



### **Component API**

| **Key** |  | **Description** |
| :--- | :--- | :--- |
| HTML |  | Contains HTML to be rendered as a component. |
| fields |  | Optional either `html` or `fields` keys must be present. Contains BF schema elements normally found in the `fields` key of the page editor. The schema will be used as a component. |
| source |  | optional |
| _schema_ |  | All schema keys can be accessed from within the component as `schema.theKey` This allows  |
|  |  |  |

### Implementation API

| Key |  | Description |
| :--- | :--- | :--- |
| &lt;bfcomp&gt; |  | html tag name needed to identify a BF component |
| name | string | The component name |
| modelSource |  | used to supply the model will be for this component |
| modelDev | object | optional, used to add model keys that can be used for development and tests of components that are rendered where there is no `model` available. \( Used by the BF editor \) |
| source | { component  } | If supplied, this will act as the entire source for the component. This attribute was added to allow the BF component editor the ability to preview live components. |
| fields | array | If supplied will act as the source of the field schema and replace the components default fields |
| _attributes_ |  various | All additional attributes supplied will override the components schema keys where applicable. |

#### Usage as an JSON Schema element

&lt; JSON Schema here &gt;

#### Usage as an HTML Vue component

```markup
<bfcomp name="MyComponent" modelSource="model"   ></bfcomp>
```



