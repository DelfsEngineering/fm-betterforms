# Actions

This page is the action index. Use it to see which actions are supported and then click through to the detailed action pages.

## Core Actions

| Action | Summary | Details |
| --- | --- | --- |
| `showModal` / `hideModal` | Opens or closes the standard modal dialog | [showModal / hideModal](showmodal.md) |
| `showCardModal` / `hideCardModal` | Opens or closes a card modal that renders another page | [showCardModal / hideCardModal](showcardmodal.md) |
| `showAlert` | Shows a toaster-style alert | [showAlert](showalert.md) |
| `path` | Navigates to another page, URL, or target window | [path](path.md) |
| `runUtilityHook` | Calls the scoped server utility hook workflow | [runUtilityHook](runutilityhook.md) |
| `runOnCompleteHook` | Triggers the completion hook flow and waits before continuing | [runOnCompleteHook](runoncompletehook.md) |
| `validate` | Runs page validation | [validate](validate.md) |
| `setFocus` | Focuses or selects an input element | [setFocus](setfocus.md) |
| `scrollTo` | Scrolls to a target element | [scrollTo](scrollTo.md) |
| `wait` | Delays the next queued action for a specified number of milliseconds | [wait](wait.md) |
| `debounce` | Delays repeated actions until activity settles | [debounce](debounce.md) |
| `throttle` | Limits how frequently an action can run | [throttle](throttle.md) |
| `function` | Runs JavaScript in the client workflow | [function](function-1.md) |
| `emit` | Emits an internal event-bus event | [emit](emit.md) |
| `mapInfoWindow` | Emits a component-facing map info-window event | [mapInfoWindow](mapinfowindow.md) |
| `clipboard` | Interacts with the clipboard helper | [clipboard](clipboard.md) |
| `cookie` | Sets or removes browser-side cookies | [cookie](cookie.md) |
| `consoleError` | Writes a message to the browser error console | [consoleError](consoleError.md) |
| `namedAction` | Runs another named action / workflow by name | [Named Actions](../actions_named.md) |

### Authentication Actions

These special actions allow you to create custom login and registration pages. See this page for more:

{% content-ref url="../authentication-actions.md" %}
[authentication-actions.md](../authentication-actions.md)
{% endcontent-ref %}

### Messaging Actions

| Action | Summary | Details |
| --- | --- | --- |
| `messageSend` | Sends a BetterForms message | [messageSend](messagesend.md) |
| `messageSendAnonChannel` | Sends a message to an anonymous channel flow | [messageSendAnonChannel](messagesendanonchannel.md) |
| `channelJoinAnon` | Joins an anonymous channel | [channelJoinAnon](channeljoinanonymous.md) |
| `channelLeaveAnon` | Leaves an anonymous channel | [channelLeaveAnon](channelleaveanon.md) |

### Payment Actions

| Action | Summary | Details |
| --- | --- | --- |
| `showStripeCheckout` | Triggers the Stripe checkout event for a configured form | [showStripeCheckout](showStripeCheckout.md) |

### OAuth Actions

| Action | Summary | Details |
| --- | --- | --- |
| `authLoginOauth` | Finalizes OAuth login on the callback page | [authLoginOauth / oauthLoginHook](authloginoauth.md) |
| `oauthLoginHook` | Legacy alias for `authLoginOauth` | [authLoginOauth / oauthLoginHook](authloginoauth.md) |

### PWA Actions

| Action | Summary | Details |
| --- | --- | --- |
| `pwaCustomInstall` | Captures the browser install prompt for later use | [pwaCustomInstall](pwacustominstall.md) |
| `pwaPromptInstall` | Triggers the stored browser install prompt | [pwaPromptInstall](pwapromptinstall.md) |
| `pwaPromptPushPermission` | Requests push-notification permission and registers the browser subscription | [pwaPromptPushPermission](pwapromptpushpermission.md) |
| `pwaPushNotificationSend` | Sends a push notification through BetterForms | [pwaPushNotificationSend](pwapushnotificationsend.md) |

### AI / Tooling Actions

| Action | Summary | Details |
| --- | --- | --- |
| `llmToolCall` | Maps LLM-requested frontend tools into BetterForms named actions | [llmToolCall](llmtoolcall.md) |
| `llmToolCallResponse` | Sends a frontend tool result back to the tool-response service | [llmToolCallResponse](llmtoolcallresponse.md) |
| `llmQueryStop` | Requests that an active `/llm/query` stream stop | [llmQueryStop](llmquerystop.md) |
| `assistantStop` | Requests that an active assistants run stop | [assistantStop](assistantstop.md) |

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

To add an action simply add the action object as an array element. There are FileMaker custom functions that make this easy.

Actions are executed sequentially starting at the beginning of the array.

### Other places you can use actions

**actionsBeforeComplete** can be added to the `schema.form` object and BetterForms will run the actions array if present.

### The Action Object

|            Key |   Type  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------: | :-----: | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       `action` |  string |         | The name of the action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|     `function` |  string |         | {optional} All actions can also take a function. This is processed just before the action is executed. This function can be an JS code and can also easily change the action parameters itself of any other environmental value. This is handy for pre-processing data prior to an action.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `preventClone` | boolean | false   | <p>{optional} When true, BetterForms does not strip object references before running the action array. By default, actions are cloned so they are decoupled from the original objects that created them.</p> |
|  `nonBlocking` | boolean | false   | {optional} When added to the action and true, the actions processor will not wait for the action to complete before starting the next action. This is useful when you have a blocking action but still want other things to run (like slow process utility hooks)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|      `options` |  object |         | This object may be optional depending on the specific settings needed by a given action.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### Actions Options

#### Functions

All actions object can also have a `function` key. If defined, the JS code within this key will be executed. The result is not used, so it is expected that your code will mutate the environment.

The main difference between the function action and using actions with an added `function` key is that there is no additional action associated with it.

For additional information see the [Function Action](function-1.md)

## Calling Named Actions <a href="#functions" id="functions"></a>

### Triggering Actions on Field Changes

All field element types support an `onChanged_actions` key. This key can contain actions that will be run when the elements data model changes.

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

For user-facing docs and custom scripts, clear queued actions with the public BetterForms helper:

```javascript
BF.actionsClear()
```

The following JS code will stop any subsequent actions from running if the `isRegistered` flag is false.

```javascript
// in a function key
if(!model.isRegistered) {
    BF.actionsClear()
}
```
