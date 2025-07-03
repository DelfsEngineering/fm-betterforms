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
  "actionName": "optional_action_name_for_logging",
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

The request body must be a JSON object. It includes parameters to identify your messaging channels for potential streaming, an optional action name for logging, and a mandatory `payload` object containing the specific instructions for the LLM provider.

```json
{
  "apiKey": "YOUR_APP_SPECIFIC_API_KEY_FROM_SETTINGS",
  "channels": ["your_target_channel_id"],
  "actionName": "optional_action_name_for_logging",
  "payload": {
    // LLM Provider specific payload - see below
  }
}
```

### Main Body Parameters:

*   `apiKey` (String, **Required**): Your application-specific API key obtained from the App Settings in the FM BetterForms editor. This key authenticates your request to the `llmQuery` service.
*   `channels` (Array of Strings, **Required for streaming**): An array of one or more strings, representing the IDs of the BetterForms messaging channels.
    *   If `payload.stream` is `true`, real-time intermediate data from the LLM (such as `delta` text chunks, `function_call` details, and `end` events) will be pushed as discrete messages to **all channel IDs specified in this array**. Ensure your client application is subscribed to these channels to receive the messages. The main HTTP response to the `/llm/query` call itself will be sent once the LLM provider has completed its entire interaction.
    *   If `payload.stream` is `false`, this field is still technically accepted but is not actively used for delivering the primary LLM response (as that comes directly in the HTTP response).
*   `actionName` (String, Optional): Specifies the BetterForms namedAction to be called for streaming messages and frontend tool interactions. 
    *   **Default Value**: If not provided, defaults to `"onLlmMessage"` 
    *   **Functional Role**: This determines which namedAction in your BetterForms application will receive streaming events (when `payload.stream: true`) and frontend tool calls (tools with `ui_` prefix)
    *   **Legacy Use**: Also serves as a descriptive name for logging and tracking within BetterForms (e.g., "SummarizeMeeting", "GenerateEmailDraft")
    *   **Frontend Tool Integration**: Essential for frontend tool workflows - your namedAction must be configured to handle `llmToolCall` actions if using frontend tools
*   `payload` (Object, **Required**): An object containing the parameters to be sent to the chosen LLM provider. See "Payload Object" section below.

### Payload Object

This object contains the core instructions for the LLM interaction.

#### Common Payload Fields:

These fields are generally required or common across all supported providers:

*   `provider` (String, **Required**): Specifies which LLM provider to use. Supported values: `"openai"`, `"gemini"`, `"anthropic"`.
*   `apiKey` (String, **Required**): **Your API key for the selected LLM provider** (e.g., your OpenAI API key, Google AI Studio API key for Gemini, or Anthropic API key). This key is passed securely to the respective LLM service.
*   `stream` (Boolean, **Required**):
    *   `false`: The API call will wait for the LLM to complete its response. The full result from the LLM (or an error) will be returned directly in the HTTP response to the `/llm/query` call.
    *   `true`: The API call will still wait for the LLM to complete its interaction (including any function calling). The initial HTTP response to the `/llm/query` call will contain the final consolidated result from the provider (e.g., a success message or the full non-streamed content if the provider doesn't stream the final assembly). Real-time intermediate data (like text chunks `delta`, `function_call` details, and `end` events) will be sent as discrete messages to all channel IDs specified in this array.
*   `model` (String, **Required**): The specific model identifier for the chosen provider (e.g., `"gpt-4o"`, `"gemini-1.5-pro-latest"`, `"claude-3-opus-20240229"`). **Refer to the official documentation of the respective LLM provider for a current list of available models and their capabilities.**
*   `messages` (Array, **Required**): An array of message objects representing the conversation history. The exact structure and role requirements vary by provider (see provider-specific sections below).
*   `max_tokens` (Integer, Optional): The maximum number of tokens to generate in the response. Provider defaults apply if omitted. Behavior and limits vary by provider and model.
*   `temperature` (Number, Optional): Controls the randomness of the output (typically 0.0 to 1.0 or 2.0). Lower values are more deterministic; higher values are more creative. Provider defaults apply if omitted.
*   `top_p` (Number, Optional): Nucleus sampling parameter. Controls the diversity of the output. Provider defaults apply if omitted.
*   `top_k` (Integer, Optional): Top-K sampling parameter. Limits the sampling pool to the K most likely tokens. Provider defaults apply if omitted.
*   `tools` (Array, Optional): An array defining functions or tools the model can call. The structure should follow a common format (typically OpenAI's format, as providers like Gemini have internal translators). See provider-specific sections and the "Tool Use / Function Calling" section for more details.
*   `tool_choice` (String | Object, Optional): Controls how the model uses tools (e.g., `"auto"`, `"none"`, or an object to force a specific function). Behavior may vary slightly by provider; some providers translate this to their native format.

---

## Supported Providers & Specifics

### 1. OpenAI (`provider: "openai"`)

*   **Messages Format:**
    *   Array of objects with `role` (`system`, `user`, `assistant`, `tool`) and `content` (string or array for vision).
    *   `system` message is optional, placed first.
    *   `tool` role used for responses from tool calls.
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
    *   Array of objects with `role` (`user`, `model`) and `parts` (array of text or inlineData objects).
    *   **Strictly alternating `user` and `model` roles required.**
    *   System instructions should be passed in a separate `systemInstruction` field within the `payload`, *not* within `messages`.
*   **Image Handling (Vision):**
    *   Pass Base64 encoded image data within the `parts` array.
    *   Format: `{ "inlineData": { "mimeType": "image/jpeg", "data": "YOUR_BASE64_ENCODED_STRING" } }`
    *   Sending URLs requires the backend service (`llmQuery`) to fetch, encode, and format the image correctly before sending to Gemini.
*   **Tool Use:** Supported via `tools` parameter (similar format to OpenAI). See Gemini documentation.

### 3. Anthropic Claude (`provider: "anthropic"`)

*   **Messages Format:**
    *   Array of objects with `role` (`user`, `assistant`) and `content` (string or array for vision).
    *   **Strictly alternating `user` and `assistant` roles required.** The first message must have the `user` role.
    *   System prompts should be passed in a separate `system` field within the `payload`, *not* within `messages`.
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

*   **LLM Request:** The LLM will indicate its intent to call a function, specifying the function name and the arguments it wishes to use.
*   **Service Handling:** The `llmQuery` service (specifically, the active provider module) intercepts this request.
    *   **Streaming Notification (if `payload.stream: true`):** A message of `type: "function_call"` is sent to your client application via the specified `channels`. This allows your UI to show that a tool is being invoked (see "Streaming Response / Common Message Event Types" for the message structure).
    *   **Tool Execution (FileMaker Integration):** The service then triggers a **Common Hook** in your configured FileMaker application. The details of the function call, including the `name` of the tool/function and its `arguments` (as an object), are passed as parameters to this Common Hook.
        *   **Developer Action (FileMaker):** You need to have a script in your FileMaker solution attached to this Common Hook. This script should:
            1.  Identify the requested tool by its `name`.
            2.  Use the provided `arguments` to perform the desired action (e.g., look up data, create records, call other scripts).
            3.  Return a result (typically a string, or a JSON string if complex data needs to be returned) back through the Common Hook mechanism.
        *   **Host Context:** The `host` value (derived from the original `/llm/query` request context, e.g., your FileMaker Server address used in BetterForms setup) is used to ensure the Common Hook call targets the correct FileMaker server and file, especially in environments managing multiple FileMaker solutions.
    *   **Result to LLM:** The output returned by your FileMaker script (via the Common Hook) is then captured by the `llmQuery` provider and sent back to the LLM as the result of the tool call.
*   **Continued Conversation:** The LLM processes the tool's output and continues the conversation, potentially generating further text, calling another tool, or finishing its response.

**3. Final LLM Response:**

The final text generated by the LLM *after* any tool use cycles are complete is what forms the basis of the response you receive from the `/llm/query` call (for non-streaming) or the `delta` and `end` messages (for streaming), as described in the "Response Format" section.

You, as the user of the `/llm/query` API, do not directly handle the low-level tool request/response loop with the LLM. You define the tools, and the service orchestrates their execution via your FileMaker Common Hooks and the subsequent interaction with the LLM.

**Key Takeaway for Developers:** To make your defined tools functional, you must implement corresponding scripts in your FileMaker application, attached to a BetterForms Common Hook. These scripts must be designed to receive the tool `name` and `arguments`, execute the required logic, and return a result. Refer to the BetterForms documentation on implementing Common Hooks for details on setup and script parameter/result handling.

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

When `payload.stream` is `true`, the interaction is twofold:

1.  **HTTP Response from `/llm/query`:**
    The initial HTTP POST call to `/llm/query` will still wait for the LLM provider to complete its entire interaction (including any internal tool call loops and processing of their results). The JSON response returned directly to the HTTP caller will signify the overall outcome of this entire process. It might contain a summary message or, in some cases, the fully assembled text if the provider streams parts but returns a complete whole at the end of its own internal processing.

    **Example: Successful HTTP Response (after stream processing by provider)**
    ```json
    {
      "success": true,
      "actionName": "YourOptionalActionName",
      "data": {
        "message": "LLM interaction complete. Streamed data sent to channels.",
        // Depending on the provider, this might also contain final usage stats or the assembled content.
        "usage": { 
          "prompt_tokens": 55,
          "completion_tokens": 250,
          "total_tokens": 305
        }
      }
    }
    ```
    If an error occurs that prevents the stream from even starting or during the provider's setup, an error response similar to the non-streaming error example will be returned here.

2.  **Real-time Messages via Channels:**
    While the LLM is generating its response (and potentially calling tools), a series of JSON messages are pushed to **all channel IDs specified in the `channels` array** of your request. Your application must be subscribed to these channels (e.g., using BetterForms client-side messaging capabilities) to receive and process these events in real-time.

    Each message is a JSON object with a `type` field indicating the kind of event.

    **Common Message Event Types & Structures:**

    *   **`type: "delta"`**: A chunk of generated text content.
        ```json
        {
          "type": "delta",
          "content": " a piece of the generated text..."
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

    **Client-Side Handling:** Your application listening to the channel needs to parse these JSON messages, identify the `type`, and react accordingly (e.g., append `delta` content to a display area, show `function_call` activity, handle `error` messages, and recognize the `end` of the current stream).

    Note that even if a stream-specific error message is sent to the channel, the final HTTP response from the `/llm/query` call will also reflect `success: false` due to the overall interaction failure.

---

## Error Handling

Errors from the `/llm/query` service can be communicated in a few ways:

*   **HTTP Errors:** Standard HTTP status codes (e.g., `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `500 Internal Server Error`) may be returned for issues like malformed JSON, invalid BetterForms API Key (sent in the request body), or other server-level problems before the main service logic is deeply engaged.

*   **Service Errors in HTTP Response (for both `stream: false` and `stream: true`):**
    If an error occurs within the `llmQuery` service itself or is reported by the LLM provider during the request processing (including errors that prevent a stream from starting or errors that terminate the overall LLM interaction), the direct HTTP JSON response from `/llm/query` will indicate failure. This applies whether `payload.stream` is `false` or `true`.
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

*   **Stream-Specific Errors (via Messages on Channels when `payload.stream: true`):**
    If `payload.stream` is `true` and an error occurs specifically during the real-time processing of stream events by the provider (e.g., the LLM sends an error event mid-stream after the initial part of the stream has begun), an `error` type message will be sent to the subscribed `channels`. This is typically followed by an `end` message on the channel to signify termination of that stream of events.
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