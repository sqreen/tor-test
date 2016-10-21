# Express: exclude Tor users

The plan here is to build a middleware that will systematically answer with errors if the connection comes from 
a Tor exit node.

```js
const Express = require('express');
const TorTest = require('tor-test');
const app = Express();

app.use((req, res, next) => {

    TorTest.isTor(req.connection.remoteAddress, (err, isTor) => {
        
        if (err) { return next(err); }
        if (isTor) { 
            return next(new Error('Tor user')); 
        }
        return next();
    });
});
```
This middleware will apply on all requests accepted by the server. If the client's IP address is known to be a Tor exit node, 
an error will be created. The response to the client will be an internal error.

