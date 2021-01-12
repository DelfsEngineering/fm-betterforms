# Get all users connected

Our API endpoint /message/users will return all users connected to all or specific active channels, which means channels that currently have at least one user listening to it.

### All channels

All users connected to all current active channels can be retrieved by sending a POST request to our API endpoint **/message/users**.

* Address: https://**YOUR.DOMAIN.com/message/users**;
* Set headers:
  * Accept = application/json
  * Content-type = application/json
* Body content:

```text
{
    "apiKey": "BFAPI_GENERATED-API-KEY"
}
```

### All users connected to specific channel

The same API endpoint can be used to retrieve what users are connected to a specific channel. This can be achieved by passing a channel in the object sent as body of the request.

```text
{
    "apiKey": "BFAPI_GENERATED-API-KEY",
    "channel": "channel1"
}
```

### Expected results from requests

The request to the enpoint /message/users should return an object with an arrays of connected authenticated users and the total of anonymous \(non-authenticated\) users, as shown in the example below.

```text
{
    "users": [
        {
            "id": "UER-ID",
            "email": "user@email.com",
            "channels": {
                "channels": [
                    {
                        "mode": "ignore",
                        "name": "channel1"
                    },
                    {
                        "name": "listen",
                        "mode": "channel2"
                    }
                ]
            }
        }
    ],
    "totalAnonymous": 1
}
```
