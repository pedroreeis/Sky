let pings = 0;
setInterval(() => {
  pings++;
  
  require('node-fetch')('https://zaddsite.herokuapp.com').then(() => console.log(`[${pings}] Pingado`));
}, 5 * 60 * 1000);
