/**
 * Copyright (c) 2016 Sqreen. All Rights Reserved.
 * Please refer to our terms for more information: https://www.sqreen.io/terms.html
 */
'use strict';
const Code = require('code');
const Lab = require('lab');
const lab = exports.lab = Lab.script();

const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const Proxyquire = require('proxyquire');

describe('module', () => {

    describe('fetch', () => {

        it('should call the API to get the list of the known exit nodes', { plan: 1 }, (done) => {

            const Fetch = Proxyquire('../index', {}).fetch;

            Fetch((err) => {

                expect(err).to.not.exist();
                done();
            });
        });
    });
});
