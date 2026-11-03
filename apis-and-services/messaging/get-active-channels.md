# Get active channels

The API endpoint `/message/channels` will return all current active channels.

A channel is considered active if there is at least one client connected to it.


### `POST /message/channels`

API: Return active channels

**Base URL:** `https://portal.yourdomain.com`

| In | Name | Type | Required | Description |
|---|---|---|---|---|
| header | `content-type` | string |  | application/json |
| header | `accept` | string |  | application/json |
| body | `apiKey` | string |  | the API key for your Klai app |

**Response 201:** Returns an object with two keys authenticated and anonymous. Each will have an array of current active channels.

```
{
    "authenticated": [
        "channelOne",
        "channelTwo"
    ],
    "anonymous": [
        "testRoom1",
        "testRoom2"
    ]
}
```



## Notes

- Results are scoped to the current domain host.
- The response groups active channel names under `authenticated` and `anonymous`.
