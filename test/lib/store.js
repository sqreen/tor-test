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

                expect(url).to.equal('http://xxx.sqreen.io/sqreen/v0/ips/tor/exit_nodes');
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
            Store.isInStore('127.0.0.1', true, (err, res) => {

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

                expect(url).to.equal('http://xxx.sqreen.io/sqreen/v0/ips/tor/exit_nodes');
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

                expect(url).to.equal('http://xxx.sqreen.io/sqreen/v0/ips/tor/exit_nodes');
                return cb(new Error('something'));
            };

            const Store = require('../../lib/store');
            Store.isInStore('127.0.0.1', true, (err) => {

                expect(err).to.exist();

                done();
            });
        });
    });
});
