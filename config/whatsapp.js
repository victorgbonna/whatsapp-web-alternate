const { Client, LocalAuth} = require('whatsapp-web.js');
// let isOnline=()=>{
//     return false
// }

// const client = new Client({
//   authStrategy: new LocalAuth()
// });
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer:{headless: true,
    args: ['--no-sandbox','--disable-setuid-sandbox']}
});
client.initialize();

module.exports= client
