---
description: Requests that an active BetterForms assistants stream stop gracefully.
---

# assistantStop

`assistantStop` requests that an active assistants run stop.

## Expected Options

| Key | Type | Description |
| --- | --- | --- |
| `options.threadId` | `string` | Assistant thread identifier |
| `options.runId` | `string` | Assistant run identifier |

## Example

```json
{
  "action": "assistantStop",
  "options": {
    "threadId": "thread_123",
    "runId": "run_456"
  }
}
```

## Behavior Notes

- Both `threadId` and `runId` are required for a real stop request.
- When both values are present, BetterForms calls `stream/create/assistants/stop`.
- Missing or already-finished runs are handled gracefully.

## Related Pages

- [llmQueryStop](./llmquerystop.md)
- [BF Streaming API (Assistants)](../../apis-and-services/bf-streaming-assistants-api.md)
