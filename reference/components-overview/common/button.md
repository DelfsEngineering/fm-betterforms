# Button

This page showcases various buttons you can implement in your app, each designed for specific actions. Below is a detailed explanation of the different button types, their configurations, and their intended actions.

{% hint style="info" %}
To see buttons in action, check out [example](https://app.fmbetterforms.com/#/apps/pages/edit?id=5251675D-4A4D-4FE1-AD35-5D5B038CA924)[s ](https://app.fmbetterforms.com/#/apps/pages/edit?id=5251675D-4A4D-4FE1-AD35-5D5B038CA924)on this [page](https://examplesdev.fmbetterforms.com/#/form/5251675D-4A4D-4FE1-AD35-5D5B038CA924).
{% endhint %}

### Regular Buttons

The general structure of a button object is as follows:

```json
{
  "actions": [],
  "buttonClasses": "btn btn-info",
  "styleClasses": "col-md-2",
  "text": "Push Me",
  "type": "button"
}
```

To assign actions to a button, you can populate the <mark style="color:red;">`actions`</mark> array. Below are examples of common button actions.

#### **Open a Modal**

```json
{
    "actions": [{
        "action": "showModal",
        "options": {
            "body": "This is the modal body, actions are Kewl!",
            "icon": "success",
            "title": "<br>You triggered a modal!"
        }
    }],
    "buttonClasses": "btn btn-info btn-lg",
    "icon": "fa fa-comment",
    "styleClasses": "col-md-2",
    "text": "Show a Modal",
    "type": "button"
}
```

#### **Redirect to a Path**

*   **Internal Link**

    ```json
    {
        "actions": [{
            "action": "path",
            "options": {
                "path": "/dash"
            }
        }],
        "buttonClasses": "btn btn-info",
        "hint": "This redirects the user to another form",
        "styleClasses": "col-md-2",
        "text": "Goto /dash",
        "type": "button"
    }
    ```
*   **External Link**

    ```json
    {
        "actions": [{
            "action": "path",
            "options": {
                "url": "https://docs.fmbetterforms.com/"
            }
        }],
        "buttonClasses": "btn btn-danger btn-xl btn-trans btn-pill",
        "hint": "Styled with CSS, opens a new tab",
        "styleClasses": "col-md-2",
        "text": "Show Documentation",
        "type": "button"
    }
    ```

#### **Show Alert**

```json
{
    "actions": [{
        "action": "showAlert",
        "options": {
            "text": "This is the Alert body, actions are Kewl!",
            "title": "Hello World!",
            "type": "error"
        }
    }],
    "buttonClasses": "btn btn-primary btn-block",
    "hint": "Fills the column it defines",
    "icon": "fa exclamation-triangle",
    "styleClasses": "col-md-4",
    "text": "Full Width showAlert",
    "type": "button"
}
```

#### JavaScript Function

The Print button action executes JavaScript functions:

```json
{
    "actions": [{
        "action": "function",
        "function": "window.print()",
        "options": {}
    }],
    "buttonClasses": "btn btn-success btn-trans",
    "icon": "fa icon-printer",
    "styleClasses": "col-md-2",
    "text": "Print",
    "type": "button"
}
```

#### runUtilityHook

This action allows you to run the <mark style="color:red;">`onUtilityHook`</mark> workflow when clicked. You can pass additional parameters in the <mark style="color:red;">`options`</mark> object:

*   **Run Utility Hook**

    ```json
    {
        "actions": [{
            "action": "runUtilityHook",
            "options": {
                "type": "save"
            }
        }],
        "buttonClasses": "btn btn-info",
        "hint": "to save...",
        "styleClasses": "col-md-2",
        "text": "Save",
        "type": "button"
    }
    ```

#### Dropdown Buttons

Dropdown buttons contain multiple button objects within the `subs` array. Here’s an example:

```json
{
    "buttonClasses": "btn btn-info btn-trans",
    "icon": "fa fa-comment",
    "label": "Dropdown Menu",
    "styleClasses": "col-md-4",
    "subs": [{
        "actions": [],
        "text": "Button 1"
    }, {
        "divider": true
    }, {
        "actions": [],
        "text": "Button 2"
    }],
    "text": "Some Actions",
    "type": "button"
}
```

### Button Groups

Button groups use the <mark style="color:red;">`group`</mark> array to bundle related buttons together.

```json
{
    "group": [{
        "actions": [],
        "buttonClasses": "btn btn-success btn-trans",
        "icon": "fa fa-plus",
        "text": "Add",
        "type": "button"
    }, {
        "actions": [],
        "buttonClasses": "btn btn-success btn-trans",
        "icon": "fa fa-archive",
        "text": "Save",
        "type": "button"
    }],
    "groupClasses": "btn-group",
    "styleClasses": "col-md-6",
    "type": "button"
}
```

### Dynamic Styling

This button uses <mark style="color:red;">`buttonClasses_calc`</mark> to dynamically generate CSS classes. It is a computed property that combines static classes with dynamic model data:

```json
{
    "actions": [],
    "buttonClasses_calc": "'p-4 w-48 text-center border font-bold rounded-lg ' + model.buttonStyleClasses",
    "styleClasses": "col-md-3",
    "text": "Push Me",
    "type": "button"
}
```

### Input with Button

This button uses the <mark style="color:red;">`onclick_actions`</mark> array to call a <mark style="color:red;">`namedAction`</mark> when clicked:

```json
{
    "buttons": [{
        "classes": "btn btn-success btn-trans",
        "label": "Do Something",
        "onclick_actions": [{
            "action": "namedAction",
            "name": "SomethingClicked",
            "options": {}
        }]
    }],
    "inputType": "text",
    "label": "My Input",
    "model": "field1",
    "styleClasses": "col-md-3",
    "type": "input"
}
```
