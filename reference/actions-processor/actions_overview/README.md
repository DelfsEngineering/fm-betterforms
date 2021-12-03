# Actions

## Action Types

### Regular Actions

* _**showModal**_** ** - Renders a modal dialog
* _**hideModal**_** ** - Hides a modal that is non-blocking
* _**showAlert**_** ** - Renders a toaster style alert
* _**path**_** -** redirects the user to a new page ****&#x20;
* _**debounce** - Delay running actions until a period of inactivity happens_
* _**throttle**_** -** Limit how frequent actions can run
* _**runUtilityHook**_** ** - runs the `onUtility` hook passing it params
* _**runOnCompleteHook**_** ** - runs the `onComplete` hook
* _**clipboard**_** ** - runs `clipboard` action allowing interaction with the clipboard
* _**cookie**_** ** - Allows setting of browser side cookies
* _**wait**_ - Waits for specified time or event
* _**emit**_ - Vue event bus message emit
* _**scrollTo**_ - Scrolls to an element
* _**namedAction**_ - Runs a named action. Also requires the `name` key.
* _**function**_ - Runs JavaScript&#x20;

### Authentication Actions&#x20;

These special actions allow you to create custom login and registration pages. See this page for more:

{% content-ref url="../authentication-actions.md" %}
[authentication-actions.md](../authentication-actions.md)
{% endcontent-ref %}

## Usage

Actions can be injected in many places:

* Most hook scripts
* Navigation Menu Items
* Page elements (buttons)
* Named Actions
* `*_actions` schema keys (where supported)

Wherever you see an `actions` key in BetterForms, it can be either an object (for running a single action), or an array of objects (to run a series of actions).

### \$$BF\_Actions - Actions Array

The `$$BF_Actions` JSON array is surfaced in all of the developer hooks that are applicable to executing actions.

To add an action simply add the action object as an array element. There are FileMaker custom functions that make this easy.&#x20;

Actions are executed sequentially starting at the beginning of the array.&#x20;

### Other places you can use actions

**actionsBeforeComplete** can be added to the `schema.form` object and BetterForms will run the actions array if present.&#x20;

### The Action Object

|            Key |   Type  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| -------------: | :-----: | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|       `action` |  string |         | The name of the action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
|     `function` |  string |         | {optional} All actions can also take a function. This is processed just before the action is executed. This function can be an JS code and can also easily change the action parameters itself of any other environmental value. This is handy for pre-processing data prior to an action.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `preventClone` | boolean | false   | <p>{optional} Default: true. When true the entire actions array will not be striped of its references to the objects that were passed in when it was created. This is handy when you are passing references to object that you want to modify later. For example, the BF HTML and JS editor passes in a reference to the source editor so that it is easy to later call methods in that passed in editor. Doing this makes it easy to not have to worry about mutating code in the wrong source editor. You generally should never need to change this unless you have a valid use case warranting it. <br><br>By default, all passed in actions are cloned decoupling them from their original objects.</p> |
|  `nonBlocking` | boolean | false   | {optional} When added to the action and true, the actions processor will not wait for the action to complete before starting the next action. This is useful when you have a blocking action but still want other things to run (like slow process utility hooks)                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|      `options` |  object |         | This object may be optional depending on the specific settings needed by a given action..                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Actions Options



#### Functions

All actions object can also have a `function` key. If defined, the JS code within this key will be executed. The result is not used, so it is expected that your code will mutate the environment.&#x20;

The main difference between the function action and using actions with an added `function` key is that there is no additional action associated with it.

For additional information see the [Function Action](function-1.md)

## Calling Named Actions <a href="#functions" id="functions"></a>

### Triggering Actions on Field Changes

All field element types support an `onChanged_actions`  key. This key can contain actions that will be run when the elements data  model changes.

```
// This will show an alert when the checkbox is toggled
{
  "styleClasses": "col-md-4",
  "text": "Enter Address Manually",
  "type": "bfcheckbox1",
  "model": "manualAddress",
  "onChanged_actions": [
    {
      "action": "showAlert",
      "options": {
        "text": "This is the alert message text",
        "title": "Hello World",
        "type": "information"
      }
    }
  ]
}
```

### Clearing Actions

Actions can be cleared programmatically in a `function` action or `function` key by calling the following internal BF command: \`

```javascript
    vueapp.$store.dispatch('ACTIONS_CLEAR')   
```

The following JS code will stop any subsequent actions from running if the `isRegistered` flag is false.

```javascript
// in a function key
if(!model.isRegistered) {
    vueapp.$store.dispatch('ACTIONS_CLEAR')
}
```



