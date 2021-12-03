# panel

`panel` allows better organization of fields and data. Panel elements can hold other BF elements.

Version : 8.26+

| Key | Value\(s\) | Type | Description |
| :--- | :--- | :--- | :--- |
| type | panel | string |  |
| model |  | object | unused |
| title | _text_ | string | Text string that will appear at the top of the panel |
| footer | _text_ | string | Text that appears at the botom of the footer. |
| schema | {} | object | Contains nested form schema |
| schema.fields | \[\] | array | Field elements to appear inside the panel |
| isOpen |  | boolean | The current state of the panels display |
| credentials | {} | object | credential object, |

## Reference

```javascript
// sample panel object
```

