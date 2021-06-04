var express = require('express');
var app = express();
var http = require('http').Server(app)
var io = require('socket.io')(http)
var port = 3500

io.on("connection", socket => {
    socket.on("voteEventTrump", vote => {
        io.emit("newVoteTrump", vote);
    });

    socket.on("voteEventClinton", vote => {
        io.emit("newVoteClinton", vote);
    })
});

http.listen(port, () => {
    console.log('Server is running at port: 3500!')
})