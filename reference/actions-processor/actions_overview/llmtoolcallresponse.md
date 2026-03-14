---
description: Sends the result of a frontend tool workflow back to the BetterForms LLM tool-response service.
---

# llmToolCallResponse

`llmToolCallResponse` sends the result of a frontend tool workflow back to BetterForms so the LLM flow can continue.

## Expected Options

| Key | Type | Description |
| --- | --- | --- |
| `options.toolCallId` | `string` | Required correlation ID for the tool call being completed |
| `options.*` | `any` | Any additional response data you want returned to the tool-response service |

## Example

```json
{
  "action": "llmToolCallResponse",
  "options": {
    "toolCallId": "tool_123",
    "success": true,
    "message": "UI action completed"
  }
}
```

## Behavior Notes

- `toolCallId` is required.
- BetterForms sends the response to `llm/tool-response`.
- Additional option keys are included in the returned result object.
- If the response action itself fails, BetterForms attempts to send a failure payload for the same `toolCallId`.

## Related Pages

- [llmToolCall](./llmtoolcall.md)
- [BF Streaming API (LLM Query)](../../../apis-and-services/bf-streaming-api-llm-query.md)
