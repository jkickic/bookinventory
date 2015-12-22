module.exports = function(connection) {
    return {
        findAll: function() {
            return connection.then(function(db) {
                // throw new Error('test error');
                return db.collection('booksmz').find({}).toArray();
            }).catch(function(err) {
                console.log('catch err: ', err);
                return res.send('catch err');
            });
        },
        stockUp: function(isbn, count) {
            connection.then(function(db) {
                return db.collection('booksmz').updateOne({isbn: isbn}, {
                    isbn: isbn,
                    count: count
                }, {upsert: true});
            });
        },
        getCount: function(isbn) {
            return connection.then(function(db) {
                isbn = parseInt(isbn, 10);

                return db.collection('booksmz').find({isbn: isbn}).limit(1).next();
            }).then(function(result) {
                return result.count;
            }).catch(function(err) {
                console.log('catch err: ', err);
                return res.send('catch err');
            });
        }
    };
};