'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Proxyquire = require('proxyquire');

describe('backend', () => {

    describe('get', () => {

        it('should return an error', { plan: 1 }, (done) => {

            const Backend = Proxyquire('../../lib/backend', {
                wreck: {
                    get: function (url, options, cb) {

                        return cb(null, { statusCode: 500 });
                    }
                }
            });
            Backend.get('any', (err) => {

                expect(err).to.exist();
                done();
            });
        });

        it('should return an error', { plan: 1 }, (done) => {

            const Backend = Proxyquire('../../lib/backend', {
                wreck: {
                    get: function (url, options, cb) {

                        return cb(null, { statusCode: 500, statusMessage: 'internal error' });
                    }
                }
            });
            Backend.get('any', (err) => {

                expect(err).to.exist();
                done();
            });
        });
    });
});

