# Update exit nodes list daily

To update the list of the exit nodes, simply refresh it every 8.64*10^7 ms:

```js
const TorTest = require('tor-test');
setInterval(() => {
    
    TorTest.fetch();
}, 8.64e7);

```

