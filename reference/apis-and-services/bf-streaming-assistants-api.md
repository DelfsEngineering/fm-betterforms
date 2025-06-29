# BF Streaming API (Assistants)

{% hint style="info" %}
The BetterForms Streaming Assistants API allows for real-time, stateful conversations with AI assistants, powered by services like the OpenAI Assistants API.
{% endhint %}

#### **Overview**

This service provides a robust way to create and manage conversations with AI assistants. Unlike simple chat completions, assistants can maintain state, use tools, and manage long-running conversations across multiple interactions. This service is in beta release.

**Endpoint:** `portal.myapp.com/stream/create/assistants`

**Method:** `POST`

| Key | Type | Description |
| :--- | :--- | :--- |
| <mark style="color:red;">`apiKey`</mark> | string | Your unique API key for BetterForms (found in App Settings). |
| <mark style="color:red;">`channels`</mark> | array | An array of BetterForms Messaging channel IDs for receiving streamed responses. |
| <mark style="color:red;">`actionName`</mark> | string | The name of the client-side action to be triggered by streamed messages. |
| <mark style="color:red;">`payload`</mark> | object | An object containing the parameters to be passed to the AI assistant provider. |

#### **Payload Object**

The `payload` object contains all the necessary information for the assistant to process your request.

| Key | Type | Description |
| :--- | :--- | :--- |
| <mark style="color:red;">`provider`</mark> | string | The name of the AI provider. Defaults to `"openai"`. |
| <mark style="color:red;">`apiKey`</mark> | string | Your unique API key for the selected AI provider (e.g., your OpenAI API key). |
| <mark style="color:red;">`stream`</mark> | boolean | If `true`, responses are streamed back through the specified `channels`. If `false`, the initial response is returned after polling for completion. |
| <mark style="color:red;">`messages`</mark> | array | An array of message objects to initiate or continue the conversation. |
| <mark style="color:green;">`thread_id`</mark> | string | (Optional) The ID of an existing thread to continue the conversation. If omitted, a new thread is created. |
| <mark style="color:green;">`model`</mark> | string | (Optional) The model to be used by the assistant (e.g., `"gpt-4-turbo"`). |
| <mark style="color:green;">`instructions`</mark> | string | (Optional) System-level instructions for the assistant that guide its personality and behavior. |
| <mark style="color:green;">`tools`</mark> | array | (Optional) An array of tool definitions the assistant can use, following the OpenAI function-calling schema. |

{% hint style="warning" %}
**Tool Calls:** When an assistant decides to use a tool, it triggers a **Common Hook** in your FileMaker application, similar to the `llmQuery` service. You must have a corresponding script in FileMaker to handle the tool execution.
{% endhint %}

#### **Example Request**

```json
{
  "apiKey": "BFAPI_xxxxxxxx-xxxxxx-xxxxxx",
  "channels": [
    "user-conversation-channel-123"
  ],
  "actionName": "handleAssistantResponse",
  "payload": {
    "provider": "openai",
    "apiKey": "sk-xxxxxxx-xxxxxxxx-xxxxxxx",
    "stream": true,
    "model": "gpt-4-turbo",
    "instructions": "You are a helpful assistant that provides concise answers.",
    "thread_id": "thread_abc123", // Optional: to continue a conversation
    "messages": [
      {
        "role": "user",
        "content": "What's the weather like in San Francisco?"
      }
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "getCurrentWeather",
          "description": "Get the current weather in a given location",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "The city and state, e.g. San Francisco, CA"
              }
            },
            "required": ["location"]
          }
        }
      }
    ]
  }
}
``` 