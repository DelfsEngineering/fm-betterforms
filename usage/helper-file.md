# Helper File

The helper file is a FileMaker file that acts as proxy to the application files that BetterForms will be connecting to.

### Benefits

* Provides code generation for clipboard pasting of custom functions and scripts
* Allows a single point of entry from the BetterForms frame work allowing clear and logic security control
* Contains a user table for tracking users and authentication.
* Allows hook scripts to be run locally for debugging.

### Hook Scripts

A hook script is a script that inserts itself into normal workflow allowing additional control. See: [https://en.wikipedia.org/wiki/Hooking](https://en.wikipedia.org/wiki/Hooking)

You interact with your application and the Web client via hooks scripts. Hooks fall into two categories.

#### Common Hooks

Common hooks are scripts that are not contextual to a specific page. Typically they can be called from anywhere. Eg: A login or registration hook are common hooks.

#### Scoped Hooks

Scoped hooks are bound to a specific form / page. `onFormRequest` is an example of a scoped hook. This script would be called when a specific form loads.

