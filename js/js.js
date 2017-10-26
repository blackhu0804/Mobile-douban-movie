$('footer>div').click(function (){
	var index = $(this).index()
	$('section').hide().eq(index).fadeIn()
	$(this).addClass('active').siblings().removeClass('active')
})

$.ajax({
	url: 'http://api.douban.com/v2/movie/top250',
	type: 'GET',
	data: {
		start: 0,
		connt: 20
	},
	dataType: 'jsonp'
}).done(function(ret){
	console.log(ret)
	setData(ret)
}).fail(function(){
	console.log('err..')
})

function setData(data){
	data.subjects.forEach(function(movie) {
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
		$('section').eq(0).append($node);
	})
}