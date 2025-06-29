---
description: Actions
---

# Introduction to Actions

## What is an Action?

You can think of an action as similar to a single Script Step in FileMaker. When executed, some action will occur.

The most common actions are:

* **path** - change the URL of the browser to take them to another page
* **runUtilityHook** - run a hook script on your FileMaker server
* **showAlert** - display a non-intrusive message to the user

### What does an action look like?

An action is a JSON object that contains a key named "action". Most actions also contain an "options" key that define various parameters for the action.

Below is an example of the `runUtilityHook` action.

```yaml
{
  "action": "runUtilityHook",
  "options": {
    "type": "save"
  }
}
```

and here is the `showAlert` action:

```yaml
{
  "action": "showAlert",
  "options": {
    "text": "This is the alert message text",
    "title": "Hello World",
    "type": "information"
  }
}
```

{% hint style="info" %}
Be sure to check out the [**Actions Reference**](../../reference/actions-processor/actions_overview/) for more details about how each action works.
{% endhint %}

## Where are actions triggered?

When actions are executed, they are always added to the end of the **actions queue** and evaluated in order. The actions queue is always running; if the actions queue is empty it will simply wait for new actions to be added and continue processing.

Various elements throughout a BetterForms page can add actions to the queue, here are just a few examples:

* **buttons** - triggered when a button is clicked
* **onFormLoad** - triggered when a page is first loaded
* **onRowClicked** - specifically for the [table element](../../reference/components-overview/common/tables2.md); triggered when a row in the table is clicked
* **onFieldChanged** - triggered when a field is changed

Throughout the docs, anywhere you see a reference to an "**actions key"** or **"actions array"**, this is where you can place actions.

Shown below is an example of a button object with an actions array. When the button is clicked, the `runUtilityHook` action will be added to the actions queue. The actions queue is always running and waiting for actions.

```yaml
{
  "actions": [
    {
      "action": "runUtilityHook",
      "options": {
        "type": "save"
      }
    }
  ],
  "buttonClasses": "btn btn-info btn-trans",
  "label": "",
  "styleClasses": "col-md-2",
  "text": "Save",
  "type": "button"
}
```



