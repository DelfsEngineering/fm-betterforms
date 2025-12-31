# Get connected users

The API endpoint `/message/users` will return all users connected to all or specific active channels, which means channels that currently have at least one user listening to it.

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
if set, will only return users connected to this channel
{% endswagger-parameter %}
{% endswagger %}

## Totals across pods/data centers

To get total connected counts across all pods/data centers, use the `/message/allusers` endpoint (POST). It returns per-DC counts plus a global `_total` that sums authenticated and anonymous users:

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
