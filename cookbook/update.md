# Update exit nodes list daily

To update the list of the exit nodes, simply refresh it every 8.64*10^7 ms:

```js
const TorTest = require('tor-test');
const refresh = setInterval(() => {
    
    TorTest.fetch();
}, 8.64e7);

refresh.unref(); // unref the timer to prevent it from blocking the server. (http://nodejs.org/dist/latest-v6.x/docs/api/timers.html#timers_timeout_unref)
```

