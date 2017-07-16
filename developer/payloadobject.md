# Payload Object

## Overview

The `payload object` is the main 'package' of data and meta data that gets passed along the workflow. By mutating different areas of the `payload object` you can affect the users experience.

#### Things you can do:

* Redirect the user to different areas
* Validate data
* Mutate data and inject data based on business logic
* add or hide form elements

Changing nearly any aspect of the `payload object` will immediately render that change to the user.

```
// $payload JSON
{
    "service": "onTabChange" 



}
```



