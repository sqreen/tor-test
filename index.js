/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Store = require('./lib/store');
module.exports.fetch = function (cb) {

    Store.getStore(true, cb);
};

module.exports.isTor = Store.isInStore;
