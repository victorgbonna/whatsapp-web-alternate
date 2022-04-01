const mongoose= require('mongoose')

const BroadcastSchema= new mongoose.Schema({
  clientId:{
    type: String,
    required: true
  },
  contacts:{
    type:Array
  },
  broadcastName:{
    type: String,
    required:true
  },
  createdAt:{
      type: Date,
      default: Date.now
  }
})

BroadcastSchema.path('broadcastName').validate(async function(broadcastName){
  console.log('broadschema', broadcastName)
  // console.log(this)
  const schemaCount= await mongoose.models.Broadcast.countDocuments({broadcastName, clientId:this.clientId})
  return !schemaCount
}, 'You have already used the broadcast name')

const Broadcast= mongoose.model('Broadcast', BroadcastSchema)
module.exports= Broadcast