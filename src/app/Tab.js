var Tab = (function() {
  function tab(tabs, panels) {
    this.$tabs = tabs;
    this.$panels = panels;
    this.bind();
  }

  tab.prototype = {
    bind: function(){
      var _this = this;
      this.$tabs.on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
        _this.$panels.eq($(this).index()).fadeIn().siblings().hide();
      })
    }
  }

  return {
    init: function(tabs, panels) {
      new tab(tabs, panels);
    }
  }
})()

module.exports = Tab;