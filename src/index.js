var isToBottom = require('./app/isToEnd');
var Tab = require('./app/Tab');
var Top250 = require('./app/Top250');
var usBox = require('./app/usBox');

Tab.init($('footer>div'), $('section'));
Top250.init();
usBox.init();