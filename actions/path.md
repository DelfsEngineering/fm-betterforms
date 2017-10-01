# Action: path

`path` redirect the user to a different area, form or layout. Path can even be used to log a user out. ( `/logout` )

**note:** _path_ must be last item \( processor does not check for subsequent ones after path \)

| Key | Description |
| :--- | :--- |
| action | showModal |
| options.path | "/" - index page |
| | "/form/:id - a form with id |

```
// example path action object
{
"action" :"path",
    {
        url
    }


}



```

####FileMaker Custom Function
```
    BF_SetAction_Path("/form/123-1234-5678") // takes user to form 123...
```




