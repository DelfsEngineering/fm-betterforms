---
description: >-
  Components are chunks of reusable code. They allow you to define code in a
  single place and reuse it throughout your app. Components can be references
  through HTML or with BF JSON schema
---

# Custom Components

{% hint style="danger" %}
This page is under construction🚧&#x20;
{% endhint %}

### Building and Customizing

Both the BF JSON and the HTML API's are the same. Keys within the BF JSON schema can be references from within the component as \``` schema` ``



### **Component API**

<table><thead><tr><th width="165">Key</th><th width="145.33333333333331">Type</th><th>Description</th></tr></thead><tbody><tr><td><code>fields</code></td><td>array</td><td>Optional either <code>html</code> or <code>fields</code> keys must be present. Contains BF schema elements normally found in the <code>fields</code> key of the page editor. The schema will be used as a component.<br>If supplied will act as the source of the field schema and replace the components default fields if there are any. </td></tr><tr><td><em><code>schema</code></em></td><td>object</td><td>All schema keys can be accessed from within the component as <code>schema.myTitle</code> This allows you to pass data dynamically into the component</td></tr><tr><td><code>html</code></td><td>string</td><td>Contains HTML to be rendered as a component.</td></tr><tr><td><code>&#x3C;bfcomp></code></td><td></td><td>html tag name needed to identify a BF component</td></tr><tr><td>name</td><td>string</td><td>The component name</td></tr><tr><td><code>modelSource</code></td><td>object</td><td>used to supply the model will be for this component, in not supplied, the current model for the element is used.</td></tr><tr><td><code>modelDev</code></td><td>object</td><td>Optional. Used to add model keys that can be used for development and tests of components rendered where there is no <code>model</code> available. ( Used by the BF editor )</td></tr><tr><td><code>source</code></td><td>{ component }</td><td>If supplied, this will act as the entire source for the component. This attribute was added to allow the BF component editor to preview live components. You probably will never use this key.</td></tr><tr><td><em><code>attributes</code></em></td><td>various</td><td>All additional attributes supplied will override the component's schema keys where applicable.<br>You can add any additional attribute or 'props' you need. Eg: <code>buttonLabel</code></td></tr><tr><td></td><td></td><td></td></tr></tbody></table>

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

### Context

Components mostly act the same as any other BF element for context. They see `model` and `app` the same regardless of HTML or BF JSON Elelemtn schema.&#x20;



## Best Practices









