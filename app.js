var server = require('./server.js'),
    express = require('express'),
    port = process.env.PORT;

server(express).listen(port);