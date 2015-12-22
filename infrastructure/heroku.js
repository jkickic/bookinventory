var heroin = require('heroin-js');

var configurator = heroin(process.env.HEROKU_API_TOKEN, {debug: false});

/*configurator.export('bookinventory').then(function(result) {
    console.log(result);
});*/

var baseConf = { name: 'bookinventorytest',
    region: 'eu',
    maintenance: false,
    stack: 'cedar-14',
    config_vars:
    { MONGO_URL: 'mongodb://heroku_4x78mgjj:5c76vmaot6lpjfdubl2k6f1qc4@ds033285.mongolab.com:33285/heroku_4x78mgjj',
        PORT: '3000' },
    addons: {},
    collaborators:
        [ 'mateusz.zajac@schibsted.pl',
            'krzysiek.jakubik@gmail.com',
            'marek.wojtaszek@schibsted.pl',
            'julian.ludwikowski@schibsted.pl'],
    features:
    { 'runtime-dyno-metadata': { enabled: false },
        'log-runtime-metrics': { enabled: false },
        'http-session-affinity': { enabled: false },
        preboot: { enabled: false },
        'http-shard-header': { enabled: false },
        'http-end-to-end-continue': { enabled: false } },
    formation: [ { process: 'web', quantity: 1, size: 'Free' } ],
    log_drains: [] };

var prodConf = {
    name: 'bookinventory',
};

configurator(process.env.NODE_ENV === 'production' ? Object.assign(baseConf, prodConf) : baseConf);


