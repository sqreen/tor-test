'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const afterEach = lab.afterEach;
const beforeEach = lab.beforeEach;

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Decache = require('decache');

describe('store', () => {

    beforeEach((done) => {

        Decache('wreck');
        Decache('../../lib/store');
        done();
    });

    afterEach((done) => {

        Decache('wreck');
        Decache('../../lib/store');
        done();
    });

    describe('getStore', () => {

        it('should handle a malformed payload response', { plan: 1 }, (done) => {

            const Wreck = require('wreck');
            Wreck.get = function (url, options, cb) {

                return cb(null, { statusCode: 200 },{
                    date: new Date()
                });
            };

            const Store = require('../../lib/store');
            Store.getStore(false, (err) => {

                expect(err).to.exist();
                done();
            });
        });

        it('should not reload if there is no ipv6 in store', { plan: 2 }, (done) => {

            const Wreck = require('wreck');
            Wreck.get = function (url, options, cb) {

                return cb(null, { statusCode: 200 },{
                    date: new Date(),
                    list: [
                        {
                            v: 6,
                            addr: '::1'
                        }
                    ]
                });
            };
            const Store = require('../../lib/store');
            Store.getStore(false, (err) => {

                expect(err).to.not.exist();
                Store.getStore(false, (err2) => {

                    expect(err2).to.not.exist();
                    done();
                });
            });
        });
    });

    describe('isInStore', () => {

        it('should fetch the store from the API, then keep it in cache', { plan: 6 }, (done) => {

            const Wreck = require('wreck');
            Wreck.get = function (url, options, cb) {

                expect(url).to.equal('http://sqreen-tor.s3-website-eu-west-1.amazonaws.com/sqreen/v0/ips/tor/exit_nodes');
                expect(options).to.equal({ headers: { accept: 'application/json' }, json: true });
                return cb(null, { statusCode: 200 },{
                    date: new Date(),
                    list: [
                        {
                            v: 4,
                            addr: '127.0.0.1'
                        },
                        {
                            v: 6,
                            addr: '::1'
                        }
                    ]
                });
            };

            const Store = require('../../lib/store');
            Store.isInStore(':ffff:127.0.0.1', true, (err, res) => {

                expect(err).to.not.exist();
                expect(res).to.be.true();

                Store.isInStore('127.0.0.2', (err, res2) => {

                    expect(err).to.not.exist();
                    expect(res2).to.be.false();
                    done();
                });
            });
        });

        it('should fetch the store from the API, then keep it in cache and override the cache if forced', { plan: 8 }, (done) => {

            const Wreck = require('wreck');
            Wreck.get = function (url, options, cb) {

                expect(url).to.equal('http://sqreen-tor.s3-website-eu-west-1.amazonaws.com/sqreen/v0/ips/tor/exit_nodes');
                expect(options).to.equal({ headers: { accept: 'application/json' }, json: true });
                return cb(null, { statusCode: 200 },{
                    date: new Date(),
                    list: [
                        {
                            v: 4,
                            addr: '127.0.0.1'
                        },
                        {
                            v: 6,
                            addr: '::1'
                        }
                    ]
                });
            };

            const Store = require('../../lib/store');
            Store.isInStore('127.0.0.1', (err, res) => {

                expect(err).to.not.exist();
                expect(res).to.be.true();

                Store.isInStore('127.0.0.2', true, (err, res2) => {

                    expect(err).to.not.exist();
                    expect(res2).to.be.false();
                    done();
                });
            });
        });

        it('should fetch the store from the API when an error happens', { plan: 2 }, (done) => {

            const Wreck = require('wreck');
            Wreck.get = function (url, options, cb) {

                expect(url).to.equal('http://sqreen-tor.s3-website-eu-west-1.amazonaws.com/sqreen/v0/ips/tor/exit_nodes');
                return cb(new Error('something'));
            };

            const Store = require('../../lib/store');
            Store.isInStore('127.0.0.1', true, (err) => {

                expect(err).to.exist();

                done();
            });
        });

        it('should fetch the store from the API when a given interval of day from last API call is passed', { plan: 9 }, (done) => {

            const Wreck = require('wreck');
            const now = new Date();
            const dateInPast = now.setDate(now.getDate() - 10);
            Wreck.get = function (url, options, cb) {

                expect(url).to.equal('http://sqreen-tor.s3-website-eu-west-1.amazonaws.com/sqreen/v0/ips/tor/exit_nodes');
                expect(options).to.equal({ headers: { accept: 'application/json' }, json: true });
                return cb(null, { statusCode: 200 },{
                    date: dateInPast,
                    list: [
                        {
                            v: 4,
                            addr: '127.0.0.1'
                        },
                        {
                            v: 6,
                            addr: '::1'
                        }
                    ]
                });
            };

            const Store = require('../../lib/store');
            Store.refreshStoreOlderThan(8 ,(err) => {

                expect(err).to.not.exist();
                Store.isInStore('127.0.0.1', (err, res) => {

                    expect(err).to.not.exist();
                    expect(res).to.be.true();
                    Store.isInStore('127.0.0.2', true, (err, res2) => {

                        expect(err).to.not.exist();
                        expect(res2).to.be.false();
                        done();
                    });
                });
            });

        });

        it('should return an error if wrong type is passed to refreshStoreOlderThan', { plan: 1 }, (done) => {

            const Store = require('../../lib/store');
            Store.refreshStoreOlderThan('not a number',(err) => {

                expect(err).to.exist();
                done();
            });

        });
    });
});
