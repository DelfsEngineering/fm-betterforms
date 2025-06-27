# BF Streaming Proxy

{% hint style="info" %}
**Note:** This page provides a high-level overview of the streaming workflow. For specific implementation details, please see the following API documentation:
* [BF Streaming API (Chat)](bf-streaming-api-chat.md)
* [BF Streaming API (Assistants)](bf-streaming-assistants-api.md)
* [BF Streaming API (LLM Query)](bf-streaming-api-llm-query.md)
{% endhint %}

The streaming proxy allows you to stream generative AI directly into a BF app via messaging.

### Workflow

1. Back end (FMS) generates the prompt and data needed for the LLM API plus the target channel for the results
2. Streaming Proxy forwards request to the LLM
3. LLM Streams results back to proxy
4. Streaming Proxy sends messages to the target channel and calls a named action to handle the results
5. The browser receives the messages and processes results.

**Notes:**

Currently there is not rate throttling on the Proxy as the LLM generation is generally much slower than message rate limits. There can be bottle next when u\[dating the front end UI if there is a lot of post processing though.
