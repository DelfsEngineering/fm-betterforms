---
description: >-
  Implementation of www.fullcalendar.io calendaring component. Component based
  on https://github.com/CroudTech/vue-fullcalendar
---

# fullCalendar

Implementation of [www.fullcalendar.io](https://fullcalendar.io/) calendaring component.

Component based on [https://github.com/CroudTech/vue-fullcalendar](https://github.com/CroudTech/vue-fullcalendar)

#### Action keys:

* **event-selected(event, jsEvent, view)** - Triggered on eventClick()
* **event-mouseover(event, jsEvent, view)** - Triggered on eventMouseover()
* **event-mouseout(event, jsEvent, view)** - Triggered on eventMouseout()
* **event-drop(event)** - Triggered on eventDrop()
* **event-resize(event)** - Triggered on eventResize()
* **event-created(event)** - Triggered on select()
* **event-receive(event)** - Triggered on eventReceive()
* **event-render(event)** - Triggered on eventRender()
* **view-render(view, element)** - Triggered on viewRender()
* **day-click(date, jsEvent, view)** - Triggered on dayClick()

{% hint style="info" %}
Check [this example](https://app.fmbetterforms.com/#/apps/pages/edit?id=A64024B1-FD90-7044-B7B0-39279F350430) of fullCalendar.
{% endhint %}

The provided schema is an example configuration that includes a `fullCalendar` component and some HTML elements to display the event data and the selected event.

#### Configuration and Action Keys

`config` holds the configuration settings for the `fullCalendar` component.

```json
{
    "schedulerLicenseKey": "GPL-My-Project-Is-Open-Source"
}
```

**Action Keys**

Action keys define what should happen when specific events occur on the calendar. Each action is associated with a JavaScript event and specifies a sequence of actions to be executed.

*   **`dayClick_actions`**: Triggered when a day on the calendar is clicked.

    ```json
    "dayClick_actions": [{
                    "action": "showAlert",
                    "options": {
                        "text": "",
                        "title": "dayClick_actions",
                        "type": "information"
                    }
                }]
    ```
* **`eventCreated_actions`**
* **`eventMouseout_actions`**
* **`eventMouseover_actions`**
* **`eventRender_actions`**
* **`eventResize_actions`**
* **`eventSelected_actions`**

These keys can be used to define customized actions for each corresponding event.

**Additional Configuration Keys**

*   **`defaultView`**: Specifies the default view of the calendar (e.g., month, week, day).

    ```json
    "defaultView": "month"
    ```
*   **`editable`**: Determines if the events on the calendar can be edited (dragged, resized).

    ```json
    "editable": true
    ```
*   **`model`**: Links the calendar to a model that holds the events data.

    ```json
    code"model": "events"
    ```
*   **`type`**: Specifies the type of component, which in this case is `fullCalendar`.

    ```json
    "type": "fullCalendar"
    ```
