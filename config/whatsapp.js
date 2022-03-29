const { Client, LocalAuth} = require('whatsapp-web.js');
// let isOnline=()=>{
//     return false
// }

// const client = new Client({
//   authStrategy: new LocalAuth()
// });
const client = new Client({
    authStrategy: new LocalAuth()
});
client.initialize();

module.exports= client
// client.on('qr', qr => {
//     console.log('QR RECEIVED', qr);
//     qrcode.generate(qr, { small: true });
//     const qrConnect=()=>{
//         return qr
//     }
// })
// client.on('authenticated',()=>{
//     console.log('authentication succesfully. Yes')
// })
// client.on('auth_failure',(message)=>{
//     console.log('auth failure reason being that ', message)
// })
// client.on('ready', () => {
//     console.log('READY OR NOT, HERE I COME!');
//     isOnline=()=>{
//         return true
//     }
// });
// client.on('disconnected', ()=>{
//     console.log('client is disconnected')
//      isOnline=()=>{
//         return false
//     }
// })

// module.exports = {
//   init
// };