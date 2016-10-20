/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Store = require('./lib/store');
module.exports.fetch = Store.getStore.bind(null, true);

module.exports.isTor = Store.isInStore;
