# BF Streaming API

{% hint style="info" %}
The BetterForms Streaming API allows real time streaming of responses from LLM services like OpenAI To be initiated.
{% endhint %}

#### **Overview**

Creating a call to this service will create a post to the LLM and stream results back to the appropriate channel. This service is in beta release as of the time of this document.

Avail in **bf-staging** only

```json
//create endpoint
portal.myapp.com**/stream/create**

Method: POST
```

| Key                                                   | Type   | Description                                                                                                   |
| ----------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| <mark style="color:red;">`apiKey`</mark>              | string | Unique API key for BF (find in app settings)                                                                  |
| <mark style="color:red;">`channels`</mark>            | array  | Array of BF Messaging communication channels                                                                  |
| <mark style="color:red;">`actionName`</mark>          | string | Name of the action to be performed                                                                            |
| <mark style="color:red;">`service`</mark>             | string | Name of the service to be used (OpenAI)                                                                       |
| <mark style="color:red;">`payload`</mark>             | object | Object containing parameters for the action, this contains params that are passed on to the streaming service |
| <mark style="color:red;">`payload.apiKey`</mark>      | string | Unique API key for the streaming service                                                                      |
| <mark style="color:red;">`payload.stream`</mark>      | bool   | Indicator if streaming is enabled, if disabled, result is returned directly to the POST result                |
| <mark style="color:red;">`payload.functions`</mark>   | array  | Array of functions to be executed                                                                             |
| <mark style="color:red;">`payload.max_tokens`</mark>  | number | Maximum number of tokens for the response                                                                     |
| <mark style="color:red;">`payload.seed`</mark>        | number | Seed for the random number generator                                                                          |
| <mark style="color:red;">`payload.messages`</mark>    | array  | Array of messages to be processed                                                                             |
| <mark style="color:red;">`payload.model`</mark>       | string | Model to be used for processing                                                                               |
| <mark style="color:red;">`payload.temperature`</mark> | number | Parameter controlling randomness in output                                                                    |

```json
{
  "apiKey": "BFAPI_xxxxxxxx-xxxxxx-xxxxxx,
  "channels": [
    "anonymous"
  ],
  "actionName": "assistantReceiveResultsStream",
  "service": "openAI",
  "payload": {
    "apiKey": "sk-xxxxxxx-xxxxxxxx-xxxxxxx",
    "stream": true,
    "functions": [],
    "max_tokens": 4000,
    "seed": 1,
    "messages": [
      {
        "content": "You are a Chuck Norris Joke teller.",
        "role": "system"
      },
      {
        "content": "create a joke about software developers",
        "role": "user"
      }
    ],
    "model": "gpt-4-turbo-preview",
    "temperature": 0
  }
}
```
