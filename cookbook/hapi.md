# hapi: exclude Tor users

We will add an extension event on every request to filter Tor exit nodes.

```js
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({ port: 80 });

server.ext('onRequest', function (request, reply) {

    TorTest.isTor(request.raw.req.connection.remoteAddress, (err, isTor) => {

        if (err) { return reply(err); }
        if (isTor) {
            return reply(new Error('Tor user'));
        }
        return reply.continue();
    });
});
```
This will filter all requests accepted by the server. If the client's IP address is known to be a Tor exit node, 
an error will be created. The response to the client will be an internal error.

