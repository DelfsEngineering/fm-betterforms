---
description: Dispatches LLM-requested frontend tools by mapping them to BetterForms named actions.
---

# llmToolCall

`llmToolCall` is a frontend AI/tooling action. It receives one or more tool calls requested by an LLM and maps them into BetterForms named actions.

## Expected Options

| Key | Type | Description |
| --- | --- | --- |
| `options.functions` | `array` | Array of tool/function calls requested by the LLM |
| `options.toolCallId` | `string` | Correlation ID used to tie the tool execution back to the originating LLM request |

## Behavior

- BetterForms validates that `functions` is an array and that `toolCallId` is present.
- Each requested function is mapped to a BetterForms named action using the function name.
- Function arguments are parsed from JSON when needed.
- BetterForms injects `toolCallId` into the named-action options.
- The runtime emits `processNamedAction` for each tool call.
- If dispatch fails, BetterForms sends an error payload to `llm/tool-response`.

## Important Pattern

This action is designed to work with `llmToolCallResponse`.

Typical flow:

1. `llmToolCall` receives the tool request.
2. A BetterForms named action runs UI logic.
3. That named action ends with `llmToolCallResponse` to send the result back.

## Related Pages

- [llmToolCallResponse](./llmtoolcallresponse.md)
- [BF Streaming API (LLM Query)](../../apis-and-services/bf-streaming-api-llm-query.md)
