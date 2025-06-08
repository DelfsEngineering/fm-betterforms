# Creating a PWA

## Introduction

PWA (Progressive Web Applications) offer several advantages that make them a desirable choice for web apps:

1. **Cross-platform compatibility**: PWA can run on multiple platforms, including desktops, laptops, and mobile devices, without the need to develop separate native apps for each platform.
2. **Installation**: PWA can be installed directly from the browser, allowing users to access the app quickly from their home screen or app drawer without going through an app store.
3. **Offline support**: PWA can work offline or in poor network conditions by utilizing service workers and caching mechanisms. This ensures that users can still access and interact with the app even without an internet connection.
4. **Push notifications**: PWA can send push notifications to users, enabling real-time engagement and communication. This feature allows businesses to deliver important updates, promotions, or personalized messages to their users.
5. **Improved user experience**: PWA leverages web platform features to provide a seamless and engaging user experience. They can offer smooth animations, fast loading times, and a responsive design that adapts to different devices and screen sizes.
6. **Cost-effective development**: Developing a PWA can be more cost-effective compared to building separate native apps for different platforms. With a single codebase, developers can reach a broader audience and maintain the app more efficiently.

By choosing a PWA approach, businesses and developers can provide their users with a native-like experience, increase user engagement, and reach a wider audience across various devices and platforms.

The following sections will explain how to transform your BF App into a PWA.

## Getting Started

#### Requirements

* Running >V2.1.0 BF base code

### Making it installable

This will be the first feature added to your PWA. We will start by creating a manifest object and passing it as a parameter to a new BF function <mark style="color:red;">`pwaSetManifest`</mark>. In this example we added this code to a function in our <mark style="color:red;">`onAppLoad`</mark> named action.

```javascript
let manifest = {
  name: "My Awesome PWA",
  short_name: "My App",
  icons: [{
      src: "LINK_TO_YOUR_ICON",
      sizes: "196x196",
      type: "image/png",
      purpose: "any"
    },{
      src: "LINK_TO_YOUR_ICON",
      sizes: "196x196",
      type: "image/png",
      purpose: "maskable"
    }],
  start_url: "https://your.domain.com/index.html",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#4DBA87"
};
//background_color and theme_color can be customized

BF.pwaSetManifest(manifest);
```

Next, as part of the <mark style="color:red;">`onAppLoad`</mark> as well, we add a new action <mark style="color:red;">`pwaCustomInstall`</mark>

```json
{
    "action": "pwaCustomInstall",
    "options": {
        "beforeinstallprompt_actions": [{
            "action": "function",
            "function": "model.isInstalled = false;"
        }]
    }
}
```

This new action has the options <mark style="color:red;">`beforeinstallprompt`</mark>, which are actions that will run before the trapped prompt to install event triggered by the browser when it identifies the web app as installable. The example above shows one way of setting a state variable that we will use to show or hide a button to install the app.

So in this case, we need a key <mark style="color:red;">`isInstalled`</mark> in our model.

In our example, once the install button is clicked on, a modal will prompt asking whether the user wants to install it.

```json
{
    "actions": [{
        "action": "showModal",
        "options": {
            "body": "Do you want to get the most out of this app?",
            "buttons": [],
            "slots": [{
                "actions": [{
                    "action": "namedAction",
                    "name": "installApp"
                }, {
                    "action": "hideModal"
                }],
                "component": "button",
                "slot": "button",
                "styleClasses": "btn btn-danger",
                "text": "Install"
            }, {
                "actions": [{
                    "action": "hideModal"
                }],
                "component": "button",
                "slot": "button",
                "styleClasses": "btn btn-info",
                "text": "Not now"
            }]
        }
    }],
    "buttonClasses": "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
    "styleClasses": "col-md-2",
    "text": "Install App!",
    "type": "button",
    "visible_calc": "!model.isInstalled"
}
```

The named action <mark style="color:red;">`instalApp`</mark> above has the following code.

```json
{
    "action": "pwaPromptInstall",
    "options": {
        "onAccepted_actions": [{
            "action": "showAlert",
            "options": {
                "text": "Thanks for installing the app!",
                "title": "Welcome!",
                "type": "information"
            }
        }],
        "onDismissed_actions": [{
            "action": "showAlert",
            "options": {
                "text": "If I were you, I'd install the app!",
                "title": "Too bad!",
                "type": "information"
            }
        }]
    }
}
```

The action <mark style="color:red;">`pwaPromptInstall`</mark> is the action that triggers the browser to prompt the user with the actual window that will install the app. This gives the flexibility to trigger this event from anywhere in your app, and customize it according to your needs.

The options <mark style="color:red;">`onAccepted_actions`</mark> and <mark style="color:red;">`onDismissed_actions`</mark> will run after the user click on <mark style="color:red;">`Cancel`</mark>, <mark style="color:red;">`Install`</mark> or close the browser’s prompt window.

Our modal looks like the image below.

![Untitled](<../.gitbook/assets/Untitled (2).png>)

By clicking on <mark style="color:red;">`Install`</mark>, it will trigger the browser event that asks if the user wants to install the app, as shown on the image below.

![Screen Shot 2022-07-08 at 7.38.12 PM.png](<../.gitbook/assets/Screen_Shot_2022 07 08_at_7.38.12_PM.png>)

After installing it, the user will be able to access your web app as a regular native app.

#### Browser Support

(**As of September 2022**)

* Desktop and Laptop (reference: [https://web.dev/learn/pwa/progressive-web-apps/#desktop-and-laptops](https://web.dev/learn/pwa/progressive-web-apps/#desktop-and-laptops))

| OS          | Google Chrome | Microsoft Edge | Microsoft Store | Play Store |
| ----------- | ------------- | -------------- | --------------- | ---------- |
| Windows 7   |   ✔️ (73+)    |   ✔️           |   ❌             |   ❌        |
| Windows 8.x |   ✔️ (73+)    |   ✔️           |   ❌             |   ❌        |
| WIndows 10  |   ✔️ (73+)    |   ✔️( 79+)     |   ✔️            |   ❌        |
| Windows 11  |   ✔️ (73+)    |   ✔️ (79+)     |   ✔️            |   ❌        |
| Chrome OS   |   ✔️ (72+)    |   ❌            |   ❌             |   ✔️ (85+) |
| macOS       |   ✔️ (73+)    |   ✔️           |   ❌             |   ❌        |
| Linux       |   ✔️ (73+)    |   ✔️           |   ❌             |   ❌        |

{% hint style="info" %}
&#x20;Please note that PWA installation is not supported on Desktop Safari and Firefox.
{% endhint %}

* Mobile Devices (reference: [https://web.dev/learn/pwa/progressive-web-apps/#mobile-devices](https://web.dev/learn/pwa/progressive-web-apps/#mobile-devices))
  * **iOS and iPadOS**: Safari (since iOS 11.3), App Store (since iOS/iPadOS 14, with some limitations), Mobile Configuration for enterprise distribution;
  * **Android**: Firefox, Google Chrome, Samsung Internet, Microsoft Edge, Opera, Brave, Huawei Browser, Baidu, UCWeb, Play Store (from version 72 with Google Chrome installed, or browsers compatible with TWA), Galaxy Store, Managed Play iframe for enterprise distribution.

{% hint style="info" %}
iOS and iPadOS can only be installed if using Safari.
{% endhint %}

### Sending Push Notifications

With PWA support, you can send push notifications to users, allowing your web app to engage with them. To request push notification permissions from users, we have an action that triggers the browser's 'ask for permission' prompt. This can be used at relevant and convenient points throughout your web app.

The example below shows how we could trigger the permission prompt from a button on a page.

```json
{
    "actions": [{
        "action": "pwaPromptPushPermission",
        "options": {
            "idUser_calc": "window.vueapp.$store.state.auth.user.id"
        }
    }],
    "buttonClasses": "btn btn-info bg-blue-400",
    "styleClasses": "col-md-2",
    "text": "Prompt permission for push notifications",
    "type": "button"
}
```

In this example, we set the user ID (BetterForms ID) as a key to target this when sending a push notification. Clicking on the button will display the following prompt.

{% hint style="info" %}
`window.vueapp.$store.state.auth.user.id` refers to the **BetterForms User record ID**, _not_ your FileMaker business file PK. Using the BF ID ensures your subscription is associated with the correct user in the BF cloud database.
{% endhint %}

<figure><img src="../.gitbook/assets/Untitled 1 (1).png" alt=""><figcaption></figcaption></figure>

Once the user clicks on <mark style="color:red;">`Allow`</mark>, the subscription will be saved in the BF cloud database and you will be able to send a push notification to the user using either an action from the frontend or hitting our <mark style="color:red;">`/pushdata/sendnotification`</mark> endpoint, as shown below.

#### Sending a Push Notification from an action:

Use the <mark style="color:red;">`pwaPushNotificationSend`</mark> action step.

```json

// CD _ This is not most recents object shape
{
    "actions": [{
        "action": "pwaPushNotificationSend",
        "options": {
            "body": "Hello from BF push notification!",
            "data": {
                "dateOfArrival_calc": "Date.now()",
                "path": "/"
            },
            "filter": {
                "users": ["BF_USER_ID"]
            },
            "ttl": 300,
            "icon": "LINK_TO_YOUR_ICON",
            "title": "BF's New Feature!!!",
            "vibrate": [100, 50, 100]
        }
    }],
    "buttonClasses": "btn btn-info bg-blue-100",
    "styleClasses": "col-md-6",
    "text": "Send Push Notification",
    "type": "button"
}
```

{% hint style="info" %}
Again, place the **BetterForms User record ID** (from `pwaPromptPushPermission`), _not_ the business file PK, in this array. This ensures notifications reach the intended user.
{% endhint %}

#### Sending a Push Notification from the API endpoint:

Hitting <mark style="color:red;">`/pushdata/sendnotification`</mark> endpoint ( Eg calling from FileMaker Server)

* Create a <mark style="color:red;">`POST`</mark> request to the following endpoint: <mark style="color:red;">`https://your.domain.com/pushdata/sendnotification`</mark>
* Set the <mark style="color:red;">`body`</mark> of the request will be as follows:

```json
{
    "apiKey": "BFAPI_YOUR_KEY",
    "body": "Hello from BF push notification!",
    "data": {
        "dateOfArrival_calc": "Date.now()",
        "path": "/"
    },
    "icon": "LINK_TO_YOUR_ICON",
    "title": "BF's New Feature!!!",
    "vibrate": [100, 50, 100],
    "filter": {
        "users": ["BF_USER_ID"]
    },
    "ttl": 300
}
```

{% hint style="info" %}
The <mark style="color:red;">`filter`</mark> key is optional, only needed when push notifications should be sent only to specific users. General push notifications can be sent without the <mark style="color:red;">`filter`</mark> key. Another optional key is <mark style="color:red;">`ttl`</mark>, which defines how long a notification will stay alive if a user is offline (e.g.: ttl is set to 300 seconds, so if a user is offline, the notification will be delivered to the user if the user comes back online within 5 minutes). The default value set to ttl, if no value is passed, is 300 seconds.
{% endhint %}

#### Adding DOM Header Insertion to be available for offline use

* CSS files. The example below is loading tailwind version 2.

```javascript
<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
<script>
    function loadRemoteCSS(url) {
        $.get(url, function(cssContent) {
            $('<style>')
                .appendTo('head')
                .attr({
                    type: 'text/css'
                })
                .text(cssContent);
        });
    }
    $(document).ready(function() {
        loadRemoteCSS('https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css');
    });
</script>
```
