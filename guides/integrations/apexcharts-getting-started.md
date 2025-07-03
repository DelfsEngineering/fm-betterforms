# ApexCharts - Getting started

## Overview

This doc will explain how to get ApexChart setup to use in an app.

## Installing and Initializing

* Add the following tags to your DOM header insertions:

```jsx
<!-- Apex chart -->
<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-apexcharts"></script>
```

* Add the following line to a function on the named action ‘onAppLoad’, under the Global Named Actions (App level):

```jsx
Vue.component('apexchart', VueApexCharts);
```

## Example

Here is an example of how to draw a chart using ApexCharts in your app.

### Sample Data

For this example we will be using these sample data, that can be saved to your Data Model as ‘data’:

```jsx
{
	"data": {
        "chartOptions": {
            "chart": {
                "height": 350,
                "stacked": true,
                "toolbar": {
                    "show": true
                },
                "type": "bar",
                "zoom": {
                    "enabled": true
                }
            },
            "fill": {
                "opacity": 1
            },
            "legend": {
                "offsetY": 40,
                "position": "right"
            },
            "plotOptions": {
                "bar": {
                    "horizontal": false
                }
            },
            "responsive": [{
                "breakpoint": 480,
                "options": {
                    "legend": {
                        "offsetX": -10,
                        "offsetY": 0,
                        "position": "bottom"
                    }
                }
            }],
            "xaxis": {
                "categories": ["01/01/2011 GMT", "01/02/2011 GMT", "01/03/2011 GMT", "01/04/2011 GMT", "01/05/2011 GMT", "01/06/2011 GMT"],
                "type": "datetime"
            }
        },
        "series": [{
            "data": [44, 55, 41, 67, 22, 43],
            "name": "PRODUCT A"
        }, {
            "data": [13, 23, 20, 8, 13, 27],
            "name": "PRODUCT B"
        }, {
            "data": [11, 17, 15, 15, 21, 14],
            "name": "PRODUCT C"
        }, {
            "data": [21, 7, 25, 13, 22, 8],
            "name": "PRODUCT D"
        }]
    }
}
```

### Adding charts to page schema

All we need is an html component with the ApexChart tag, as following:

```jsx
{
    "html": " <div id=\"chart\">\n     <apexchart type=\"bar\" height=\"350\" :options=\"model.data.chartOptions\" :series=\"model.data.series\"></apexchart>\n </div>",
    "styleClasses": "col-md-10",
    "type": "html"
}
```

The expected result should be as shown in the image below.

![Untitled](<../../.gitbook/assets/Untitled (4).png>)

## Reference

More information can be found on ApexCharts docs

[Installation & Getting Started - ApexCharts.js](https://apexcharts.com/docs/installation/)
