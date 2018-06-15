var net = require('net');

var Server = {};

var myServer = net.createServer(function(socket) {
	Server.me = socket;
	socket.pipe(socket);	
});

myServer.listen(781, '85.25.199.86');



var herServer = net.createServer(function(socket) {
	Server.her = socket;
	socket.pipe(socket);	

	Server.her.on('data', function(data) {
		console.log("her:"+data);
		Server.me.write(data);
	});

	Server.me.on('data', function(data) {
		console.log("me:"+data);
		Server.her.write(data);
	});

	Server.her.on('close', function() {
		console.log("her connection closed");
	});

	Server.me.on('close', function() {
		console.log("my connection closed");
	});
});

herServer.listen(782, '85.25.199.86');
