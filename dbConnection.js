"use strict";

module.exports = function(){
    let MongoClient = require('mongodb').MongoClient,
        url = process.env.MONGO_URL,
        dbConnection = MongoClient.connect(url);

    return dbConnection;
}