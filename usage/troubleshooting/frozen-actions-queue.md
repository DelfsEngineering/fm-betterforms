# Frozen Actions Queue

If your page seems unresponsive, one thing to check is if the **actions queue** has frozen. The actions queue is an array that stores upcoming actions waiting to be executed. Most of the time, it should be empty because most actions execute very quickly. However, if an action is hanging, the queue will not continue to execute and each new click of a button with actions will simply add to the queue but not seem to do anything.

The easiest recognized symptom of a frozen actions queue is when you click a button and that button doesn't work, but after refreshing the page, the button does work as expected. This is because refreshing the page clears the actions queue.

## How to check the Actions Queue

To inspect the current state of the actions queue, go to the **console** in your browser and type the following command:

```text
window.vueapp.$store.state.actions.actions
```

This will return the actions queue array. If the array is empty, all the actions in your queue have executed. If it's not empty, there is an action still executing and the actions listed here are waiting to execute.

## How to find the broken action

For this, you need to do a bit of detective work and retrace your steps. If your actions queue is frozen, the action that is currently being executed will not be shown to you. However, since you know that the first action in the actions queue array comes immediately after the broken action, this should help you locate exactly which action is not completing its execution.

## Common reasons for broken actions

* A `path` action is missing the `path` or `url` option

