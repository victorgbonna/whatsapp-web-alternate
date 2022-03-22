require("dotenv").config();
const cors        = require("cors");
const morgan      = require("morgan");
const fs = require('fs');
const express     = require("express");
const { Client} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
// const { sendMessage, getQRcode} = require("./services");

// const { sendMessage}    = require('./')

const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(morgan("dev"));
app.use(cors());


const client = new Client();

client.initialize();

//##################################################//
//                    Functions                        //
//##################################################//
function sendMessage(mobile,message){
  let chatId;
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  if( isNaN(parseInt(mobile[0])) ){
       chatId = mobile.slice(1) +  "@c.us"; // chatID is used for sending messages
  }else{
       chatId = mobile + "@c.us";
  }
  console.log("sendMessage(",mobile,message,")");
  
  return new Promise((resolve,reject)=>{
       // Sending message.
      client.isRegisteredUser(chatId).then(function(isRegistered) {
          if(isRegistered) {
              client.sendMessage(chatId, message);
              resolve(" Sent ");
          }else{
              reject(" Not a registered User !!");
          }
      });  
  });
}
client.on('ready', () => {    
    console.log('Client is ready!');    
});

client.on('message', message => {
    console.log(message.from , " : " , message.body ); 
    if (message.body.toLowerCase()=='senior man'){
        message.reply('Thanks for your messages, I will reply when I am not a bot 😃')
    }
});

//##################################################//
//                    Routes                        //
//##################################################//
app.get("/", (req, res) => {
  res.json({
    status  : "success",
    message : "API is working !!",
  });
});


app.get("/api/qrcode", (req, res) => {
    console.log('yes')
    client.on('qr', qr => {
      console.log('QR RECEIVED', qr);
      qrcode.generate(qr, { small: true }); // Add this line
      res.json({
        status  : "success",
        qr,
        url : "https://4qrcode.com/#text",
      });
  });
  
});

app.post('/api/send/message',async(req,res)=> {
  try { 
    console.log("Body shou",req.body);
    await sendMessage(req.body.phone,req.body.message);

  } catch(err) {
    console.log("Body",req.body);
    console.log(err)
    res.json({ 
      status  : "error",
      message : err.message 
    });
  }
});



//##################################################//
//                    SERVER                        //
//##################################################//
const PORT = process.env.PORT || 4006;
app.listen(PORT, (err) => {
  if (err) {
    console.error(`ERROR While Starting Server : ${err}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
