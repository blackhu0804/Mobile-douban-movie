var isToBottom = require('./isToEnd');

var Search = (function() {
  function search() {
    this.$container = $('#search');
		this.$content = this.$container.find('.search-result');
		this.keyword = '';
		this.bind()
		this.start();
  }

  search.prototype = {
    bind : function() {
      var self = this;
      this.$container.find('.button').click(function() {
        self.keyword = self.$container.find('input').val();
        self.start();
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
      self.$container.find('.loading').show();
      $.ajax({
        url: 'https://api.douban.com/v2/movie/search',
        type: 'GET',
        data: {
          q: self.keyword
        },
        dataType: 'jsonp'
      }).done(function(ret){
        callback && callback(ret)
      }).fail(function(){
        console.log('数据异常')
      }).always(function() {
        self.$container.find('.loading').hide();
      })
    },
    render : function(data) {
      var self = this;
      console.log(data)
      data.subjects.forEach(function(movie) {
        self.$content.append(isToBottom.creatNode(movie));
      })
    }
  }
  
  return {
    init : function() {
      new search();
    }
  }
})()

module.exports = Search;

