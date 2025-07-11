# Keeping Keys Private

## Private information and PCI Compliance

You can prevent critical information from being saved to records by adding a `deletePaths` array of data model paths you want to remove or `'***'` out from the data model.

* All hooks will have full access to the original payload data, but the sensitive data is never committed to any record in any FileMaker file.
* If you are saving the data model you will also have to apply a `deletePaths` function.
* This features takes advantage of the JSON.deletePaths custom function.

## Example

```yaml
// Supplied
{
  "model": {
    "deletePaths": [
    "payment.cvv",
    "payment.exp",
    "payment.cardNumber"
    ],
    "nameFirst": "Charles ",
    "nameLast": "Delfs",
    "payment": {
      "address1": "50 moore",
      "cardNumber": "1231 11221 212121",
      "city": "Bradford on",
      "country": "canada",
      "cvv": "123",
      "exp": "11-11"
    }
  }
}

// Results is saved data:
{
  "model": {
    "deletePaths": [
      "payment.cvv",
      "payment.exp",
      "payment.cardNumber"
    ],
    "nameFirst": "Charles ",
    "nameLast": "Delfs",
    "payment": {
      "address1": "50 moore",
      "cardNumber": "***",
      "city": "Bradford on",
      "country": "canada",
      "cvv": "***",
      "exp": "***"
    }
  }
}
```

### Example Cleaning Function

Use this from within a hook to access the $$model or $model var \(new or old hooks\)

```text
$modelCleaned = 
Let(
[

deletePaths = JSONGetElement ( $model; "deletePaths" )
];

If ( not IsEmpty ( deletePaths ) 
  ; JSON.DeletePaths ( $model ; deletePaths ; "***" ) 
  ;$model 
  )

)
```

