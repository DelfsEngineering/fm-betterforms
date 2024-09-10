# BF Streaming Proxy

{% hint style="info" %}
The streaming proxy allows you to stream generative AI directly into a BF app via messaging.
{% endhint %}

### Workflow

1. Back end (FMS) generates the prompt and data needed for the LLM API plus the target channel for the results
2. Streaming Proxy forwards request to the LLM
3. LLM Streams results back to proxy
4. Streaming Proxy sends messages to the target channel and calls a named action to handle the results
5. The browser receives the messages and processes results.

**Notes:**

Currently there is not rate throttling on the Proxy as the LLM generation is generally much slower than message rate limits. There can be bottle next when u\[dating the front end UI if there is a lot of post processing though.
