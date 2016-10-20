'use strict';
const Wreck = require('wreck');

module.exports.get = function (url, cb) {

    return Wreck.get(url, { headers: { accept: 'application/json' }, json: true }, (err, res, payload) => {

        if (!err && res.statusCode !== 200) {
            err = new Error(res.statusMessage);
        }
        return cb(err, payload);
    });
};
