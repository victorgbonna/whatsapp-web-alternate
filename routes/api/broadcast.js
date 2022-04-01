const express = require('express')
const client= require('../../config/whatsapp')
const upload= require('../../config/multer')
const fs= require('fs')
const { arrangeCsvToObjArray, createBroadcast, getAllBroadcast, getAllClientBroadcast, getBroadcastContacts } = require('../../modules/broadcast/service')
const { convertTochatId, sendMessage } = require('../../modules/whatsapp/service')

const router = express.Router()


router.post('/create',upload.single('csvFile'), async(req,res)=>{
    try {
      fs.readFile(`tempStorage/${req.file.filename}`, "utf-8", async(err, csvFile) => {
        if(err){
          console.log('there is an error')
          return res.json({
            error:"error",
            message:err||"somethinhg went wrong"
          })
        }
        if (!err && csvFile) {
          console.log('req body')
          console.log(req.body)
          console.log(csvFile)
          const contacts=arrangeCsvToObjArray(csvFile)
          const clientInfo= client.info
          const clientId=clientInfo.wid._serialized
          await createBroadcast({
            clientId,
            contacts,
            broadcastName:req.body.broadcastName      
          })     
          res.json({
            status:'successful',
            contacts
          })
        }
      })
      // const csvDemo="Contact,Name\n+2348102603301,victor\n+2348072897950,victor2"
      // const reqDemo={csvDemo,broadcastName:'demo'}

    } catch (err) {
      console.log(err)
      res.json({
        status:"error",
        message:err||"something went wrong"
      })
    }
  try {
    console.log("now deleting")
    fs.unlinkSync(`tempStorage/${req.file.filename}`)
  } catch (error) {
    console.log(error)
  }

})
router.get('/getAll', async(req,res)=>{
    try {
    // console.log('status')
      const broadcasts= await getAllBroadcast()
      return res.json({
        status:"success",
        broadcasts
      })    
    } catch (err) {
      console.log(err)
      return res.json({
        status:"error",
        message: err ||"Something went wrong"
      })    
    }
  
  })
router.get('/currentClient/get', async(req,res)=>{
    // console.log('status')
    try {
      // clientInfo.wid._serialized
      const clientInfo= client.info
      const broadcasts= await getAllClientBroadcast(clientInfo.wid._serialized)
      return res.json({
        status:"success",
        broadcasts   
      })    
    } catch (err) {
      console.log(err)
      return res.json({
        status:"error",
        message: err ||"Something went wrong"
      })
    }
  
})
router.post('/send/message', async(req,res)=>{
    try {
      const {broadcastName, message, clientPhone}= req.body
      const clientId= convertTochatId(clientPhone)
      const broadcastContacts= await getBroadcastContacts({broadcastName, clientId})
      broadcastContacts.forEach(async(contact) => {
        await sendMessage(client,contact, message)
      });
      return res.json({
        status:"success",
        broadcastContacts,
        message
      })
    } catch (err) {
      console.log(err)
      return res.json({
        status:"error",
        message:err||"something went wrong"
      })
    }
  
})

module.exports=router