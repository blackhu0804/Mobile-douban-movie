var isToBottom = require('./isToEnd');

var Top250 = (function(){
  function top250() {
    this.$container = $('main #top250');
    this.$content = this.$container.find('.container');
    this.index = 0;
    this.isLoading = false;
    this.isFinish = false;
    this.bind();
    this.start();
  }

  top250.prototype = {
    bind : function() {
      var self = this;
      this.$container.scroll(function() {
        if(!self.isFinish && isToBottom.isToEnd(self.$container, self.$content)){
          self.start();	
        }
      })
    },
    start : function() {
      var self = this;
      this.getData(function(data) {
        self.render(data);
      })
    },
    getData : function(callback) {
      var self = this;
      if(self.isLoading)
        return;
      self.isLoading = true;
      self.$container.find('.loading').show();
      $.ajax({
        url: 'https://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
          start: self.index,
          count: 20
        },
        dataType: 'jsonp'
      }).done(function(ret){
        self.index += 20;
        if(self.index >= ret.total){
          self.isFinish = true;
        }
        callback&&callback(ret);
      }).fail(function(){
        console.log('数据异常')
      }).always(function() {
        self.isLoading = false;
        self.$container.find('.loading').hide();
      })
    },
    render : function(data) {
      var self = this;
      data.subjects.forEach(function(movie) {
        self.$content.append(isToBottom.creatNode(movie));
      })
    }
  }
  
  return {
    init: function() {
      new top250();
    }
  }
})()

module.exports = Top250;