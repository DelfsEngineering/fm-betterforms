# Actions

This page is the action index. Use it to see which actions are supported in the current browser runtime and then click through to the detailed action pages.

## What Actions Are

Actions are browser-side workflow steps processed by the BetterForms actions queue.

Use them to:

- navigate or open UI elements
- run browser-side JavaScript
- trigger named actions
- call FileMaker through actions such as `runUtilityHook`

Actions are not the same thing as FileMaker hooks. Hooks are server-side scripts; actions are client-side workflow steps that may call those hooks.

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

Actions can run from many places:

* `$$BF_Actions` payloads returned from supported FileMaker hooks
* navigation menu items
* page elements such as buttons
* named actions
* `*_actions` schema keys (where supported)

Wherever you see an `actions` key in BetterForms, it can be either:

- a single action object
- an array of action objects to run in sequence

### \$$BF\_Actions - Actions Array

`$$BF_Actions` is the browser action array that applicable FileMaker hooks can return.

Each array element is one action object. BetterForms queues them and runs them in order.

For user-facing docs and custom scripts, clear queued actions with the public BetterForms helper:

```javascript
BF.actionsClear()
```

### Other places you can use actions

`actionsBeforeComplete` can be added to `schema.form` and BetterForms will run that action array when present.

### The Action Object

|            Key |   Type  | Default | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| -------------: | :-----: | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|       `action` |  string |         | The name of the action                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|     `function` |  string |         | {optional} All actions can also take a function. This is processed just before the action is executed. This function can be an JS code and can also easily change the action parameters itself of any other environmental value. This is handy for pre-processing data prior to an action.                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `preventClone` | boolean | false   | <p>{optional} When true, BetterForms does not strip object references before running the action array. By default, actions are cloned so they are decoupled from the original objects that created them.</p> |
|  `nonBlocking` | boolean | false   | {optional} When added to the action and true, the actions processor will not wait for the action to complete before starting the next action. This is useful when you have a blocking action but still want other things to run (like slow process utility hooks)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|      `options` |  object |         | This object may be optional depending on the specific settings needed by a given action.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

## `function` On Any Action

Any action object can also include a `function` key. When present, BetterForms runs that JavaScript just before the action executes.

Use this for pre-processing or mutating the action/options just before the action runs.

This is different from the standalone [`function` action](function-1.md), which is itself the action being executed.

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

```javascript
// in a function key
if (!model.isRegistered) {
  BF.actionsClear()
}
```
