# Actions Processor

The actions processor allows you to create interactions with the user. The actions object is an array. Actions are executed sequentially. Modal actions what until the modal is closed.

### Action Types:

* _**showModal**_** **- Renders a modal dialog

* _**hideModal**_** **- Hides a modal that is non-blocking

* _**showAlert**_** **- Renders a toaster style alert

* _**path **_**- **redirects the user to a new page** **

* _**runUtilityHook**_** **- runs the `onUtility` hook passing it params

* _**downloadFile**_** **- downloads a file \(link\) to the user

* _**runOnCompleteHook**_** **- runs the `onComplete` hook

* _**clipboard**_** **- runs `clipboard` action allowing interaction with the clipboard

### Usage

Actions can be injected the following places:

* All hooks 
* Navigation Menu Items
* Form action elements \(buttons\)
* Wizard tabbed forms before onCompleteHook is run


### _$actions_ - Actions Array

The `$$#actions ($actions)` JSON array is surfaced in many of the developer hooks that are applicable to rendering actions.

To add an action simply add the action object as an array element.

Actions are executed sequentially starting at `index = 0`

You should always have a `"action": "path"` when you are adding actions to the `onLogin` developer hook. If you do not, the user will be stuck at the login prompt page.

### Other places you can use actions

**actionsBeforeComplete** can be added to the `schema.form` object and BetterForms will run the actions array if present

### Actions Options

nonBlocking - When added to the action and try, the actions processor will not wait for the action to complete before starting the next action. This is useful when you have a blocking modal that tells the user to please wait and want other things to run \(like slow process hooks\)

