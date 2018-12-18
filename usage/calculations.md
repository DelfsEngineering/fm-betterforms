# Calculations

Nearly all JSON keys can be replaced with calculations. This is simular to how a field in Filemaker can also be a calculation.

FM BetterForms has three types of calculations, getters and functions. Both types are needed because the framework uses several open source modules internally and not all modules have the same compatibility. 

#### As A Getter

Adding an evaluating calc as a getter will convert your code into a getter property that can be referenced as a regular hard coded attribute.

Syntax: `myKey_calc` Add a `_calc` to the key name.

#### As A Function

Adding an evaluating calc as a function will convert your code into a funtion and attach it to the referenced key.

Syntax: `myKey_calcf` Add a `_calcf` to the key name.

#### Scope

Scope changes when code is evaluated as a getter and is less flexible. Getters generally can only see the object they are part of. \(The schema of the element\)

#### Why Two Ways

Different JavaScript components access different variables in different ways. Some modules will access an attribute as if it was a constant while others will check if it is a function. Functions are called differently than constants.

Example:

```yaml
// in your schema ...
{
    "color": "blue",
    "visible": model.someField == 0
}
```

```javascript
// in the JS module this may be accessed as ...
var theColor = color // blue

// Other modules would reference the attribute as a function ...
var isVisible = visible()  // this is calling the key as a function
```





