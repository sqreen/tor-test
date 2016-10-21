'use strict';
const Store = require('./lib/store');
module.exports.fetch = Store.getStore.bind(null, true);

module.exports.isTor = Store.isInStore;
