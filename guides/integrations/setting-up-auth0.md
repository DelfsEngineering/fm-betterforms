# Setting up Auth0

## Introduction

Auth0 is an authentication and authorization platform that can be integrated with BetterForms to handle sign ups and logins to apps. Here we’ll explain what is needed to be set up on Auth0 to have it ready to be integrated with your app.

## Getting started

### Creating a tenant

If you already have a tenant to be used, you can skip to the next section.

After signing in to your Auth0 account, on the top left corner click on the dropdown button and select <mark style="color:red;">`Create tenant`</mark>

![Untitled](<../.gitbook/assets/Untitled (5).png>)

Choose a domain, region and environment for this tenant.

<figure><img src="../.gitbook/assets/Untitled 1 (3).png" alt=""><figcaption></figcaption></figure>

### Creating Application

On the left bar, mouse over it and click the <mark style="color:red;">`Applications`</mark> option, then click on <mark style="color:red;">`+ Create Application`</mark>

<figure><img src="../.gitbook/assets/Untitled 2 (2).png" alt=""><figcaption></figcaption></figure>

Choose a name to identify your app, select <mark style="color:red;">`Regular Web Applications`</mark> and click on <mark style="color:red;">`Create`</mark>.

<figure><img src="../.gitbook/assets/Untitled 3 (1).png" alt=""><figcaption></figcaption></figure>

Once it’s created, it should redirect to your app’s <mark style="color:red;">`Quick Start`</mark> tab. Go to the <mark style="color:red;">`Settings`</mark> tab of your application and fill the [following fields](setting-up-auth0.md#allowed-callback-urls) under <mark style="color:red;">`Application URIs`</mark>.

### Additional customizations

Still under the <mark style="color:red;">`Settings`</mark> tab, you can add a logo that will be used on the default pages used by Auth0 (Login, Reset Password, etc.).

A link from an asset uploaded to BF could be used here.

<figure><img src="../.gitbook/assets/Untitled 4 (1).png" alt=""><figcaption></figcaption></figure>

The following image shows other options that could be customized according to your policies.

<figure><img src="../.gitbook/assets/Untitled 5 (1).png" alt=""><figcaption></figcaption></figure>

**Add your Dev and Production Domains**

<figure><img src="../.gitbook/assets/Untitled 6 (1).png" alt=""><figcaption></figcaption></figure>

#### Allowed Callback URLs

This URL will be used by Auth0 to redirect the user back to your BF app, and the value should be as follows:

```jsx
https://yourapp.domain.com/oauth/auth0/callback
```

If multiple domains are being used, multiple domains can be added using comma as the separator.

```jsx
https://yourapp1.domain.com/oauth/auth0/callback, https://yourapp2.domain.com/oauth/auth0/callback
```

## Creating a Database

This is where your user records will be saved to.

From the left bar choose <mark style="color:red;">`Authentication`</mark> → <mark style="color:red;">`Database`</mark>. On the page, select <mark style="color:red;">`+ Create DB Connection`</mark>.

<figure><img src="../.gitbook/assets/Untitled 7.png" alt=""><figcaption></figcaption></figure>

Choose a name to identify your database and a few initial setups, as needed.

<figure><img src="../.gitbook/assets/Untitled 8.png" alt=""><figcaption></figcaption></figure>

If users are required to follow a specific password policy, that can be set under the tab <mark style="color:red;">`Password Policy`</mark> of your database.

<figure><img src="../.gitbook/assets/Untitled 9.png" alt=""><figcaption></figcaption></figure>

Under <mark style="color:red;">`Applications`</mark> you can verify which applications are connected to that database.

<figure><img src="../.gitbook/assets/Untitled 10.png" alt=""><figcaption></figcaption></figure>

### Choosing different login options

#### Social Connections

Different external providers like Google, Facebook and Github, can be added as login options for your app. These options can be found under <mark style="color:red;">`Authentication`</mark> → <mark style="color:red;">`Social`</mark>. And new options can be added by clicking on <mark style="color:red;">`+ Create Connection`</mark>.

<figure><img src="../.gitbook/assets/Untitled 11.png" alt=""><figcaption></figcaption></figure>

In order to setup these external providers, make sure you have the necessary credentials for this. It will be usually a Client ID and Client Secret, or API and Secret keys.

#### Username and password (Auth0)

As already mentioned above, you can link apps to users database under <mark style="color:red;">`Authentication`</mark> → <mark style="color:red;">`Database`</mark>. Another option is to navigate to your application (on Auth0), and under the <mark style="color:red;">`Connections`</mark> tab you will be able to individually toggle the options you want to have enabled for that specific application. By selecting a database connection, it will allow users registered on that database to login to your application using the username and password created under Auth0.

<figure><img src="../.gitbook/assets/Untitled 12.png" alt=""><figcaption></figcaption></figure>

#### Creating new BF Users

In case the application will allow users to register using OAuth, an <mark style="color:red;">`onBeforeRegistration`</mark>hook needs to be added to your business file, and it’s documented [here](https://docs.fmbetterforms.com/reference/users-and-authentication/oauth#before-registration-hook-business-file).

#### Using Auth0 in an iFrame

You will need to change:

Settings / Branding / Set to Classic

Mitigations - Disable Clickjacking protection

#### Configuring FM BetterForms

<figure><img src="../.gitbook/assets/Untitled 13.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Be sure to only include the subdomain in the <mark style="color:red;">`Subdomain`</mark> field
{% endhint %}

#### **Additional Notes**

**Logging out of Auth0**

Sometimes you may need to force an Auth0 logout. An example is if a user uses the wrong social account to login to your app but that account is not registered.

```json
 "logout": [{
        "action": "authLogout"
    }, {
        "action": "path",
        "function": "action.options.url = `https://visionarybar.us.auth0.com/v2/logout?client_id=xxxxxxxxxxxxxxx&returnTo=https://${window.location.host}`",
        "options": {
            "sameWindow": true,
            "url": "/"
        }
    }]
```

The <mark style="color:red;">`client_id`</mark> comes from the Auth0 dashboard page.
