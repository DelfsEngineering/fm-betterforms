# BF Streaming API (LLM Query)

## Introduction

{% hint style='warning' %}
**Beta Service:** The `llmQuery` service is currently in beta. Its functionality and API contract are subject to change in future updates. Please test thoroughly and be prepared for potential adjustments.
{% endhint %}

The `llmQuery` service provides a unified interface to interact with various Large Language Model (LLM) providers like OpenAI, Google Gemini, and Anthropic Claude. It handles request formatting, and response handling, including support for streaming responses.

This service acts as a proxy, allowing you to leverage different LLMs without needing to implement specific API integrations for each one within FileMaker.

## Authentication

Access to the `/llm/query` service is controlled by an API key that must be included in your request.

*   **API Key Location:** You can find your API key in the **App Settings** section of the FM BetterForms editor for your application.
*   **Sending the API Key:** The API key must be provided in the JSON body of your `POST` request to the `/llm/query` endpoint, within a top-level field named `apiKey`.

**Example Snippet of Request Body:**

```json
{
  "apiKey": "YOUR_APP_SPECIFIC_API_KEY_FROM_SETTINGS",
  "channels": ["your_target_channel_id"],
  "actionName": "your_stream_handler_named_action",
  "payload": {
    // ... rest of your payload
  }
}
```


## Endpoint Details

*   **URL:** `/llm/query` (relative to your BetterForms API base URL)
*   **Method:** `POST`
*   **Service Type:** FeathersJS Service (`create` method)

## Request Format

The request body must be a JSON object. It includes BetterForms service-authentication fields plus a `payload` object containing the LLM request.

```json
{
  "apiKey": "YOUR_APP_SPECIFIC_API_KEY_FROM_SETTINGS",
  "channels": ["your_target_channel_id"], 
  "actionName": "your_stream_handler_named_action",
  "payload": {
    // LLM Provider specific payload - see below
  }
}
```

### Main Body Parameters:

*   `apiKey` (String, **Required**): Your application-specific API key obtained from the App Settings in the FM BetterForms editor. This key authenticates your request to the `llmQuery` service.
*   `channels` (Array of Strings, **Required for streaming**): At least one BetterForms messaging channel ID. Streaming requests are rejected if this array is missing or empty.
*   `actionName` (String, **Required for streaming**): The BetterForms named action that will receive streamed events and frontend tool calls. There is **no automatic default** for streaming requests.
*   `payload` (Object, **Required**): An object containing the parameters to be sent to the chosen LLM provider. See "Payload Object" section below.

### Payload Object

This object contains the core instructions for the LLM interaction.

#### Common Payload Fields:

These fields are generally required or common across all supported providers:

*   `provider` (String, Optional): Specifies which LLM provider to use. Supported values include `"openai"`, `"gemini"`, and `"anthropic"`. If omitted, BetterForms currently defaults to `"openai"`.
*   `apiKey` (String, **Required**): **Your API key for the selected LLM provider** (e.g., your OpenAI API key, Google AI Studio API key for Gemini, or Anthropic API key). This key is passed securely to the respective LLM service.
*   `stream` (Boolean, **Required**):
    *   `false`: The API call will wait for the LLM to complete its response. The full result from the LLM (or an error) will be returned directly in the HTTP response to the `/llm/query` call.
    *   `true`: BetterForms validates the request, creates a stream, and returns an immediate setup acknowledgment. The actual stream events are delivered asynchronously over BetterForms messaging.
*   `model` (String, **Required**): The specific model identifier for the chosen provider (e.g., `"gpt-4o"`, `"gemini-1.5-pro-latest"`, `"claude-3-opus-20240229"`). **Refer to the official documentation of the respective LLM provider for a current list of available models and their capabilities.**
*   `messages` (Array, **Required**): An array of conversation messages. BetterForms normalizes and translates these for the active provider.
*   `providerArgs` (Object, Optional): Provider-specific overrides such as generation settings and advanced parameters. BetterForms normalizes some friendly aliases before dispatching to the provider.
*   `tools` (Array, Optional): An array defining functions or tools the model can call. The structure should follow a common format (typically OpenAI's format, as providers like Gemini have internal translators). See provider-specific sections and the "Tool Use / Function Calling" section for more details.
*   `toolChoice` / `tool_choice` (String | Object, Optional): Controls how the model uses tools (e.g., `"auto"`, `"none"`, `"required"`, or an object to force a specific function). BetterForms normalizes common variants before dispatching.

## Streaming vs Non-Streaming

### `stream: true`

- `channels` is required
- `actionName` is required
- frontend tools with `ui_` names are supported
- the HTTP response is only a setup acknowledgment, not the completed LLM output

### `stream: false`

- `channels` and `actionName` are optional
- the completed result is returned in the HTTP response
- frontend tools with `ui_` names are **not** supported

If you send frontend tools in non-streaming mode, BetterForms rejects the request.

---

## Supported Providers & Specifics

### 1. OpenAI (`provider: "openai"`)

*   **Messages Format:**
    *   BetterForms accepts the normal BetterForms / OpenAI-style message array and adapts it for the current OpenAI provider implementation.
    *   `system` messages are supported.
    *   `tool` role messages are supported when the conversation includes tool results.
*   **Image Handling (Vision):**
    *   Include image URLs within the `content` array of a `user` message.
    *   Format: `{ "type": "image_url", "image_url": { "url": "YOUR_IMAGE_URL_OR_BASE64_DATA_URI" } }`
    *   Supports `http/https` URLs and Base64 data URIs (`data:image/jpeg;base64,...`). The backend service handles fetching URLs if necessary.
*   **Tool Use:**
    *   `tools` (Array, Optional): Define available functions the model can call. See OpenAI documentation for the format.
    *   `tool_choice` (String | Object, Optional): Control how the model uses tools (e.g., `"auto"`, `"none"`, `{"type": "function", "function": {"name": "my_func"}}`).
*   **RAG/Files:** OpenAI's Assistants API File Search (Retrieval) feature is **not** directly used by this standard chat completion endpoint. For RAG, implement retrieval logic externally and include the retrieved context within the `messages` array.

### 2. Google Gemini (`provider: "gemini"`)

*   **Messages Format:**
    *   BetterForms translates the incoming message array into the Gemini-specific format.
    *   You do not need to manually send provider-native `parts` arrays for normal BetterForms usage.
*   **Image Handling (Vision):**
    *   Pass Base64 encoded image data within the `parts` array.
    *   Format: `{ "inlineData": { "mimeType": "image/jpeg", "data": "YOUR_BASE64_ENCODED_STRING" } }`
    *   Sending URLs requires the backend service (`llmQuery`) to fetch, encode, and format the image correctly before sending to Gemini.
*   **Tool Use:** Supported via `tools` parameter (similar format to OpenAI). See Gemini documentation.

### 3. Anthropic Claude (`provider: "anthropic"`)

*   **Messages Format:**
    *   BetterForms translates the incoming message array for Anthropic.
    *   `system` content is extracted from your message history and sent using Anthropic's system prompt handling.
*   **Image Handling (Vision):**
    *   Requires Base64 encoded image data directly within the `content` array. **URLs are not directly supported by the Anthropic API.**
    *   Format: `{ "type": "image", "source": { "type": "base64", "media_type": "image/jpeg", "data": "YOUR_BASE64_ENCODED_STRING" } }`
    *   If sending a URL, the backend service (`llmQuery`) *must* fetch, encode, and format it before sending to Anthropic.
    *   **Important:** Base64 image data must be resent in the `messages` history on subsequent turns if the model needs to refer back to the image. This increases token usage significantly.
*   **Tool Use:** Supported via `tools` parameter. See Anthropic documentation.

---

## Tool Use / Function Calling

Many modern LLMs can call external functions or tools to retrieve information or perform actions. The `llmQuery` service facilitates this capability.

**1. Defining Tools in Your Request:**

To enable tool use, you include a `tools` array and optionally a `tool_choice` parameter within the `payload` object of your `/llm/query` request.

*   `payload.tools` (Array, Optional): An array describing the functions the LLM can request to call. **It is highly recommended to structure your tool definitions according to the OpenAI functions schema.** This includes providing the function name, a description, and its input parameters (as a JSON schema). The `llmQuery` service providers (for models like Gemini or Anthropic) are designed to translate this common OpenAI-based format into the specific format required by the respective LLM. Adhering to the OpenAI standard for tool definition ensures the best compatibility and predictability when switching between different LLM providers via this service.
*   `payload.tool_choice` (String | Object, Optional): Controls how the model uses tools (e.g., `"auto"`, `"none"`, or an object to force a specific function). This also generally follows OpenAI conventions, and providers will attempt to translate it to their native equivalents.

The `llmQuery` service, via its provider implementations, will pass these tool definitions (after any necessary translation) to the LLM.

**2. Interaction Flow when an LLM Calls a Tool:**

If the LLM decides to use one of the tools you've defined:

*   **LLM Request:** The LLM indicates that it wants to call a tool and supplies the tool name and arguments.
*   **Service Handling:** BetterForms routes the call through its shared tool dispatcher.
    *   **Frontend tools (`ui_*`)** are dispatched into BetterForms named actions in the browser and must reply with `llmToolCallResponse`.
    *   **Backend tools** are routed through BetterForms backend tooling, which can include FileMaker-side script handling or other backend services depending on the tool.
*   **Result to LLM:** BetterForms captures the tool output and feeds it back into the provider so the LLM can continue.
*   **Continued Conversation:** The LLM processes the tool's output and continues the conversation, potentially generating further text, calling another tool, or finishing its response.

**3. Final LLM Response:**

The final text generated by the LLM *after* any tool use cycles are complete is what forms the basis of the response you receive from the `/llm/query` call (for non-streaming) or the `delta` and `end` messages (for streaming), as described in the "Response Format" section.

You, as the user of the `/llm/query` API, do not directly handle the low-level tool request/response loop with the LLM. You define the tools, and BetterForms orchestrates the execution flow and the follow-up interaction with the model.

**Key Takeaway for Developers:** Backend tool names must map to backend logic you have implemented, and frontend `ui_*` tool names must map to BetterForms named actions that finish with `llmToolCallResponse`.

### Frontend Tools (UI Tools)

{% hint style='info' %}
**Version Requirement:** BetterForms v3.1.8+
{% endhint %}

Frontend Tools trigger UI actions directly in the browser without FileMaker Common Hook calls.

| Component | Requirement |
|-----------|-------------|
| **LLM Tool Name** | Must use `ui_` prefix |
| **namedAction Name** | Remove `ui_` prefix from tool name |
| **Response Action** | Must end with `llmToolCallResponse` |

#### Implementation Example

| Step | LLM Tool Definition | BetterForms namedAction |
|------|-------------------|-------------------------|
| **1. Name** | `ui_tool_hello_world` | `tool_hello_world` |
| **2. Code** | Standard OpenAI function format | BetterForms action array |

**LLM Tool:**
```json
{
  "name": "ui_tool_hello_world",
  "description": "Show greeting message"
}
```

**namedAction:**
```json
{
  "tool_hello_world": [
    { "action": "showAlert", "options": { "message": "Hello from LLM!" }},
    { "action": "llmToolCallResponse", "options": { "success": true, "message": "Displayed!" }}
  ]
}
```

**Main Handler:**
```json
{
  "onLlmMessage": [
    {
      "action": "function",
      "options": {
        "function": "if (data.action === 'llmToolCall') { window.BF.processNamedAction(data.toolName, data); }"
      }
    }
  ]
}
```

#### `llmToolCallResponse` Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `success` | Boolean | ✅ | `true` for success, `false` for errors |
| `message` | String | ✅ | Result description sent back to LLM |
| `data` | Object | ❌ | Optional additional data |

#### Frontend Tool Timeouts

Frontend tools have a **90-second timeout** from when the tool is invoked until the response must be received. If your `namedAction` does not call `llmToolCallResponse` within this time window:

- The backend will automatically reject the tool call with a timeout error
- The LLM will receive an error message indicating the tool failed to respond
- The timeout ensures that LLM requests don't hang indefinitely due to frontend issues

**Best Practices:**
- Keep frontend tool operations quick (< 10 seconds when possible)
- For long-running operations, return an immediate acknowledgment and update the UI asynchronously
- Always call `llmToolCallResponse` even if an error occurs in your tool logic

---

## Response Format

The `/llm/query` service returns a JSON response directly to the HTTP caller. The structure of this response and the way data is delivered depend on the `payload.stream` parameter.

### Non-Streaming Response (`payload.stream: false`)

When `payload.stream` is `false`, the `/llm/query` service waits for the LLM provider to fully process the request (including any internal tool/function calls) and returns a single JSON object in the HTTP response. This object contains the complete result from the LLM.

**Example: Successful Response**

```json
{
  "success": true,
  "actionName": "YourOptionalActionName", // Reflects actionName from request if provided
  "data": {
    // Provider-specific response data. Structure may vary slightly.
    // Typically includes:
    "choices": [
      {
        "message": {
          "role": "assistant", // Or 'model' for Gemini, 'assistant' for Anthropic
          "content": "This is the complete LLM response text."
          // For OpenAI, if tool calls were made and are the final step:
          // "tool_calls": [ { "id": "...", "type": "function", "function": { "name": "...", "arguments": "..." } } ]
        },
        "finish_reason": "stop" // e.g., stop, length, tool_calls
      }
    ],
    "usage": { // Usage statistics from the provider
      "prompt_tokens": 50,
      "completion_tokens": 150,
      "total_tokens": 200
    }
    // "raw_response": { ... } // Optionally, the raw response from the provider for debugging
  }
}
```

**Example: Error Response**

If an error occurs (e.g., invalid provider API key, malformed request to the provider, provider error), the HTTP response will typically look like this:

```json
{
  "success": false,
  "actionName": "YourOptionalActionName",
  "error": {
    "message": "Error description (e.g., Invalid API Key for OpenAI)",
    "code": 400, // Or other relevant error code from the provider/service
    "details": "Optional additional details or provider-specific error information"
  }
}
```

### Streaming Response (`payload.stream: true`)

When `payload.stream` is `true`, the interaction has two parts:

1.  **Immediate HTTP setup response**
    BetterForms validates the request, starts the provider stream, and returns a setup acknowledgment such as:
    ```json
    {
      "success": true,
      "data": {
        "message": "Streaming setup complete"
      }
    }
    ```
    If the stream cannot be created, the HTTP request fails at this step.

2.  **Real-time messages via BetterForms messaging**
    While the LLM is generating output, BetterForms sends stream events to your configured client channel and dispatch flow. Your application must be subscribed to the relevant BetterForms messaging channel and must handle the configured `actionName`.

    Each message is a JSON object with a `type` field indicating the kind of event.

    **Common Message Event Types & Structures:**

    *   **`type: "delta"`**: A chunk of generated text content.
        ```json
        {
          "type": "delta",
          "content": " a piece of the generated text..."
        }
        ```

    *   **`type: "threadInfo"`**: Metadata for the active stream. In current builds this is where the stream cancellation ID is typically delivered.
        ```json
        {
          "type": "threadInfo",
          "content": {
            "streamId": "uuid-for-stop-endpoint"
          }
        }
        ```

    *   **`type: "function_call"`**: The model is requesting one or more functions/tools to be called. This message provides the details needed for the client to understand what functions are being invoked, potentially to update UI or trigger local actions if the tool execution itself is managed by the backend (as is the case with `llmQuery`).
        ```json
        {
          "type": "function_call",
          "content": {
            "functions": [
              {
                "name": "get_current_weather",
                "userMessage": "Okay, checking the weather for you in Boston.", // Optional: User-friendly message from LLM about the action
                // Actual arguments are processed by the backend service for execution
              }
              // ... potentially more functions if parallel calls are made
            ]
          }
        }
        ```
        *Note: The `userMessage` is extracted from the tool arguments if provided by the LLM (e.g., if your function definition prompts the LLM to provide one). It can be `null`.*

    *   **`type: "end"`**: Signals the end of the stream of events for the current LLM interaction. This is sent after all deltas and any function call processing related to the stream are complete.
        ```json
        {
          "type": "end"
          // "finish_reason": "stop", // Optionally, the provider might include a finish reason
          // "usage": { ... } // Optionally, final usage stats for the streamed part
        }
        ```

    *   **`type: "error"`**: An error occurred *during the active streaming process* by the provider (after the initial HTTP call was acknowledged and stream handling began).
        ```json
        {
          "type": "error",
          "error": {
            "message": "An error occurred during the stream.",
            "details": "Provider-specific error details during streaming."
          }
        }
        ```

    **Client-Side Handling:** Your application listening to the channel needs to parse these JSON messages, identify the `type`, and react accordingly (for example: append `delta` content, store `streamId` from `threadInfo`, show tool activity, handle errors, and recognize the `end` of the current stream).

## Stop Endpoint

Active streams can be cancelled with:

- `POST /llm/query/stop`

Request body:

```json
{
  "streamId": "uuid-for-stop-endpoint"
}
```

Typical responses:

```json
{ "status": "stopped", "streamId": "uuid-for-stop-endpoint" }
```

```json
{ "status": "not_found", "streamId": "uuid-for-stop-endpoint" }
```

---

## Error Handling

Errors from the `/llm/query` service can be communicated in a few ways:

*   **HTTP Errors:** Standard HTTP status codes (e.g., `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `500 Internal Server Error`) may be returned for issues like malformed JSON, invalid BetterForms API Key (sent in the request body), or other server-level problems before the main service logic is deeply engaged.

*   **Service Errors in HTTP Response:**
    If an error occurs before a stream is successfully established, or during a non-streaming request, the direct HTTP response from `/llm/query` indicates failure.
    The typical structure for such an error in the HTTP response is:
    ```json
    {
      "success": false,
      "actionName": "YourOptionalActionName", // If provided in the request
      "error": {
        "message": "Descriptive error message (e.g., Invalid API key for LLM Provider, Tool execution failed)",
        "code": 400, // Or other relevant code (often reflecting provider's error code)
        "details": "Optional additional details or provider-specific error information"
      }
    }
    ```

*   **Stream-Specific Errors (via messages when `payload.stream: true`):**
    If a stream has already been established and an error occurs later during active streaming, BetterForms sends an `error` event through the streaming message channel. This is typically followed by an `end` event.
    The structure for such a channel message is:
    ```json
    {
      "type": "error",
      "error": {
        "message": "An error occurred during active stream processing.",
        "details": "Provider-specific error details encountered mid-stream."
      }
    }
    ```
    Note that even if a stream-specific error message is sent to the channel, the final HTTP response from the `/llm/query` call will also reflect `success: false` due to the overall interaction failure.

--- 