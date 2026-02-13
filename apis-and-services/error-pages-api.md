# BetterForms Error Pages API

{% hint style="info" %}
[Complete Error Code List](/broken/pages/94FDbUanQbIvwtysoRMS)
{% endhint %}

## Introduction

This document covers the system static and app dynamic error pages and how they work. The static error page is a non-customizable page that will be shown for lower level errors (e.g. BF server, network, providers errors), and the app dynamic error page is shown for some higher-level errors (e.g. page not found, request timeout, and some FM errors like Invalid Data API token).

### Static Error Page

Errors that occur before the app is able to connect to the DB or a site record was not found, for example, will be redirected to a static page that can not be customized. The picture below is an example of the static error page.

![Untitled](../.gitbook/assets/Untitled.png)

### Dynamic Error Page

The error page can be accessed via the nav slug <mark style="color:red;">`/error`</mark>. It will be associated with either a default or custom page. The picture below shows the default error page.

<figure><img src="../.gitbook/assets/Untitled 1.png" alt=""><figcaption></figcaption></figure>

#### Custom error pages

All apps have a system-generated error page that you can override. To override, simply add a page with the reserved nav slug of <mark style="color:red;">`/error`</mark> and you can create and customize your own page. Error detail data is saved to the <mark style="color:red;">`app`</mark> model as <mark style="color:red;">`app.error`</mark>, and can be accessed in the error page. The error object looks like this:

```json
{
	"error": {
		"code": "404",
		"description": "Page Not Found",
		"message": "Page not found for slug: nopage"
	}
}
```

### Custom error handlers

Besides customizing the error page, you can also customize how all errors are handled and override the default system behavior.

For example, the default <mark style="color:red;">‘Page Not Found’</mark> error would navigate to the <mark style="color:red;">`/error`</mark> page but if you would rather show a toaster alert, the following could be added to the <mark style="color:red;">`App`</mark> model.

```json
{
	"errorHandlers": [{
        "actions": [{
            "action": "showAlert",
            "function": "action.options.text = action.options.error.message",
            "options": {
                "text": "",
                "title": "Error",
                "type": "error"
            }
        }],
        "codes": ["404"]
    }]
}
```

As it can be seen above, custom behaviours are added under a reserved global actions key <mark style="color:red;">`errorHandlers`</mark>, and that will be an array of objects. Each object having have <mark style="color:red;">`codes`</mark> and <mark style="color:red;">`actions`</mark>.

| Key     | Value                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------- |
| codes   | <mark style="color:red;">`array`</mark> of error codes that the associated actions will run with. |
| actions | array of actions                                                                                  |

The result from the example code above is the alert shown below.

<figure><img src="../.gitbook/assets/Untitled 2.png" alt=""><figcaption></figcaption></figure>

The error data can be found under <mark style="color:red;">`options`</mark> for each action of the array, for a given code. The error object has the same shape as previously presented [here](https://www.notion.so/BetterForms-Error-Pages-API-b5fe058f25ee4cb38758d7c089bea073?pvs=21) and can be accessed as follows:

| Key                                           | Path                              |
| --------------------------------------------- | --------------------------------- |
| <mark style="color:red;">`code`</mark>        | actions.options.error.code        |
| <mark style="color:red;">`description`</mark> | actions.options.error.description |
| <mark style="color:red;">`message`</mark>     | actions.options.error.message     |
