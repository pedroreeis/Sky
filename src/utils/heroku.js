let pings = 0;
setInterval(() => {
  pings++;
  
  require('node-fetch')('https://skydiscord-web.glitch.me/').then(() => console.log(`[${pings}] Pingado`));
}, 5 * 60 * 1000);
