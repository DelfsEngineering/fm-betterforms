---
description: >-
  Messaging is intended to be used for real-time features, such as
  notifications, chat or auto updates. Messaging also allows data to be pushed
  from FileMaker into your BetterForms apps.
---

# Messaging

Messaging is the BetterForms implementation of the [WebSocket](https://en.wikipedia.org/wiki/WebSocket) protocol, which enables a persistent connection between the client and the server.

{% hint style="info" %}
Requires version 0.10.14 or later
{% endhint %}

## Concepts

In order to send **messages** from your FileMaker server to users actively viewing your BetterForms app, users need to join **channels**. Channels can be divided in two different scopes:

* **anonymous** channels
  * available for anyone to join, login not requied
* **authenticated** channels
  * the user must be logged in to join the channel

{% hint style="info" %}
**TIP:** All messaging is scoped to the domain of the application. If your app has multiple domains, you will not be able to send messages directly across domains. 

\( This can be handled from within FileMaker \)
{% endhint %}

Each new tab that a user opens will join its own private channel that will be namespaced as **tab\|connectionID**.

For authenticated channels, users are automatically set to listen to their added channels once they log in. On the other hand, anonymous channels will not be persistent and users will not be automatically reconnected to this type of channel if they refresh the page or open a new tab.

All messages sent to a channel are broadcasted to all users currently listening to that channel. Therefore, it is important to architect well the scope of each channel to optimize and control what and how much data each channel/user will receive.

