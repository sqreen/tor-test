'use strict';
const URL = 'http://xxx.sqreen.io/sqreen/v0/ips/tor/exit_nodes'; // TODO
const Get = require('./backend').get;

let STORE_V4 = new Set();
let STORE_V6 = new Set();

const getStore = module.exports.getStore = function (force, cb) {

    if (force || (STORE_V4.size === 0 && STORE_V6.size === 0)) {
        Get(URL, (err, payload) => {

            if (!err && !payload.list) {
                err = new Error('invalid response');
            }
            if (err) {
                return cb(err);
            }
            const v4 = payload.list.filter((item) => item.v === 4).map((item) => item.addr);
            const v6 = payload.list.filter((item) => item.v === 6).map((item) => item.addr).concat(v4.map((addr) => `::ffff:${addr}`));
            STORE_V4 = new Set(v4);
            STORE_V6 = new Set(v6);
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
        return cb(null, STORE_V4.has(ip) || STORE_V6.has(ip));
    });
};
