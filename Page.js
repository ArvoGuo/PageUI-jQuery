(function($) {
  var Page = function(options) {
    this.init(options);
  };
  var fn = Page.prototype;
  fn.init = function(options) {
    var self = this;
    self.range = options.range || 10;
    self.Ele = options.Ele;
    self.data = options.data;
    self.paintFn = options.paintFn;
    self.paintArea = options.paintArea;
    self.htmlEle = $('<nav><ul class="pagination"></ul></nav>');
    self.index = options.index;
    self.triggerFn = options.triggerFn || function(page) {console.log(page);};
    self.paintPage();
    /*default page*/
    self.defaultPage();

  };

  fn.defaultPage = function(){
    var self = this;
    var page = self.index;
    if (page < 2){
      page = 1;
    }
    if (page > self.totalPage()){
      page = self.totalPage();
    }
    self.Ele.find('a[data='+ (page - 1) +']').eq(0).trigger('click');
  };

  fn.paintPage = function() {
    var self = this;
    var totalPage = self.totalPage();
    if (totalPage < 2){
      self.Ele.html('');
      self.paintFn(self.data);
      return;
    }
    var pageUl = self.htmlEle.find('.pagination');
    var i;
    pageUl.append(self.getPrevEle());
    for (i = 0; i < totalPage; i++) {
      var pageItem = self.getPageEle(i);
      self.bindAction(pageItem);
      pageUl.append(pageItem);
    }
    var nextEle = self.getNextEle();
    nextEle.trigger('click');
    pageUl.append(nextEle);
    self.Ele.html('').append(self.htmlEle);
  };

  fn.bindAction = function(item){
    var self = this;
    item.on('click',function(){
      var page = this.innerText;
      if (self.isCurrent(page)) {
        return;
      }
      self.htmlEle.find('li').removeClass('active');
      $(this).addClass('active');
      var correctData = self.getCorrectData(page);
      self.paintFn(correctData);
      self.triggerFn(page);
    });
  };

  fn.isCurrent = function(index){
    var self = this;
    var current = self.htmlEle.find('.active').text();
    if (current == index) {
      return true;
    }
    return false;
  };

  fn.getCorrectData = function(pageIndex){
    var self = this;
    var start = (pageIndex - 1) * self.range;
    var end  = pageIndex * self.range;
    if (pageIndex * self.range > self.data.length){
      end = self.data.length;
    }
    var data = [], i;
    for (i = start; i < end; i ++){
      data.push(self.data[i]);
    }
    return data;
  };

  fn.totalPage = function() {
    var self = this;
    var total = Math.ceil(self.data.length / self.range);
    return total;
  };

  fn.getPrevEle = function() {
    var self = this;
    var item = $('<li class="prev"><a href="javascript:void(0);">&laquo;</a></li>');
    item.on('click',function(){
      var pageEle = self.htmlEle.find('.active');
      if(!pageEle.prev().hasClass('prev')){
        pageEle.prev().trigger('click');
      }
    });
    return item;
  };

  fn.getNextEle = function() {
    var self = this;
    var item = $('<li class="next"><a href="javascript:void(0);">&raquo;</a></li>');
    item.on('click',function(){
      var pageEle = self.htmlEle.find('.active');
      if(!pageEle.next().hasClass('next')){
        pageEle.next().trigger('click');
      }
      if(pageEle.length === 0){
        self.htmlEle.find('li').eq(1).trigger('click');
      }
    });
    return item;
  };

  fn.getPageEle = function(index) {
    return $('<li><a href="javascript:void(0);" data="' + index + '">' + (index + 1) + '</a></li>');
  };

  $.Page = function(options) {
    return new Page(options);
  };
})($);