const express = require('express')
const router = express.Router()
const client= require('../../config/whatsapp')
const {sendMessage,sendMedia, sendLocation, createGroup, 
    getCommonGroups, convertTochatId, checkUser}=require('../../modules/broadcast/service')
const qrcode = require('qrcode-terminal');
// const {addProduct,getProducts}=require('../../modules/product/service')
// const Product = require('../../modules/product/model')
// const upload = require('../../config/image')

// const { Client, LocalAuth} = require('whatsapp-web.js');

// let clientStatus= false
// let qrCodedata

// const client = new Client({
//   authStrategy: new LocalAuth()
// });

// client.initialize();

// client.on('qr', qr => {
//     console.log('QR RECEIVED again', qr);
//     qrCodedata=qr
//     qrcode.generate(qr, { small: true });
    
// })
// client.on('authenticated',()=>{
//     console.log('authentication succesfully again. Yes')
// })
// client.on('auth_failure',(message)=>{
//     console.log('auth failure reason being that ', message)
// })
// client.on('ready', () => {
//     console.log('READY OR NOT, HERE I COME! again');
//     clientStatus=true
// });
// client.on('disconnected', ()=>{
//     console.log('client is disconnected')
//     clientStatus= false
// })
function numberGuessFunc(msg, numberGuessed){
    if(numberGuessed.length ==0){
      return 5
    }
    let prevNumber=numberGuessed.shift()
    let num1to10=[...Array(10).keys()].map(n=>n+1)
    let remainingNums= num1to10.filter(n=>numberGuessed.indexOf(n)==-1)
    let lesserNums=remainingNums.filter(n<prevNumber)
    let higherNums=remainingNums.filter(n>prevNumber)
    return msg=='lower'?lesserNums[Math.floor(Math.random()* lesserNums.length)]:higherNums[Math.floor(Math.random()* higherNums.length)] 
  }

//     let count=0
//     if (message.body.toLowerCase()=='senior man'){
//         count++
//         await message.reply('Thanks for your messages, I will reply when I am not a bot 😃. In the meantime, think of a number between 1-10')
//     }
//     if(count && message.body.toLowerCase=="ok I have done so gee"){
//       let tirednessLevel=4
//       let numbersGuessed=[]
      
//       while( tirednessLevel && message.body.toLowerCase!=="yes that is it"){
//         let msg=message.body.toLowerCase
//         if(!['higher','lower'].includes(msg)){
//           await client.sendMessage('Invalid response, can we please go back to the game?')
//         }
//         else{
//           let newNumber=numberGuessFunc(msg,numbersGuessed)
//           await client.sendMessage(message.from, 'it should be '+newNumber)
//           numbersGuessed.unshift()
//           tirednessLevel--
//         }

//       }
//       if(!tirednessLevel){
//         await client.sendMessage(message.from, "I am out of guesses")
//         count=0  
//       }
//       await client.sendMessage(message.from, "Nice knowing")
//       count=0
//     }
// });

router.get('/qrCode', async(req,res)=>{
    return res.json({
        status:"successfull",
        qr: qrCodedata
    })
})


router.post('/send/message',async(req,res)=> {
    try { 
      console.log("Body shou",req.body);
      const message =await sendMessage(client,req.body.phone,req.body.message);
      return res.json({
        status:"success",
        message
      })
    } catch(err) {
      console.log("Body",req.body);
      console.log(err)
      return res.json({ 
        status  : "error",
        message : err 
      });
    }
});
  
router.post('/send/location',async(req,res)=> {
    try { 
      console.log("Body",req.body);
      const location=await sendLocation(client,req.body.phone,req.body.latitude,req.body.longtitude,req.body.description);
      return res.json({
        status:'successful',
        location
      })
  
    } catch(err) {
  
      console.log("Body",err);
      res.json({ 
        status  : "error",
        message : err
      });
    }
});
router.post('/api/send/image', async(req,res)=> {
    try { 
      console.log("Body",req.body);
      const media=await sendMedia(client,req.body.phone,req.body.mediaUrl ,req.body.caption);
      return res.json({
        status:'successful',
        media
      })
    } catch(err) {
      console.log("Body",req.body);
      res.json({ 
        status  : "error",
        message : err 
      });
    }
});
module.exports=router