# 2.6 Adding Actions to Your Page

Now that you understand the basics of the Page Data Model and Hooks, let's explore how to add actions to your page in BetterForms. This guide will walk you through the process of setting up and running actions.

## Introduction to Actions

Actions are instructions that tell the BetterForms framework to perform some operation. They can be used to create interactions with the user. Actions can be executed sequentially, and some actions block the execution of the next action until they are complete.

## Types of Actions

### Regular Actions

* _**showModal**_ - Renders a modal dialog
* _**hideModal**_ - Hides a modal that is non-blocking
* _**showAlert**_ - Renders a toaster style alert
* _**path**_ - redirects the user to a new page
* _**runUtilityHook**_ - runs the `onUtility` hook passing it params
* _**downloadFile**_ - downloads a file (link) to the user
* _**runOnCompleteHook**_ - runs the `onComplete` hook
* _**clipboard**_ - runs `clipboard` action allowing interaction with the clipboard
* _**cookie**_ - Allows setting of browser side cookies
* _**wait**_ - Waits for specified time or event
* _**emit**_ - Vue event bus message emit
* _**scrollTo**_ - Scrolls to an element
* _**namedAction**_ - Runs a named action. Also requires the `name` key.
* _**function**_ - Runs JavaScript

### Authentication Actions

* _**authLogin**_ - Performs an authentication login
* _**authLogout**_ - Performs logout
* _**authReset**_ - Performs a password reset action
* _**authForgot** -_ Performs a forgotten password reset hook
* _**authVerify**_  - Performs a verification of the verify token
* _**authResend**_ - Re/sends the email verification token
* _**authRegister**_ - Performs a registration and if successful, runs the `onRegistrationHook`

## Where Actions Can Be Used

Actions can be injected in many places:

* Most hook scripts
* Navigation Menu Items
* Form action elements (buttons)
* Named Actions
* `*_actions` schema keys (where supported)

## Adding Actions to a Page

To add actions to a page, you can use the `actions` key in the page schema. This key can be either an object (for running a single action) or an array of objects (to run a series of actions).

### Example: Adding a Button with Actions

Here's an example of how to add a button with actions to your page:

```json
{
  "actions": [{
    "action": "showAlert",
    "options": {
      "text": "This is the alert message text",
      "title": "Hello World",
      "type": "information"
    }
  }],
  "buttonClasses": "btn btn-primary",
  "styleClasses": "col-md-4",
  "text": "Show Alert",
  "type": "button"
}
```

### Example: Adding a Named Action

You can also use named actions to define a set of actions that can be called from multiple places. Here's an example of how to define a named action:

```json
"namedActions": {
  "showCantDoThat": {
    "action": "showAlert",
    "options": {
      "title": "Whoooaa!!",
      "text": "You can't do that thing you just did.",
      "type": "warning"
    }
  }
}
```

## Next Steps

You now have a basic understanding of how to add actions to your page in BetterForms. As you build out your first application, you'll become more familiar with these components and how to use them effectively.

Explore the [BetterForms Elements reference](../../core-concepts/betterforms-elements/README.md) to see the wide variety of available elements and their specific configuration options. 