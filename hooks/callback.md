#### onCallback API Endpoint

#### onCallback

This hook gives the developer access to a universal API endpoint. This can be used for any external callbacks callbacks or as an endpoint serving data.

This service can act as a universal endpoint and service multiple content types. The default is JSON but this can also be changed to others (see below).

#### Uses:
* Callback for integrating various services
* Document download endpoint
* App entry point for passing data when integrating from another system. _Eg. A user clicks a link in your online e-Connerce store and that link hits the BetterForms API callback. This action passes some data that launches the user cart session._

#### Supported Request Types
* plain text
* application/JSON
* text/JSON
* text/* - any text content type

#### Supported Methods
* GET
* POST
* PUT
* PATCH
* DELETE

`$params.query` will contain url query parameters
`$body` will contain a body string if it is supported by the method

The hook is passed header, query and body data  as well as the request type \(located in  `$params.method`

Set the `$response` var to the data you want to be returned.

Set the `$contentType` var to one of the following to return that content type and set the correct headers for the outbound data.

| $format var values | Content types |
| :--- | :--- |
| empty or null / unset or 'json' | JSON |
| 'html' | returns $response as html with headers set accordingly |
| 'text' | returns $response as plain text. |
| 'xml' | returns $response as xml with headers set accordingly |

#### Suggested Design Pattern
Keeping your API handler scripts orderly is key to stability and ease of code maintenance. 



```
// Sample inbound request 


    "params": {
      "headers": {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate",
        "cache-control": "no-cache",
        "connection": "keep-alive",
        "content-type": "application/json",
        "cookie": "PHPSESSID=kmr6khj4nlruspai6tfiv0fcf7",
        "host": "mycallingdomain.com",
        "myheaderkey": "12345HEADERKEY0000",
        "postman-token": "2630f738-8f01-49af-acc6-556437a4a23b",
        "user-agent": "PostmanRuntime/6.2.5",
        "x-forwarded-for": "99.254.153.139",
        "x-forwarded-port": "443",
        "x-forwarded-proto": "https",
        "x-region": "usw"
      },
      "method": "GET",
      "provider": "rest",
      "query": {
        "key1": "1",
        "key2": "2"
      }
    }
  }
```



