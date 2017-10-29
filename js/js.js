var Helper = {
	isToEnd: function($viewport, $content) {
		return $viewport.height() + $viewport.scrollTop() + 10 >= $content.height();
	},
	creatNode: function(movie) {
		var tpl = 
		`
		<div class="item">
			<a href="#">
				<div class="cover">
					<img src="http://img7.doubanio.com/img/celebrity/small/17525.jpg" alt="">          
				</div>
				<div class="detail">
					<h2>霸王别姬</h2>
					<div class="extra"><span class="score">9.3分</span> / <span class="collect"></span>收藏</div>
					<div class="extra"><span class="year"></span> / <span class="type"></span></div>
					<div class="extra">导演：<span class="director"></span></div>
					<div class="extra">主演：<span class="actor"></span></div>
				</div>
			</a>
		</div>
		`
		var $node = $(tpl);
		$node.find('a').attr('href', movie.alt);
		$node.find('.cover img').attr('src',movie.images.medium);
		$node.find('.detail h2').text(movie.title);
		$node.find('.detail .score').text(movie.rating.average);
		$node.find('.detail .collect').text(movie.collect_count);
		$node.find('.detail .year').text(movie.year);
		$node.find('.detail .type').text(movie.genres.join('/'))
		$node.find('.director').text(function() {
			var directorsArr = [];
			movie.directors.forEach(function(item) {
				directorsArr.push(item.name);
			})
			return directorsArr.join('、');
		})
		$node.find('.actor').text(function() {
			var actorArr = [];
			movie.casts.forEach(function(item) {
				actorArr.push(item.name);
			})
			return actorArr.join('、');
		})
		return $node;
	}
}


var top250 = {
	init : function() {
		this.$container = $('#top250');
		this.$content = this.$container.find('.container');
		this.index = 0;
		this.isLoading = false;
		this.isFinish = false;
		this.bind();
		this.start();
	},
	bind : function() {
		var self = this;
		this.$container.scroll(function() {
			if(!self.isFinish && Helper.isToEnd(self.$container, self.$content)){
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
			url: 'http://api.douban.com/v2/movie/top250',
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
			self.$content.append(Helper.creatNode(movie));
		})
	}
}

var usBox = {
	init : function() {
		this.$container = $('#beimei');
		this.$content = this.$container.find('.container');
		this.start();
	},
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
			self.$content.append(Helper.creatNode(movie.subject));
		})
	}
}

var search = {
	init : function() {
		this.$container = $('#search');
		this.$content = this.$container.find('.search-result');
		this.keyword = '';
		this.bind()
		this.start();
	},
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
			url: 'http://api.douban.com/v2/movie/search',
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
			self.$content.append(Helper.creatNode(movie));
		})
	}
}


var app = {
	init: function() {	
		this.$tabs = $('footer>div');
		this.$panels = $('section');
		this.bind();
		
		top250.init();
		usBox.init();
		search.init();
	},
	bind: function() {
		var self = this;
		this.$tabs.on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
			self.$panels.eq($(this).index()).fadeIn().siblings().hide();
		})	
	}
}
app.init();
