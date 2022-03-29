const router = require("express").Router();
const client= require('../config/whatsapp')
const fs = require("fs");

router.get("/login", (req,res)=>{
  return res.render('login')
})
router.get("/checkauth", async (req, res) => {
  client
    .getState()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      if (err) {
        res.send("DISCONNECTED");
      }
    });
});
router.get('/logout', async(req,res)=> {
  try { 
    // participant.id._serialized
    await client.logout();
    clientStatus=false
    return res.json({
      status:'successfully logged out',
      online: clientStatus
      
    })
  } catch(err) {
    console.log("Body",req.body);
    res.json({ 
      status  : "error",
      message : err 
    });
  }
});
// function sendQr(res) {
//   console.log('here')
//   fs.readFile("components/last.qr", "utf-8", (err, last_qr) => {
//     if(err){
//       console.log('there is an error')
//     }
//     if (!err && last_qr) {
//       // console.log({last_qr})
//       return res.json(last_qr)
//       // var page = `
//       //               <html>
//       //                   <body>
//       //                       <script type="module">
//       //                       </script>
//       //                       <div id="qrcode"></div>
//       //                       <script type="module">
//       //                           import QrCreator from "https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js";
//       //                           let container = document.getElementById("qrcode");
//       //                           QrCreator.render({
//       //                               text: "${last_qr}",
//       //                               radius: 0.5, // 0.0 to 0.5
//       //                               ecLevel: "H", // L, M, Q, H
//       //                               fill: "#536DFE", // foreground color
//       //                               background: null, // color or null for transparent
//       //                               size: 256, // in pixels
//       //                           }, container);
//       //                       </script>
//       //                   </body>
//       //               </html>
//       //           `;
//       // res.write(page);
//       // res.end();

//     }
//   });
// }
router.get("/getqr", async (req, res) => {
  client
    .getState()
    .then((data) => {
      if (data) {
        console.log('if')
        return res.json({data:"already authenticated"})
      } else{
        fs.readFile("components/last.qr", "utf-8", (err, last_qr) => {
          if(err){
            console.log('there is an error')
          }
          if (!err && last_qr) {
            // console.log({last_qr})
            return res.json(last_qr)
          }
      })
    }
    })
    .catch((err)=>{
      console.log('error')
      var sen= sendQr()
      console.log(sen)
      return res.json({sen})
    });
})
    



module.exports = router;
