"use strict";

module.exports = function (express){
    var app = express(),
        bodyParser = require('body-parser'),
        dbConnection = require('./dbConnection')(),
        repo = require('./booksRepository')(dbConnection),
        routes = require('./routes')(repo);

    var logTime = function(req, res, next){
        console.log(new Date());
        next();
    }

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


    app.use(bodyParser.json());

    app.post('/stock', routes.stockUp);

    app.get('/', routes.index);
    app.get('/books/:isbn', routes.getCount);
    app.get('/books/', routes.findAll);
    app.get('/log', logTime, routes.log);
    app.get('/nolog', routes.nolog);

    app.use(serverError);
    app.use(clientError);

    return {
        listen: (port) => {
                return app.listen(port, () => console.log(`Server running on port ${port}`))
        }
    }
};



