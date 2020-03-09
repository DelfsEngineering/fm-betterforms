---
description: >-
  FM BetterForms can throw various errors due to code or configuration. Errors
  can appear in the Helper File, Developer Tools ( when enabled) or the browser
  console.
---

# BF Error Codes

| Error Code | Description | Other information passed |
| :--- | :--- | :--- |
| **10xxx Series** | **Errors generated within client \(brower\) side code** |  |
|  |  |  |
| **100xx** | **Site related** |  |
|  |  |  |
| 10010 | DOM Header insertion error, There was an error with adding content to the &lt;head&gt; tag. Usually a JS error or resource error | script content and error |
| 10020 | HTML Render error |  |
|  | v |  |
| **101xx** | **Action related** |  |
|  |  |  |
| 10110 | `namedAction` not found, BF tried to look for the named action in the for and site and was unable to find it. | The action that caused the issue |
| 10112 | Clipboard copy action error |  |
| 10120 | No  `onResponse_actions` has been configured  | The response the element tried to handle |
|  |  |  |
| **103xx** | **Hook Related** |  |
| 10300 | Error calling FMS, FMS returned an error | Result |
|  |  |  |
| **10900** | **Other** |  |

