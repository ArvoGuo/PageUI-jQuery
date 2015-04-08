
A component of PageUI
Base On Jquery

翻页插件，jquery插件

##Demo

[Demo](http://c.oooooo6.com/PageUI-jQuery/index.html)

##Use

HTML

```html
<div id="page"></div>
```

JS

```javascript
// data for demo
var data = [
    {name: "小王"},
    {name: "小王"},
    {name: "小王"},
    {name: "小明"},
    {name: "小明"},
    {name: "小明"},
    {name: "小画"},
    {name: "小画"},
    {name: "小画"},
    {name: "小见"},
    {name: "小见"},
    {name: "小见"},
    {name: "小露"},
    {name: "小露"},
    {name: "小露"}
];

// paintFn for test

var paintFn = function(data) {
  var html = '';
  data.map(function(item){
    html += '<tr><td>' + item.name + '</td></tr>';
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


