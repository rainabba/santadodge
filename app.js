var express = require('express')
var app = express()
var socketio = require('socket.io')

var http = require('http')
var url= require('url');
var fs = require('fs');
var os = require('os');
app.use(express.static(__dirname))

var server = http.createServer(app)
io = socketio.listen(server)
server.listen(5000)
io.sockets.on('connection',connectionCB)


function connectionCB (socket) {
	
	
}