# Get active channels

The API endpoint `/message/channels` will return all current active channels.

A channel is considered active if there is at least one client connected to it.

{% swagger baseUrl="https://portal.yourdomain.com" path="/message/channels" method="post" summary="API: Return active channels" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="content-type" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="header" name="accept" type="string" %}
application/json
{% endswagger-parameter %}

{% swagger-parameter in="body" name="apiKey" type="string" %}
the API key for your BF app
{% endswagger-parameter %}

{% swagger-response status="201" description="Returns an object with two keys authenticated and anonymous. Each will have an array of current active channels." %}
```
{
    "authenticated": [
        "authenticated",
        "USER_ID_PRIVATE_CHANNEL",
        "channelOne",
        "channelTwo"
    ],
    "anonymous": [
        "anonymous",
        "testRoom1",
        "testRoom2"
    ]
}
```
{% endswagger-response %}
{% endswagger %}
