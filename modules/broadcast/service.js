const { convertTochatId } = require('../whatsapp/service')
const Broadcast= require('./model')

function arrangeCsvToObjArray(csvFile){
  console.log("arrangeCsvToObj(",csvFile,")")
  const csvFileArray=csvFile.split('\n')
  console.log({csvFileArray})
  const csvColumns=csvFileArray[0].split(',')
  console.log({csvColumns})
  let csvRows= csvFileArray.slice(1)
  csvRows= csvRows.map(row=>row.split(','))
  console.log({csvRows})
  const ContactIndex=csvColumns.indexOf('Contact')
  const NameIndex=csvColumns.indexOf('Name')
  console.log({NameIndex, ContactIndex})
  if(NameIndex===-1 || ContactIndex===-1){
    throw "Csv File should contain 'Name' and 'Contact' as its columns"
  }
  let csvRowToObjArray=[]
  for (let index = 0; index < csvRows.length; index++) {
    const element = csvRows[index];
    csvRowToObjArray.push({name:element[NameIndex], contact:convertTochatId(element[ContactIndex])})
  }
  console.log({csvRowToObjArray})
  //return [{'name':"", 'contact':},{...}]
  return csvRowToObjArray
}
async function createBroadcast({clientId,contacts,broadcastName}){
  console.log("createBroadcast(",clientId,contacts,broadcastName,")")
  const broadcast= new Broadcast({clientId, contacts, broadcastName})
  await broadcast.save()
  return broadcast
}
async function getBroadcastContacts({broadcastName,clientId}){
  console.log("getBroadcast(",broadcastName, clientId,")")
  const broadcast= await Broadcast.findOne({broadcastName,clientId})
  const contacts= broadcast.contacts.map((contactObj)=>contactObj.contact)
  return contacts
}
async function getAllBroadcast(){
  console.log("get All Broadcasts")
  const broadcasts= await Broadcast.find({})
  return broadcasts
}
async function getAllClientBroadcast(clientId){
  console.log("get All Broadcasts(",clientId,")")
  const broadcasts= await Broadcast.find({clientId})
  return broadcasts
}

module.exports={getAllBroadcast, getAllClientBroadcast, getBroadcastContacts, createBroadcast, arrangeCsvToObjArray}