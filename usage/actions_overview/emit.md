# emit

BetterForms uses an internal event bus for communication between various elements. This allows parents, children and peers to all send information without direct references.

the `emit` action emits a message to elements that may be listening via this internal event bus. 

#### Emit Action Object

| Key | value | Description |
| :--- | :--- | :--- |
| action | 'emit' | Action name |
| options.eventName | {string} | The name of the event used to target the listener  |
| options.message | {string \| object} | The message body object, can be any type of data, see the elements specific fields it requires. |

**Uses**:

General purpose, sometimes you may want the following actions to wait until something is completed.

\*\*Example\*\*

```yaml
// This will send the seating chart element a reset to home screen commands 
[
  {
    "action": "emit",
    "options": {
      "eventName": "d3sc",
      "message": {
         "data": "",     // this data varies depending on the receiving element
         "method": "goToBoard"
      }
    }
  }
  ...
  
]
```

