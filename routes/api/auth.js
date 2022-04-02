const express = require('express')
const client= require('../../config/whatsapp')

const router = express.Router()
const fs = require('fs');

router.get("/getqr", async (req, res) => {
    // const client=await client.getState(
      client.getState()
      .then((data) => {
        if (data) {
          console.log('if')
          return res.json({
              status:"error",
              message:"already authenticated"
            })
        } else{
          fs.readFile("tempStorage/last.qr", "utf-8", (err, last_qr) => {
            if(err){
              console.log('there is an error')
            }
            if (!err && last_qr) {
              // console.log({last_qr})
              return res.json({
                    status:"success",
                    qr:last_qr
              })
            }
        })
      }
      })
      .catch((err)=>{
        console.log('error')
        console.log(err)
        return res.json({
          error:"something went wrong"
        })
      });
})
  
router.get('/status', async(req,res)=>{
    console.log('status')
    const status=await client.getState()
    if(status!='CONNECTED'){
        console.log('not connected')
        return res.json({
          status

        })
    }
    const clientInfo= client.info
    const {pushname, wid,platform}=clientInfo
    console.log({clientInfo})
    return res.json({
      status,
      pushname,
      clientId:wid._serialized,
      platform
    })
})
  
router.get('/logout', async(req,res)=> {
    try { 
      // participant.id._serialized
      await client.logout();
      return res.json({
        status:'successfully logged out',
        online: clientStatus
        
      })
    } catch(err) {
      res.json({ 
        status  : "error",
        message : err 
      });
    }
})

module.exports= router