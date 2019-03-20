# Actions Processor

The actions processor allows you to create interactions with the user. The actions object can be an array of actions. Actions are executed sequentially. Some actions block the executing of the next action until they are complete.

The actions processor is basically a scripting language processor. Nearly all aspects of the BF app can be controlled with actions.

### Action Types:

#### Regular Actions

* _**showModal**_ ****- Renders a modal dialog
* _**hideModal**_ ****- Hides a modal that is non-blocking
* _**showAlert**_ ****- Renders a toaster style alert
* _**path**_ **-** redirects the user to a new page ****
* _**runUtilityHook**_ ****- runs the `onUtility` hook passing it params
* _**downloadFile**_ ****- downloads a file \(link\) to the user
* _**runOnCompleteHook**_ ****- runs the `onComplete` hook
* _**clipboard**_ ****- runs `clipboard` action allowing interaction with the clipboard
* _**cookie**_ ****- Allows setting of browser side cookies
* _**wait**_ - Waits for specified time or event
* _**emit**_ - Vue event bus message emit
* _**scrollTo**_ - Scrolls to an element
* _**namedAction**_ - Runs a named action. Also requires the `name` key.
* _**function**_ - Runs JavaScript 

#### Authentication Actions 

* _**authLogin**_ - Performs an authentication login
* _**authLogout**_ - Performs logout
* _**authReset**_ - Performs a password reset action
* _**authForgot** -_ Performs a forgotten password reset hook
* _**authVerify**_  - Performs a verification of the verify token

See custom login Forms for more details

### Usage

Actions can be injected in many places:

* Most hook scripts
* Navigation Menu Items
* Form action elements \(buttons\)
* Named Actions
* \`\*\_actions\` schema keys \(where supported\)

### $$BF\_Actions - Actions Array

The `$$_Actions`  JSON array is surfaced in all of the developer hooks that are applicable to executing actions.

To add an action simply add the action object as an array element. There are FileMaker custom functions that make this easy. 

Actions are executed sequentially starting at the beginning of the array. 

### Other places you can use actions

**actionsBeforeComplete** can be added to the `schema.form` object and BetterForms will run the actions array if present. 

### Action Object

| Key | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| action | string |  | The name of the action  |
| function | string |  | {optional} All actions can also take a function. This is processed just before the action is executed. This function can be an JS code and can also easily change the action parameters itself of any other environmental value. This is handy for pre-processing data prior to an action.  |
| preventClone | boolean | false | {optional} Default: true. When true the entire actions array will not be striped of its references to the objects that were passed in when it was created. This is handy when you are passing references to object that you want to modify later. For example, the BF HTML and JS editor passes in a reference to the source editor so that it is easy to later call methods in that passed in editor. Doing this makes it easy to not have to worry about mutating code in the wrong source editor. You generally should never need to change this unless you have a valid use case warranting it.   By default, all passed in actions are cloned decoupling them from their original objects. |
| nonBlocking | boolean | false | {optional} When added to the action and true, the actions processor will not wait for the action to complete before starting the next action. This is useful when you have a blocking action but still want other things to run \(like slow process utility hooks\) |
| options | object |  | This object may be optional depending on the specific settings needed by a given action.. |

#### Actions Options

#### Functions

All actions object can also have a `function` key. If defined, the JS code within this key will be executed. The result is not used, so it is expected that your code will mutate the environment. 

The main difference between the function action and using actions with an added `function` key is that there is no additional action associated with it.

For additional information see the [Function Action](function-1.md)

## Calling Named Actions <a id="functions"></a>

### Triggering Actions on Field Changes

All field element types support an `onChanged_actions`  key. This key can contain actions that will be run when the elements data  model changes.

```text
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



You can call named actions from an actions array too. Simply omit the `action` key and add a `name` key.

```text
// example shows a button that calls a named action
{
  "actions": [
    {
      "name": "copyAddress",
      "options": {
        "key": "value"
      }
    }
  ],
  "buttonClasses": "btn btn-info btn-trans btn-sm",
  "styleClasses": "col-md-2",
  "text": "Call a named action",
  "type": "button"
}
```

