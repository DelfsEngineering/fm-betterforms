---
description: >-
  UX, Performance optimizations and best practices for building BetterForms
  apps.
---

# Design Patterns and Best Practices

## Section under development

This section covers proven design patterns that will allow you to build quick solid apps in BetterForms.

### Code Goals

* Readable
* Debuggable
* Reusable
* Performant

### Globals

It is not recommended to use `$$Globals` within your hook scripts unless you have a specific purpose and fully understand their implications.  Often with client based solutions \( FileMaker only apps\) we use globals for various environmental values. This can have negative unwanted effects in Klai hooks. There really is not any advantage to using globals on Klai hooks unless you are writing hook based scripts yourself.

#### Why you shouldn't I use globals in hooks?

The CWP session that Klai uses can often be reused and often from a different user. If you do not have excellent clean up and instantiation practices with your globals, these value can be passed to other Klai hooks that are run and create a security issue. 

#### But Klai uses globals ... ?

The BetterForms hooks do use globals but they are managed very carefully and this is an excellent use case for them. By using a global for the hook data there is no need to pass parameters around through the various scripts. The globals are also instantiated at the beginning of every script so it is safe.



