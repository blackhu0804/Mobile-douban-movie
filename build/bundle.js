/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isToBottom = {
	isToEnd: function isToEnd($viewport, $content) {
		return $viewport.height() + $viewport.scrollTop() + 10 >= $content.height();
	},
	creatNode: function creatNode(movie) {
		var tpl = '\n\t\t<div class="item">\n\t\t\t<a href="#">\n\t\t\t\t<div class="cover">\n\t\t\t\t\t<img src="http://img7.doubanio.com/img/celebrity/small/17525.jpg" alt="">          \n\t\t\t\t</div>\n\t\t\t\t<div class="detail">\n\t\t\t\t\t<h2>\u9738\u738B\u522B\u59EC</h2>\n\t\t\t\t\t<div class="extra"><span class="score">9.3</span>\u5206 / <span class="collect"></span>\u6536\u85CF</div>\n\t\t\t\t\t<div class="extra"><span class="year"></span> / <span class="type"></span></div>\n\t\t\t\t\t<div class="extra">\u5BFC\u6F14\uFF1A<span class="director"></span></div>\n\t\t\t\t\t<div class="extra">\u4E3B\u6F14\uFF1A<span class="actor"></span></div>\n\t\t\t\t</div>\n\t\t\t</a>\n\t\t</div>\n\t\t';
		var $node = $(tpl);
		$node.find('a').attr('href', movie.alt);
		$node.find('.cover img').attr('src', movie.images.medium);
		$node.find('.detail h2').text(movie.title);
		$node.find('.detail .score').text(movie.rating.average);
		$node.find('.detail .collect').text(movie.collect_count);
		$node.find('.detail .year').text(movie.year);
		$node.find('.detail .type').text(movie.genres.join('/'));
		$node.find('.director').text(function () {
			var directorsArr = [];
			movie.directors.forEach(function (item) {
				directorsArr.push(item.name);
			});
			return directorsArr.join('、');
		});
		$node.find('.actor').text(function () {
			var actorArr = [];
			movie.casts.forEach(function (item) {
				actorArr.push(item.name);
			});
			return actorArr.join('、');
		});
		return $node;
	}
};

module.exports = isToBottom;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isToBottom = __webpack_require__(0);
var Tab = __webpack_require__(2);
var Top250 = __webpack_require__(3);
var usBox = __webpack_require__(4);
var Search = __webpack_require__(5);

Tab.init($('footer>div'), $('section'));
Top250.init();
usBox.init();
Search.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tab = function () {
  function tab(tabs, panels) {
    this.$tabs = tabs;
    this.$panels = panels;
    this.bind();
  }

  tab.prototype = {
    bind: function bind() {
      var _this = this;
      this.$tabs.on('click', function () {
        $(this).addClass('active').siblings().removeClass('active');
        _this.$panels.eq($(this).index()).fadeIn().siblings().hide();
      });
    }
  };

  return {
    init: function init(tabs, panels) {
      new tab(tabs, panels);
    }
  };
}();

module.exports = Tab;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isToBottom = __webpack_require__(0);

var Top250 = function () {
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
    bind: function bind() {
      var self = this;
      this.$container.scroll(function () {
        if (!self.isFinish && isToBottom.isToEnd(self.$container, self.$content)) {
          self.start();
        }
      });
    },
    start: function start() {
      var self = this;
      this.getData(function (data) {
        self.render(data);
      });
    },
    getData: function getData(callback) {
      var self = this;
      if (self.isLoading) return;
      self.isLoading = true;
      self.$container.find('.loading').show();
      $.ajax({
        url: 'http://api.douban.com/v2/movie/top250',
        type: 'GET',
        data: {
          start: self.index,
          count: 20
        },
        dataType: 'jsonp'
      }).done(function (ret) {
        self.index += 20;
        if (self.index >= ret.total) {
          self.isFinish = true;
        }
        callback && callback(ret);
      }).fail(function () {
        console.log('数据异常');
      }).always(function () {
        self.isLoading = false;
        self.$container.find('.loading').hide();
      });
    },
    render: function render(data) {
      var self = this;
      data.subjects.forEach(function (movie) {
        self.$content.append(isToBottom.creatNode(movie));
      });
    }
  };

  return {
    init: function init() {
      new top250();
    }
  };
}();

module.exports = Top250;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isToBottom = __webpack_require__(0);

var usBox = function () {
  function usbox() {
    this.$container = $('#beimei');
    this.$content = this.$container.find('.container');
    this.start();
  }

  usbox.prototype = {
    start: function start() {
      var self = this;
      this.getData(function (data) {
        self.render(data);
      });
    },
    getData: function getData(callback) {
      var self = this;
      $.ajax({
        url: 'http://api.douban.com/v2/movie/us_box',
        type: 'GET',
        dataType: 'jsonp'
      }).done(function (ret) {
        callback && callback(ret);
      }).fail(function () {
        console.log('数据异常');
      }).always(function () {});
    },
    render: function render(data) {
      console.log(data);
      var self = this;
      data.subjects.forEach(function (movie) {
        self.$content.append(isToBottom.creatNode(movie.subject));
      });
    }
  };

  return {
    init: function init() {
      new usbox();
    }
  };
}();

module.exports = usBox;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isToBottom = __webpack_require__(0);

var Search = function () {
  function search() {
    this.$container = $('#search');
    this.$content = this.$container.find('.search-result');
    this.keyword = '';
    this.bind();
    this.start();
  }

  search.prototype = {
    bind: function bind() {
      var self = this;
      this.$container.find('.button').click(function () {
        self.keyword = self.$container.find('input').val();
        self.start();
      });
    },
    start: function start() {
      var self = this;
      this.getData(function (data) {
        self.render(data);
      });
    },
    getData: function getData(callback) {
      var self = this;
      self.$container.find('.loading').show();
      $.ajax({
        url: 'http://api.douban.com/v2/movie/search',
        type: 'GET',
        data: {
          q: self.keyword
        },
        dataType: 'jsonp'
      }).done(function (ret) {
        callback && callback(ret);
      }).fail(function () {
        console.log('数据异常');
      }).always(function () {
        self.$container.find('.loading').hide();
      });
    },
    render: function render(data) {
      var self = this;
      console.log(data);
      data.subjects.forEach(function (movie) {
        self.$content.append(isToBottom.creatNode(movie));
      });
    }
  };

  return {
    init: function init() {
      new search();
    }
  };
}();

module.exports = Search;

/***/ })
/******/ ]);