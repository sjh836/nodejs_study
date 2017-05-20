var app = require('express')();
var server = require('http').createServer(app);
var socket = require('socket.io')(server);

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html');
});

socket.on('connection', function(child) {
	console.log('접속함');

	child.on('chatClient', function(data) {
		console.log(data);

		socket.emit('chatServer', data); //child.emit 을하면 그 클라이언트와만 통신한다
	});

	child.on('disconnect', function() {
		console.log('접속끊음');
	});
});

server.listen(3000, function() {
	console.log('hello 노드소켓 world');
});
