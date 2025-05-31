# BF Streaming API

{% hint style="info" %}
The BetterForms Streaming API allows real time streaming of responses from LLM services like OpenAI and Google Gemini to be initiated.
{% endhint %}

#### **Overview**

Creating a call to this service will create a post to the LLM and stream results back to the appropriate channel. This service is in beta release as of the time of this document.

Avail in **bf-staging** only

//create endpoint
portal.myapp.com/**/stream/create**

Method: `POST`

| Key                                                   | Type   | Description                                                                                                   |
| ----------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| <mark style="color:red;">`apiKey`</mark>              | string | Unique API key for BF (find in app settings)                                                                  |
| <mark style="color:red;">`channels`</mark>            | array  | Array of BF Messaging communication channels                                                                  |
| <mark style="color:red;">`actionName`</mark>          | string | Name of the action to be performed                                                                            |
| <mark style="color:red;">`payload`</mark>             | object | Object containing parameters for the action, this contains params that are passed on to the streaming service |
| <mark style="color:red;">`payload.provider`</mark>    | string | Name of the AI provider to be used (e.g., "openai", "gemini"). Defaults to "openai" if not specified.      |
| <mark style="color:red;">`payload.apiKey`</mark>      | string | Unique API key for the selected AI provider                                                                   |
| <mark style="color:red;">`payload.stream`</mark>      | bool   | Indicator if streaming is enabled. If false, result is returned directly in the POST response.                |
| <mark style="color:red;">`payload.messages`</mark>    | array  | Array of messages to be processed. Structure may vary slightly based on the provider.                       |
| <mark style="color:red;">`payload.model`</mark>       | string | Model to be used for processing (e.g., "gpt-4-turbo-preview" for OpenAI, "gemini-pro" for Gemini)          |
| <mark style="color:green;">`payload.generationConfig`</mark> | object | (Optional - Gemini specific) Object containing generation parameters for the Gemini provider.              |

{% hint style="warning" %}
**Note on OpenAI Parameters:** Parameters like `functions`, `max_tokens`, `seed`, and `temperature` previously documented for OpenAI are not explicitly passed to the OpenAI SDK in the current service implementation. They might be subject to the OpenAI SDK's default behaviors or could be added in future updates.
{% endhint %}

```json
{
  "apiKey": "BFAPI_xxxxxxxx-xxxxxx-xxxxxx",
  "channels": [
    "anonymous"
  ],
  "actionName": "assistantReceiveResultsStream",
  "payload": {
    "provider": "openai", // or "gemini"
    "apiKey": "sk-xxxxxxx-xxxxxxxx-xxxxxxx", // Your OpenAI or Gemini API Key
    "stream": true,
    "messages": [
      {
        "content": "You are a helpful assistant.",
        "role": "system" // For Gemini, 'system' role might need to be adapted or handled as part of 'history'
      },
      {
        "content": "Tell me a fun fact about space.",
        "role": "user"
      }
    ],
    "model": "gpt-4-turbo-preview", // or a Gemini model like "gemini-pro"
    // "generationConfig": { // Example for Gemini
    //   "temperature": 0.7,
    //   "maxOutputTokens": 2048
    // }
  }
}
```
