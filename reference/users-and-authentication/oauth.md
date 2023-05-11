---
description: >-
  Oauth authentication is the protocol that allow users to login to your
  application using external provider credentials, such as Google, Auth0 or
  Okta.
---

# OAuth

## Pre-requisites

In order to use OAuth make sure you have the following information from the external provider that will be used.

* Client ID;
* Secret Key;
* Subdomain.

In addition, apps need to be:

* running version 2.0.6+;
* migrated to environments.

## Setting up

### Add domain to allowed callback URLs

Go to provider's admin console and add your domain as an Allowed Callback URLs, as following.

```
https://your.domain.com/oauth/providerName/callback
//Where providerName can be set as: google, auth0 or okta
```

### Save Credentials

Select the app where OAuth will be added, click on the ellipsis besides the App name and select `App Settings`.

![](<../../.gitbook/assets/image (4).png>)

Under `Authentication`, toggle the button `Enable 3rd Party Authentication`.

Select one of the 3 providers from the dropdown menu, enter Client ID, Client Secret and Subdomain (Scope still not implemented).

![](<../../.gitbook/assets/image (2).png>)

{% hint style="info" %}
Whenever an information from above is changed, the Client Secret always need to be reinserted.
{% endhint %}

Subdomain values vary from provider to provider:

| Provider | Domain                                | Subdomain          |
| -------- | ------------------------------------- | ------------------ |
| Google   | myClientID.apps.googleusercontent.com | N/A                |
| Auth0    | mySubdomain.region.auth0.com          | mySubdomain.region |
| Okta     | mySubdomain.okta.com                  | mySubdomain        |

{% hint style="info" %}
No subdomain value is needed for Google, and Auth0 domain doesn't always have a region in it.
{% endhint %}

### Helper File

A new field `oauthId` needs to be created in the `Users` table.

{% hint style="info" %}
Remeber to add the `ouahtId field to the layout.`
{% endhint %}

### Before Registration Hook - Business File

A before registration hook script can be added to the business file if you want  to control whether a user is allowed to register or not.

The script needs to be called `onBeforeRegistration`, and by setting `createUser` to true on `$$BF_Model` will allow users to register to your app via OAuth.

<div align="center">

<img src="../../.gitbook/assets/image (5).png" alt="">

</div>

{% hint style="info" %}
If `onBeforeRegistration` hook script is not created and/or `createUser` not set to true, users will not be allowed to register via OAuth.
{% endhint %}

Users registered via OAuth workflow are automatically verified, so there’s no need to send verification emails.

### Login Pages

#### Add action to onFormLoad

In your login page, add the following actions to your onFormLoad:

```
"onFormLoad": [{
            "action": "authLoginOauth"
        }, {
            "action": "setFocus",
            "options": {
                "elementId": "email"
            }
        }]
```

If the external provider or internal code returns an error, the error will return as a query parameter `errorMessage` , be added to default `model.authMessage` key, as well as a console log message.

{% hint style="info" %}
Note for early OAuth users: the OAuth action used to be `oauthLoginHook` , and as shown above, it changed to `authLoginOauth`. However, both actions will be supported at the moment.
{% endhint %}

#### Button or Link

Add a button or link that redirects to one the following paths

| Provider | Provider      |
| -------- | ------------- |
| Google   | /oauth/google |
| Auth0    | /oauth/auth0  |
| Okta     | /oauth/okta   |

For example, if we were to add  Google to our app:

```
//Button in Page Schema
{
  "actions": [{
       "action": "namedAction",
       "name": "loginGoogle"
  }],
  "buttonClasses": "btn btn-info",
  "styleClasses": "col-md-2",
  "text": "Sign in with Google",
  "type": "button"
}

//Named Action in Page Info
"loginGoogle": [{
            "action": "path",
            "options": {
                "sameWindow": true,
                "url": "/oauth/google"
            }
        }]
```

Redirects can be done by adding a redirect query param to the URL.

```
//This is just an example, multiple params can be passed as needed
//Named Action in Page Info
"loginGoogle": [{
            "action": "path",
            "options": {
                "sameWindow": true,
                "url": "/oauth/google?redirect=%2Fdashboard"
            }
        }]
```
