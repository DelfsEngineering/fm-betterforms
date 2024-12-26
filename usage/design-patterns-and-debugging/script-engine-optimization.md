---
description: >-
  Your server often has surplus CPU capacity which can be used to run concurrent
  thread task and relived the user from waiting for completion.
---

# Script Engine Optimization

#### Overview

Often slow running processes can be run concurrently and not require the user to wait for their completion (Eg. emailing a report)

#### **Examples of tasks that can be spun into a new thread:**

* Write a log entry
* Send an email
* Build a report
* Send a real-time message

#### Background Information on the FM Script Engines

{% embed url="https://www.youtube.com/watch?v=PNCdwNak3XI" %}





