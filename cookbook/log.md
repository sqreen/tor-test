# Log all connections from Tor

This method is framework agnostic (it will work with hapi, Express, Koa, Restify, ...):

```js
// `server` is the Node.js http Server

server.on('request', (req) => {
    
    const ipAddr = req.connection.remoteAddress;
        TorTest.isTor(ipAddr, (err, isTor) => {
    
            if (err) { 
                console.error(err);
                return ;
             }
            if (isTor) {
                console.log(`Tor connection from ${ipAddr}`);
            }
        });
});

```
