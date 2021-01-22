# Get active channels

The API endpoint `/message/channels` will return all current active channels.

A channel is considered active if there is at least one client connected to it.

{% api-method method="post" host="https://yourdomain.com" path="/message/channels" %}
{% api-method-summary %}
API: Return active channels
{% endapi-method-summary %}

{% api-method-description %}

{% endapi-method-description %}

{% api-method-spec %}
{% api-method-request %}
{% api-method-headers %}
{% api-method-parameter name="content-type" type="string" required=true %}
application/json
{% endapi-method-parameter %}

{% api-method-parameter name="accept" type="string" required=true %}
application/json
{% endapi-method-parameter %}
{% endapi-method-headers %}

{% api-method-body-parameters %}
{% api-method-parameter name="apiKey" type="string" required=true %}
the API key for your BF app
{% endapi-method-parameter %}
{% endapi-method-body-parameters %}
{% endapi-method-request %}

{% api-method-response %}
{% api-method-response-example httpCode=201 %}
{% api-method-response-example-description %}
Returns an object with two keys **authenticated** and **anonymous**. Each will have an array of current active channels.
{% endapi-method-response-example-description %}

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
{% endapi-method-response-example %}
{% endapi-method-response %}
{% endapi-method-spec %}
{% endapi-method %}



