# BF Streaming API (Assistants)

{% hint style="info" %}
The BetterForms assistants endpoint provides stateful assistant-style conversations with streamed updates.
{% endhint %}

## Overview

The current server registers this endpoint at:

- `POST /stream/create/assistants`

In the current implementation, the registered assistants provider is:

- `openai`

This endpoint supports:

- creating a new assistant thread
- reusing an existing thread with `thread_id`
- streaming assistant deltas over BetterForms messaging
- non-streaming polling mode
- stopping an active run with `/stream/create/assistants/stop`

## Request Shape

| Key | Type | Description |
| :--- | :--- | :--- |
| `apiKey` | string | BetterForms API key for the endpoint request |
| `channels` | array | BetterForms messaging channels for streamed responses |
| `actionName` | string | Named action that handles streamed messages |
| `payload` | object | Assistant provider payload |

## Payload Object

The `payload` object contains all the necessary information for the assistant to process your request.

| Key | Type | Description |
| :--- | :--- | :--- |
| `provider` | string | Provider name. Current implementation defaults to and currently supports `openai`. |
| `apiKey` | string | Provider API key, for example your OpenAI API key |
| `stream` | boolean | If `true`, BetterForms streams events through messaging. If `false`, BetterForms polls until the run finishes and returns the final response. |
| `messages` | array | Messages to create or continue the assistant conversation |
| `thread_id` | string | Optional existing thread ID to continue |
| `model` | string | Optional model override |
| `instructions` | string | Optional assistant instructions |
| `tools` | array | Optional tool definitions |

{% hint style="warning" %}
Tool calls are handled by the BetterForms assistants backend flow. In current builds, that backend work is routed through the assistants tool execution path rather than being documented as a generic Common Hook contract.
{% endhint %}

## Example Request

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

## Streaming Response

When `payload.stream` is `true`, the endpoint returns as soon as the run is created.

Typical result:

```json
{
  "success": true,
  "threadId": "thread_abc123",
  "runId": "run_abc123",
  "status": "created"
}
```

During streaming, BetterForms emits events to your configured channel and `actionName`.

Important event types include:

- `threadInfo`
- `delta`
- `function_call`
- `end`
- `error`

Example `threadInfo` payload:

```json
{
  "type": "threadInfo",
  "content": {
    "assistantThreadId": "thread_abc123",
    "runId": "run_abc123"
  }
}
```

This is the event your frontend can use to store the active assistant thread and run identifiers for later continuation or cancellation.

## Non-Streaming Response

When `payload.stream` is `false`, BetterForms creates or continues the run, polls until completion, and returns the final assistant content directly in the HTTP response.

Typical shape:

```json
{
  "success": true,
  "data": [
    {
      "type": "text",
      "text": {
        "value": "Final assistant response"
      }
    }
  ],
  "threadId": "thread_abc123",
  "runId": "run_abc123",
  "status": "done"
}
```

## Stop Endpoint

Active assistant runs can be stopped with:

- `POST /stream/create/assistants/stop`

Required request fields:

```json
{
  "threadId": "thread_abc123",
  "runId": "run_abc123"
}
```

Behavior notes:

- both `threadId` and `runId` are required
- already completed or already cancelled runs are handled gracefully
- browser-side BetterForms workflows typically call this through the `assistantStop` action

## Notes

- Use `thread_id` in the request payload to continue an existing assistant thread.
- Streaming requests emit `threadInfo` messages that contain `assistantThreadId` and `runId`.
- If you want the more general multi-provider/tooling contract, see [BF Streaming API (LLM Query)](./bf-streaming-api-llm-query.md).

## Related Pages

- [assistantStop](../reference/actions-processor/actions_overview/assistantstop.md)
- [BF Streaming API (LLM Query)](./bf-streaming-api-llm-query.md)