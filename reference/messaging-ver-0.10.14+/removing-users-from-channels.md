# Removing users from channels

The same way as adding users, there are two methods to remove users from channels, via our API endpoint or a FileMaker API script.

## FileMaker API script

The script is available in Helper file and is called **API - Leave Channel**. This script accepts an object with two keys **`users`** and **`channels`**.

* `users`: it accepts a string with an **user ID** or an **array of users ID**
* `channels`: it accepts an object with **name** and **mode \(optional\)** or an **array of objects**, with the same shape.

### Examples

* Users as string and channels as one object

```text
{
    "users": "USER_ID",
    "channels":
    {
        "name": "channel1",
        "mode": "ignore"
    }
}
```

* Users and channels as arrays

```text
{
    "users":
    [
        "USER_ID_1",
        "USER_ID_2"
    ],
    "channels":
    [
        {
            "name": "channel1",
            "mode": "ignore"
        },
        {
            "name": "channel2",
            "mode": "ignore"
        }
    ]
}
```

## API endpoint /message/removeuser

Users can be removed from channels via BetterForms Network API endpoint with an authenticated request. The API key needs to be sent in the body of the **`POST`**request with an array of users, as shown in the example below.

* URL: https://**YOUR.DOMAIN.com/message/removeuser**;
* Set headers:
  * Accept = application/json
  * Content-type = application/json
* Body content:

```text
{
    "users": [
        {
            "id": "USER-ID-FROM-USERS-TABLE",
            "channels": [
                {
                    "name": "channel1"
                },
                {
                    "name": "listen"
                }
            ]
        },
        {
            "id": "USER-ID-FROM-USERS-TABLE",
            "channels": [
                {
                    "name": "channel2"
                }
            ]
        }
    ],
    "apiKey": "BFAPI_GENERATED-API-KEY"
}
```

