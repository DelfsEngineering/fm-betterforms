---
description: What are they, how are they reusable and why
---

# Custom Components

{% hint style="danger" %}
This page is under construction🚧&#x20;
{% endhint %}

### Building and Customizing

### **Component API**

| **Key**     |             | **Description**                                                                                                                                                                     |
| ----------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML        |             | Contains HTML to be rendered as a component.                                                                                                                                        |
| fields      |             | Optional either `html` or `fields` keys must be present. Contains BF schema elements normally found in the `fields` key of the page editor. The schema will be used as a component. |
| source      |             |                                                                                                                                                                                     |
| modelSource | _{ model }_ | If supplied, this will act as the models data source                                                                                                                                |
| _schema_    |             | All schema keys can be accessed from within the component as `schema.theKey` This allows                                                                                            |
|             |             |                                                                                                                                                                                     |

### Implementation API

| Key          |               | Description                                                                                                                                                                |
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| \<bfcomp>    |               | html tag name needed to identify a BF component                                                                                                                            |
| name         | string        | The component name                                                                                                                                                         |
| modelSource  |               | used to supply the model will be for this component, in not supplied, the current model for the element is used.                                                           |
| modelDev     | object        | optional, used to add model keys that can be used for development and tests of components that are rendered where there is no `model` available. ( Used by the BF editor ) |
| source       | { component } | If supplied, this will act as the entire source for the component. This attribute was added to allow the BF component editor the ability to preview live components.       |
| fields       | array         | If supplied will act as the source of the field schema and replace the components default fields                                                                           |
| _attributes_ | various       | All additional attributes supplied will override the components schema keys where applicable.                                                                              |

#### Usage as an JSON Schema element

```json
{
    "name": "MyComponentName",
    "styleClasses": "",
    "type": "bfcomponent"
}
```

#### Usage as an HTML Vue component

```markup
<bfcomp name="MyComponent" modelSource="model"   ></bfcomp>
```



