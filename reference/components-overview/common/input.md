# Input

The input field in our editor is customizable and supports various browser input types. In V3+ schemas, those options should be placed under `fieldOptions`.

#### **1. Input Field Structure**

Each input field is defined by a JSON object with the following properties:

* **`"fieldOptions.inputType"`**: Type of input (`text`, `password`, `email`, `number`, etc.).
* **`"label"`**: Descriptive text for the input field.
* **`"model"`**: Field name in the data model.
* **`"styleClasses"`**: CSS classes for layout.
* **`"type"`**: Always `"input"` for input fields.

#### **2. Available Input Types**

Here are examples for common input types:

**Text Input:**

```json
{
  "fieldOptions": {
    "inputType": "text"
  },
  "label": "Username",
  "model": "username",
  "styleClasses": "col-md-3",
  "type": "input"
}
```

**Password Input:**

```json
{
  "fieldOptions": {
    "inputType": "password",
    "minlength": 6
  },
  "label": "Password",
  "model": "password",
  "hint": "Minimum 6 characters",
  "validator": "calc",
  "validator_calc": "model.password == model.password2",
  "styleClasses": "col-md-6",
  "type": "input"
}
```

**Email Input:**

```json
{
  "fieldOptions": {
    "inputType": "email"
  },
  "label": "Email",
  "model": "email",
  "validator": "email",
  "required": true,
  "styleClasses": "col-md-3",
  "type": "input"
}
```

**Number Input:**

```json
{
  "fieldOptions": {
    "inputType": "number",
    "step": 1
  },
  "label": "Age",
  "model": "age",
  "styleClasses": "col-md-3",
  "type": "input"
}
```

#### **3. Validation**

Use the `"validator"` property to validate the input. Common validators include:

* **email**: Ensures the input is a valid email address.
* **calc**: Custom validation using `"validator_calc"`.
