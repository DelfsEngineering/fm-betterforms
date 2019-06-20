# Environmental Globals

There are defined $$BF\_xxx global variables available to all scripts. Use these to mutate data and hydrate pages.

| $$Var Name | Description |
| :--- | :--- |
| $$BF\_Model | This is the forms entire data model |
| $$BF\_App | Keys passed in will be merged with the current app model.  \(0.8.32+\) This global is not populated with the current `app` data, it is outbound only. |
| $$BF\_State | The state object holds various data related to the browser environment. |
| $$BF\_User | The user object when a user has been authenticated. |
| $$BF\_Query | Key value pairs of the URL query parameters. Useful for direct linking \(smart links\) to a page. |
| $$BF\_Form | The formSchema of the current page when applicable. This data may not be present of reduced payload options are set for the current layout. |
| $$BF\_Payload | This var has the entire payload object, most of it is over written at the end or the scripts, so if you mutate it, there is a good chance your data will be overwritten. |

## $$BF\_State

### Controlling Data Merge Mode

To reduce data transfer and increase performance and flexibility you can control the merge mode of the data in utility hooks. The default mode has the $$BF\_Model data replace the current web pages model. This is usually fine. 

`state.modelUpdateMode` Controls the way returned data is handled in the client.

| Key | Value | Description |
| :--- | :--- | :--- |
| `modelUpdateMode` | `replace`  or not supplied | If not supplied \(default\) or `replace` then the returned data from the hook will replace all of the current data model.  |
| `modelUpdateMode` | `merge` | Merge will use an `Object.assign` to merge the data keys supplied by the model with the current data model in the client.This will allow you to keep the current data in the app and only update \(and send\) the smaller changes. |

### Reducing Payload Size \(0.8.44+\)

In addition to reducing the data model, other payload keys can optionally be removed. The `form` `pages` and `options` keys can also be removed. These key are normally populated with form schema data and generally do not get mutated by the hook scripts. If the keys are empty the BetterForms client will continue to use the existing values significantly reducing the hook payload size and increasing performance.

By default forms have the `Send full schema in utility hooks` setting in the form editor disabled. The browser will send a reduced data payload for faster transfer times. This can be enabled for some special use cases require full schema.

### Controlling Data Sent from the Browser

​Often the form model contains a lot of data that does not need to be passed in Hooks. BetterForms provides two methods to control what data is passed in utility hooks.

#### **Model Override Method**

You can pass an array of paths or keys that will be applied to the form model and allow data to pass though. this allows you to pick out one or more keys to allow to pass on in the hook. The filtering follows [lodash's `pick` method](https://lodash.com/docs/4.17.11#filter).

#### ​ModelFilterKeys Method

B​y passing in a \`model\` key you can over ride the form’s data model that would normally be passed. Add a \`\_calc\` to the model key to bind it to other model data.

#### Example runUtilityHook Actions

```text
// With data model containing the following

{
  "isLoading": true,
  "activeContact": {
    ... some single contact object
  },
  "allContacts" ; [
    {
      ... array of contact objects
    }]
}


// This example will send the entire data model in the hook
{
  "action": "runUtilityHook",
  "options": {
    "type": "save"
  }
}

// this will send only the model.activeContact object using the `modelFilterKeys` method
{
  "action": "runUtilityHook",
  "options": {
    "modelFilterKeys": ["activeContact"],    // you can have multiple filterd keys
    "type": "save"
  }
}

// this will send only the model.activeContact object using the `model` method
{
  "action": "runUtilityHook",
  "options": {
    "model_calc":"{activeContact: model.activeContact}",  
    "type": "save"
  }
}
```



 



