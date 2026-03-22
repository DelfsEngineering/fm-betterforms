# Get connected users

The API endpoint `/message/users` returns the currently connected listeners for the current domain host.

A channel is considered active if there is at least one client connected to it.

{% swagger baseUrl="https://portal.yourdomain.com" path="/message/users" method="post" summary="API: Return connected users" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="accept" type="string" required="false" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="content-type" type="string" required="false" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" type="string" required="false" %}
the API key for your BF app
{% endswagger-parameter %}

{% swagger-parameter in="body" name="channel" type="string" required="false" %}
if set, BetterForms will look up that specific channel for the current host
{% endswagger-parameter %}
{% endswagger %}

## Response Shape

The response is an object keyed by channel name.

Common patterns:

- authenticated channels return arrays of `{ id, email }`
- anonymous channels return a connection count
- per-tab private channels use keys like `tab|connectionId`

Example:

```json
{
  "tab|abc123": {
    "id": "USER_ID",
    "email": "person@example.com"
  },
  "salesRoom": [
    {
      "id": "USER_1",
      "email": "a@example.com"
    },
    {
      "id": "USER_2",
      "email": "b@example.com"
    }
  ],
  "anonymousChat": 3
}
```

## Totals across pods/data centers

To get total connected counts across all pods/data centers for the current domain host, use the `/message/allusers` endpoint (POST). It authenticates with the app API key and returns per-DC counts plus a global `_total` that sums authenticated and anonymous users:

```json
{
  "apiKey": "BFAPI_..."
}
```

Default response:

```
{
  "us-east-1": { "authenticated": 12, "anonymous": 4 },
  "eu-west-1": { "authenticated": 7, "anonymous": 2 },
  "_total": { "authenticated": 19, "anonymous": 6 }
}
```

Notes:
- Keys are grouped by data center (DC) as reported by the server.
- `_total` is always present and aggregates all DCs/pods.
- Counts are scoped to the incoming host domain across all matching pods/clusters for that domain.

### Detailed admin mode

To return authenticated user details by DC, send `includeUsers: true`:

```json
{
  "apiKey": "BFAPI_...",
  "includeUsers": true
}
```

Response:

```json
{
  "us-east-1": {
    "authenticated": [
      { "id": "USER_1", "email": "a@example.com" },
      { "id": "USER_2", "email": "b@example.com" }
    ],
    "authenticatedCount": 2,
    "anonymous": 4
  },
  "_total": { "authenticated": 2, "anonymous": 4 }
}
```

By default, detailed mode de-duplicates authenticated users by `id` within each DC.

To preserve raw pod-level duplicates in the authenticated array, send `dedupeUsers: false`:

```json
{
  "apiKey": "BFAPI_...",
  "includeUsers": true,
  "dedupeUsers": false
}
```

With `dedupeUsers: false`, `authenticatedCount` reflects raw authenticated entries rather than unique users.
