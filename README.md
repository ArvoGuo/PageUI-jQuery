
A component of PageUI
Base On Jquery

##Demo

index.html

##Use

HTML

```
<div id="page"></div>
```

JS

```
// data for demo
var data = [
  {index:1},
  {index:2},
  {index:3},
  {index:4},
  {index:5},
  {index:6},
  {index:7},
  {index:8},
  {index:9},
  {index:10},
  {index:11},
  {index:12},
  {index:13},
  {index:14},
  {index:15}
  ];

// paintFn for test

var paintFn = function(data) {
  var html = '';
  data.map(function(item){
    html += '<tr><td>' + item.index + '</td></tr>';
  });
  $('#tbody').html('').append(html);
};

//triggerFn for test

var triggerFn = function(page) {
  console.log('当前页数为：' + page);
};

var page = $.Page({
  range: 3,
  Ele: $('#page'),
  data: data, // Array of data
  index: 1,
  paintFn: paintFn, // Turn page Fn
  triggerFn: triggerFn // Click Fn
});
```


