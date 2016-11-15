'use strict';
const URL = 'http://sqreen-tor.s3-website-eu-west-1.amazonaws.com/sqreen/v0/ips/tor/exit_nodes';
const Get = require('./backend').get;
const Ip = require('ip');

let STORE_V4 = [];
let STORE_V6 = [];

const getStore = module.exports.getStore = function (force, cb) {

    if (force || (STORE_V4.length === 0 && STORE_V6.length === 0)) {
        Get(URL, (err, payload) => {

            if (payload && !payload.list) {
                try {
                    payload = JSON.parse(payload);
                }
                catch (_) {}
            }
            if (!err && !payload.list) {
                err = new Error('invalid response');
            }
            if (err) {
                return cb(err);
            }
            STORE_V4 = payload.list.filter((item) => item.v === 4).map((item) => item.addr);
            STORE_V6 = payload.list.filter((item) => item.v === 6).map((item) => item.addr);
            return cb(null);
        });
    }
    else {
        // keep this async
        setImmediate(() => cb(null));
    }
};

module.exports.isInStore = function (ip, /*force,*/ cb) {

    let force = false;
    if (arguments.length > 2) {
        force = arguments[1];
        cb = arguments[2];
    }
    getStore(force, (err) => {

        if (err) {
            return cb(err, false);
        }
        const hasV4 = !!STORE_V4.find((x) => Ip.isEqual(x, ip));
        const hasV6 = !!STORE_V6.find((x) => Ip.isEqual(x, ip));
        return cb(null, hasV4 || hasV6);
    });
};
