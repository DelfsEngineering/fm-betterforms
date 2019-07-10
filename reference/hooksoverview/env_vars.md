# Reducing Payload Size

By default, hooks will send their full schema the `Send full schema in utility hooks` setting in the form editor disabled. The browser will send a reduced data payload for faster transfer times. This can be enabled for some special use cases require full schema.

### Controlling Data Sent from the Browser

​Often the form model contains a lot of data that does not need to be passed in Hooks. BetterForms provides two methods to control what data is passed in utility hooks.

#### **Model Override Method**

You can pass an array of paths or keys that will be applied to the form model and allow data to pass though. this allows you to pick out one or more keys to allow to pass on in the hook. The filtering follows [lodash's `pick` method](https://lodash.com/docs/4.17.11#filter).

#### ​ModelFilterKeys Method

B​y passing in a \`model\` key you can override the form’s data model that would normally be passed. Add a \`\_calc\` to the model key to bind it to other model data.

#### Example runUtilityHook Actions

```yaml
// With data model containing the following

{
  "isLoading": true,
  "activeContact": {
    //... some single contact object
  },
  "allContacts" ; [
    {
      //... array of contact objects
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
    "modelFilterKeys": [ "activeContact" ], // you can have multiple filterd keys
    "type": "save"
  }
}

// this will send only the model.activeContact object using the `model` method
{
  "action": "runUtilityHook",
  "options": {
    "model_calc" : "{activeContact: model.activeContact}",  
    "type": "save"
  }
}
```



 



