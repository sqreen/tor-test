# tor-test [![Build Status](https://travis-ci.org/sqreen/tor-test.svg?branch=master)](https://travis-ci.org/sqreen/tor-test)


Tor-test checks if a specific ip address is a Tor exit node.

## Installation

```sh
$ npm i -S tor-test
```

## Usage

```js
const TorTest = require('tor-test');

TorTest.isTor('127.0.0.1', (err, isTor) => {

    // isTor is true
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
    

## Cookbook

A cookbook is available for this module:
* [Usage with Express to exclude Tor users](./cookbook/express.md)
