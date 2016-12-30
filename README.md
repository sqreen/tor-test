# tor-test [![Build Status](https://travis-ci.org/sqreen/tor-test.svg?branch=master)](https://travis-ci.org/sqreen/tor-test)

This module checks whether a specific ip address is a Tor exit node. In other words tor-test lets you know if a connection
to your Node.js application is coming from the Tor network.

[See associated blogpost](https://blog.sqreen.io/identify-tor-connections-node-js-tor-test/).

## Installation

```sh
$ npm i -S tor-test
```
This will install the module and save it in your `package.json` as dependency.

## Usage

```js
const TorTest = require('tor-test');

TorTest.isTor('127.0.0.1', (err, isTor) => {

    // isTor is false
});
```

## API

### fetch(callback):

This methods feeds the cache of the module with a list of Tor exit nodes.
It takes 1 parameter:
* `callback`: a function which signature is `function (err)` where `err` is an `Error` or `null`.

```js
const TorTest = require('tor-test');

TorTest.fetch((err) => ...)
```

### isTor(addr, [force], callback):

This method is used to check if an IP address is a Tor exit node.
If `fetch` has not been called before, it will be called at the first call of `isTor`.
It takes 3 arguments:
* `addr`: a string representing the IP address to test
* `force`: a boolean, optional, if present and set to `true`, it will force a reload of the cached Tor exit node list.
* `callback`: a function which signature is `function (err, result)` where:
    * `err` is an `Error` or `null`
    * `result` is a boolean. It will equal `true` is `addr` is the address of a Tor exit node
    
### refreshStoreOlderThan(days, callback):

This method set the maximum days elapsed before an automatic reload of the Tor node exit node list.
* `days`: a number representing the maximum of days before an automatic reload of the Tor exit node node list.
* `callback`: a function which signature is `function (err)` where `err` is an `Error` or `null`.

## Cookbook

A cookbook is available for this module:
* [Log all connections from Tor](./cookbook/log.md) (framework agnostic)
* [Update the exit nodes list daily](./cookbook/update.md)
* [Express: exclude Tor users](./cookbook/express.md)
* [hapi: exclude Tor users](./cookbook/hapi.md)

