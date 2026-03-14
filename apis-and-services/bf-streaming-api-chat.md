# BF Streaming API (Chat)

{% hint style="info" %}
The BetterForms chat streaming endpoint is a lightweight streaming API for simple OpenAI and Gemini text generation.
{% endhint %}

## Overview

This endpoint still exists in the current BetterForms server and is registered at:

- `POST /stream/create`

It is a simpler streaming endpoint than `/llm/query`:

- supports `openai` and `gemini`
- streams basic `delta` and `end` events over BetterForms messaging
- does not expose the richer tool orchestration and cancellation contract documented for `/llm/query`

## Request Shape

| Key | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` | BetterForms API key |
| `channels` | `array` | BetterForms messaging channels used for streamed events |
| `actionName` | `string` | Named action that handles the streamed events |
| `payload` | `object` | Provider request payload |
| `payload.provider` | `string` | Provider name. Current implementation supports `openai` and `gemini`. Defaults to `openai` if omitted. |
| `payload.apiKey` | `string` | API key for the selected provider |
| `payload.stream` | `boolean` | If `true`, returns a streaming setup acknowledgment and emits events over messaging. If `false`, returns the result directly in the HTTP response. |
| `payload.messages` | `array` | Conversation messages |
| `payload.model` | `string` | Model name for the selected provider |
| `payload.generationConfig` | `object` | Optional Gemini-specific generation settings |

## Example

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
        "role": "system"
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

## Streaming Behavior

When `payload.stream` is `true`, the endpoint returns a setup acknowledgment such as:

```json
{
  "success": true,
  "message": "Streaming setup complete"
}
```

The generated content is then delivered over BetterForms messaging.

Current event types for this endpoint are intentionally simple:

- `delta`
- `end`

Example streamed event:

```json
{
  "type": "delta",
  "content": "A streamed chunk of text"
}
```

```json
{
  "type": "end"
}
```

## Non-Streaming Behavior

When `payload.stream` is `false`, BetterForms returns the result directly in the HTTP response.

- OpenAI returns the provider response object
- Gemini returns a normalized response with `choices[0].message.content`

## Provider Notes

### OpenAI

- Uses the older chat-completions streaming flow in the current implementation
- Sends streamed text chunks as `delta` events

### Gemini

- Uses Gemini streaming directly
- Expects the last message to be a `user` message
- Supports `payload.generationConfig`

## Related Pages

- [BF Streaming API (LLM Query)](./bf-streaming-api-llm-query.md)
- [BF Streaming API (Assistants)](./bf-streaming-assistants-api.md)
