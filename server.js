"use strict";

module.exports = function (express){
    var app = express(),
        bodyParser = require('body-parser'),
        assert = require('assert'),
        MongoClient = require('mongodb').MongoClient,
        url = 'mongodb://localhost:27017/bookinventory',
        dbConnection = MongoClient.connect(url);

    app.use(bodyParser.json());


    var logRequest = function (req, res, next) {
        console.log('Time:', Date.now());
        next();
    };

    app.post('/stock', (req,res) => {
        let isbn = req.body.isbn,
            count = req.body.count;

        dbConnection.then((db) => {
            return db.collection('books').updateOne({isbn: isbn}, {
                isbn: isbn,
                count: count
            }, {upsert:true});
        }).then(code =>{
            console.log(code);
            res.json({success:"success"});
        });
    });

    app.get('/books', (req,res) => {

        dbConnection.then(db => {
            return db.collection('books').find({}).toArray();
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.send('error');
        })
    });

    app.get('/', logRequest, (req, res) => {
        res.send('Hello World!');
    });


    var serverError = function (err, req, res, next) {
        console.error(err.stack);
        res.status(err.status || 500).json({
            message: err.message,
            error: (process.env.NODE_ENV === 'production') ? {} : err
        })
    };

    var clientError = function (req, res, next) {
        console.log('404!');
        res.status(404).send('Sorry cant find that!');
    };

    app.use(serverError);
    app.use(clientError);

    return {
        listen: (port) => {
                return app.listen(port, () => console.log(`Server running on port ${port}`))
        }
    }
};



