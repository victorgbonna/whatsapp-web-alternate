const cors        = require("cors");
const morgan      = require("morgan");
const config= require('./config/config')
const connectDB=require('./config/db')
const fs = require('fs');
const path=require('path')
const express     = require("express");
const client= require('./config/whatsapp')

// const {MessageMedia, Location, ClientInfo} = require('whatsapp-web.js');
// const {sendMessage,sendMedia, sendLocation, createGroup, getCommonGroups, convertTochatId, checkUser}=require('./modules/broadcast/service')
connectDB()
const qrcode = require('qrcode-terminal');
const broadcastApiRoute= require('./routes/api/broadcast');
const authApiRoute= require('./routes/api/auth');
// const { createBroadcast, arrangeCsvToObjArray, getAllBroadcast, getAllClientBroadcast, getBroadcastContacts } = require("./modules/broadcast/service");
// const { convertTochatId, sendMessage } = require("./modules/whatsapp/service");

const app = express();

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(morgan("dev"));
app.use(cors());

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
  // qrcode.generate(qr, { small: true }); // Add this line
  fs.writeFileSync("./tempStorage/last.qr", qr);
})
client.on('ready', () => {
  console.log('READY OR NOT, HERE I COME!');
  clientInfo= client.info
  console.log('client info', clientInfo)
});

client.on('authenticated',()=>{
  console.log('authentication succesfully. Yes')
  try {
    fs.unlinkSync("./tempStorage/last.qr");
  } catch (err) {}
})
client.on('auth_failure',(message)=>{
  console.log('auth failure reason being that ', message)
})
client.on('disconnected', ()=>{
  console.log('client is disconnected')
})
client.on('message', async (message) => {
  console.log(message.from , " : " , message.body );
})
app.use('/api/auth', authApiRoute)
app.use('/api/broadcast', broadcastApiRoute)

app.get("/login", (req, res) => {
  return res.render('login',{ title:'Login'})
})
const PORT = config.port;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`ERROR While Starting Server : ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

// function numberGuessFunc(msg, numberGuessed){
//   if(numberGuessed.length ==0){
//     return 5
//   }
//   let prevNumber=numberGuessed.shift()
//   let num1to10=[...Array(10).keys()].map(n=>n+1)
//   let remainingNums= num1to10.filter(n=>numberGuessed.indexOf(n)==-1)
//   let lesserNums=remainingNums.filter(n<prevNumber)
//   let higherNums=remainingNums.filter(n>prevNumber)
//   return msg=='lower'?lesserNums[Math.floor(Math.random()* lesserNums.length)]:higherNums[Math.floor(Math.random()* higherNums.length)] 
// }
// client.on('message', async (message) => {
//     console.log(message.from , " : " , message.body ); 
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
// app.get('/api/whatsapp/status', async(req,res)=>{
//   return res.json({
//     online:clientStatus
//   })
// })
 
// app.post('/api/send/message',async(req,res)=> {
//   try { 
//     console.log("Body shou",req.body);
//     const message =await sendMessage(client,req.body.phone,req.body.message);
//     return res.json({
//       status:"success",
//       message
//     })
//   } catch(err) {
//     console.log("Body",req.body);
//     console.log(err)
//     return res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });

// app.post('/api/send/location',async(req,res)=> {
//   try { 
//     console.log("Body",req.body);
//     const location=await sendLocation(client,req.body.phone,req.body.latitude,req.body.longtitude,req.body.description);
//     return res.json({
//       status:'successful',
//       location
//     })

//   } catch(err) {

//     console.log("Body",err);
//     res.json({ 
//       status  : "error",
//       message : err
//     });
//   }
// });

// app.post('/api/send/image', async(req,res)=> {
//   try { 
//     console.log("Body",req.body);
//     const media=await sendMedia(client,req.body.phone,req.body.mediaUrl ,req.body.caption);
//     return res.json({
//       status:'successful',
//       media
//     })
//   } catch(err) {
//     console.log("Body",req.body);
//     res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });


// create group
// app.post('/api/create/group', async(req,res)=> {
//   try { 
//     console.log("Body",req.body);
//     const group=await createGroup(client,req.body.title, req.body.participants);
//     return res.json({
//       status:'successful',
//       group
//     })
//   } catch(err) {
//     console.log({err});
//     res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });
// //set display name (not succesfull)
// app.post('/api/change/displayname', async(req,res)=> {
//   try { 
//     console.log("Body",req.body);
//     const hasChanged=await client.setDisplayName(req.body.displayName);
//     return res.json({
//       status:hasChanged?'successful':'unsuccessful',
//       hasChanged
//     })
//   } catch(err) {
//     console.log("Body",req.body);
//     res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });
// //set status (working)
// app.post('/api/set/status', async(req,res)=> {
//   try { 
//     console.log("Body",req.body);
//     const status=await client.setStatus(req.body.status);
//     console.log(status)
//     return res.json({
//       status:'successfully set status'
//     })
//   } catch(err) {
//     console.log("Body",req.body);
//     res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });

// //get common groups(contactId) with a mobile
// app.get('/api/groups/:mobile', async(req,res)=> {
//   try { 
//     // participant.id._serialized
//     const {mobile}= req.params
//     const commonGroups=await getCommonGroups(client,mobile);
//     // "234 8105463507@c.us"
//     return res.json({
//       status:'successful',
//       commonGroups
//     })
//   } catch(err) {
//     console.log({err});
//     res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });
// //search messages(query,options{page, limit}) (working)
// app.get('/api/messages', async(req,res)=> {
//   try { 
//     const {query="", page=3, limit=5}=req.query
//     // participant.id._serialized
//     const messages=await client.searchMessages(query,{page,limit});
//     return res.json({
//       status:'successful',
//       messages
//     })
//   } catch(err) {
//     console.log("Body",req.body);
//     res.json({ 
//       status  : "error",
//       message : err 
//     });
//   }
// });

//get logout (working)

//##################################################//
//                    SERVER                        //
//##################################################//

