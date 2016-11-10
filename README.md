# tor-test [![Build Status](https://travis-ci.org/sqreen/tor-test.svg?branch=master)](https://travis-ci.org/sqreen/tor-test)

Individuals can use Tor to prevent websites from tracking them or to access websites blocked by their local Internet 
providers. Journalists, dissidents, and non-governmental organizations all use Tor for sensitive communications or for 
bypassing laws in countries where the internet is tightly regulated by the government. These are what Tor was built for, 
and are only a fraction of the legitimate use cases for Tor.

> A user coming from Tor is between 6 and 8 times more likely to perform an attack.

![tor-risks](./cookbook/risk-image.png)

[Learn more on Sqreen Blog.](https://blog.sqreen.io/tor-the-good-the-bad-and-the-ugly/)

This module checks whether a specific ip address is a Tor exit node. In other words tor-test lets you know if a connection
to your Node.js application is coming from the Tor network.

## Installation

```sh
$ npm i -S tor-test
```
This will install the module and save it in your `package.json` as dependency.

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
* [Express: exclude Tor users](./cookbook/express.md)
* [hapi: exclude Tor users](./cookbook/express.md)
