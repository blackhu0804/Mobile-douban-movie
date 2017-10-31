var isToBottom = require('./isToEnd');

var usBox = (function() {
  function usbox() {
    this.$container = $('#beimei');
    this.$content = this.$container.find('.container');
    this.start();
  }

  usbox.prototype = {
    start : function() {
      var self = this;
      this.getData(function(data) {
        self.render(data);
      })
    },
    getData : function(callback) {
      var self = this;
      $.ajax({
        url: 'http://api.douban.com/v2/movie/us_box',
        type: 'GET',
        dataType: 'jsonp'
      }).done(function(ret){
        callback && callback(ret);
      }).fail(function(){
        console.log('数据异常')
      }).always(function() {
        
      })
    },
    render : function(data) {
      console.log(data)
      var self = this;
      data.subjects.forEach(function(movie) {
        self.$content.append(isToBottom.creatNode(movie.subject));
      })
    }
  }
  
  return {
    init : function() {
      new usbox();
    }
  }
})()

module.exports = usBox;