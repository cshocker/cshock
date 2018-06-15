var net = require('net');

var Server = {};

const port = process.env.OPENSHIFT_NODEJS_PORT || 8080
const ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

function setClient(socket){
	Server.next(socket);
}

Server.setHer = function(socket){
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
}

Server.setMe = function (socket){
	Server.me = socket;
	Server.next = Server.setHer;
	socket.pipe(socket);
}

Server.next = Server.setMe;

var myServer = net.createServer(setClient);


myServer.listen(port,ip);

