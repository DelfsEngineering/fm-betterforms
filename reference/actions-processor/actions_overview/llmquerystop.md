---
description: Requests that an active BetterForms LLM query stream stop gracefully.
---

# llmQueryStop

`llmQueryStop` requests that an active `/llm/query` stream stop.

## Expected Options

| Key | Type | Description |
| --- | --- | --- |
| `options.streamId` | `string` | Stream identifier returned or tracked by the active LLM query flow |

## Example

```json
{
  "action": "llmQueryStop",
  "options": {
    "streamId": "stream_123"
  }
}
```

## Behavior Notes

- If `streamId` is missing, BetterForms logs a warning and exits gracefully.
- When `streamId` is present, BetterForms calls the `llm/query/stop` service.
- Failures are handled gracefully so the UI can request stop without needing to trap every stop-state edge case itself.

## Related Pages

- [assistantStop](./assistantstop.md)
- [BF Streaming API (LLM Query)](../../apis-and-services/bf-streaming-api-llm-query.md)
