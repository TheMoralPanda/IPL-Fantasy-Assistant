var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var webhook = require('./routes/webhook');
const token = "EAAaSG2aET7wBAOxs7wiCqYF52jYX7lpsnyUEBTP2FtHSIVo4n85fiCvh0kzNNO8QY9YHVxZCChX7ZBmeHzlO2pFpbCmC7yt9LqSTHDRN5pDBBD0Dtqc1tr1XdwDemek2W9nQx0Wkm0ZBZB55lKkMdhgLZAiX7hoBD3szcuicYLAZDZD";
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


/* GET users listing. */
app.get('/webhook', function (req, res) {
	if (req.query['hub.verify_token'] === 'IPL_Fantasy_BOT_VERIFY_TOKEN') {
	  res.send(req.query['hub.challenge']);
	} else {
	  res.send('Error, wrong validation token');    
	}
});
app.post('/webhook', function(req, res){
	var msg_events = req.body.entry[0].messaging
	for(var i =0;i<msg_events.length;i++){
		var event = req.body.entry[0].messaging[i]
		var sender = event.sender.id
		if(event.message && event.message.text){
			var text = event.message.text
			sendTextMessage(sender, "Text received, echo: "+text.substring(0,200))
		}
	}
	res.sendStatus(200)

})

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
