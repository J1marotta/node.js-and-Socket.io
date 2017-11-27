var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {"Content-Type": "text/html"});
		res.end(content);
	});
});

// Loading socket.io
var io = require('socket.io').listen(server);

// io.sockets handles everything socket related
io.sockets.on('connection', function(socket) {

	// tell the clients they connected
	socket.emit('message', 'You are connected!');

	// when a user is added this is a broadcast to all connections
	socket.broadcast.emit('message', 'Another client has connected!');


	// In this example, we store the data in a variable in the client's socket object (remember, the server stores one socket object for each client).

	// socket.myvariable = myvariable;
	// console.log(socket.myvariable);
	// the username is saved as a session variable
		socket.on('usernameMess', function(username) {
		socket.username = username;
	});

	// this one controls the message from the button
	socket.on('message', function(message) {
		console.log(socket.username + " " + "said " + message);
	});
});


/// localhost 8080
server.listen(8080);
