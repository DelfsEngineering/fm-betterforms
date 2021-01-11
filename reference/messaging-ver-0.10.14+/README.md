# Messaging \(Ver 0.10.14+\)

Messaging is inteded to be used for real-time features, such as notifications, chat or auto updates.

## Concepts

When using messaging, users need to join channels, and these channels will be used to send and receive messages. Channels can be divided in two different scopes:

* Authenticated: users need to be logged in and subscribed to channels;
* Anonymous: non-authenticated users are able to send and receive messages.

For authenticated channels, users are automatically set to listen to their added channels once they log in. On the other hand, anonymous channels will not be persistent and users will not be automatically reconnected to this type of channel if they refresh the page or open a new tab.

All messages sent to a channel are broadcasted to all users currently listening to that channel. Therefore, it is important to architect well the scope of each channel to optimize and control what and how much data each channel/user will receive.

