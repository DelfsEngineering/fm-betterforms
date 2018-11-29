# Actions Processor

The actions processor allows you to create interactions with the user. The actions object is an array. Actions are executed sequentially. Modal actions what until the modal is closed.

## Actions:

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
* scrollTo - Scrolls to an element
* function - Runs JavaScript 
* authLogin, ...TBD

## Usage

Actions can be injected in many places:

* Most hook scripts
* Navigation Menu Items
* Form action elements \(buttons\)
* Named Actions



## $$BF\_Actions - Actions Array

The `$$_Actions`  JSON array is surfaced in all of the developer hooks that are applicable to executing actions.

To add an action simply add the action object as an array element. There are custom functions that make this easy. 

Actions are executed sequentially starting at the beginning of the array. 



## Other places you can use actions

**actionsBeforeComplete** can be added to the `schema.form` object and BetterForms will run the actions array if present

## Actions Options

`nonBlocking` - When added to the action and try, the actions processor will not wait for the action to complete before starting the next action. This is useful when you have a blocking modal that tells the user to please wait and want other things to run \(like slow process utility hooks\)

## Functions

The actions object can also have a `function` key. If defined, the JS code within this key will be executed. The result is not used, so it is expected that your code will mutate the environment. 

The main difference between the function action and using actions with an added `function` key is that there is no additional action associated with it.

For additional information see the [Function Action](function-1.md)

