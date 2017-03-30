var express = require('express');
var app = express();
app.use(express.static('public'));
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(http);

io.on('connection', function(socket){
	console.log('New connection');

	socket.on('move', function(msg){
		socket.broadcast.emit('move', msg);
	});
});

http.listen(port, function(){
	console.log('Listening on port ' + port + '...');
});
