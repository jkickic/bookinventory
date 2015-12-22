"use strict";

let request = require('supertest'),
    myServer = require('../server.js'),
    express = require('express');

describe('Book Inventory', function () {

    let server;

    beforeEach(()=> {
        server = myServer(express).listen(3000);
    });

    it('200 get', (done) => {
        request(server)
            .get("/")
            .expect(200, done)
    });



});