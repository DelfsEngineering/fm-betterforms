# Payload Object

## Overview

The `payload object` is the main 'package' of data that gets passed along the workflow. By mutating different areas of the `payload object` you can affect the users experience. 

#### Things you can do:
 * Redirect the user to different areas
 * Validate data
 * Mutate data and inject data based on business logic
 * add or hide form elements
 
Changing nearly any aspect of the `payload object` will immediately render that change to the user.



onLogin

onLogout

## Customization

All hooks have data that is passed into and out of them. But mutating this data you can control the user experience.  Each hook script has its own documentation relating to what data $vars are passed in.

Familiarize yourself with the various object types that could be passed in and out.   

### onLogin

---

### onCallback

### 

### Forms Specific Hooks

All forms functions call the formsService Script and are then passed down to the applicable sub-service.

---

### onTabChange

---

### onComplete



