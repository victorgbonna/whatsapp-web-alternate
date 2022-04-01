const mongoose= require('mongoose')
const config=require('./config')

mongoose.set('debug', process.env.NODE_ENV !== 'production')

const connectDB= async() =>{
    try{
        const conn= await mongoose.connect(config.mongoUrl,{
            useNewUrlParser:true, useUnifiedTopology:true
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    }
    catch(err){
        console.error(err)
        process.exit(1)        
    }
}
module.exports= connectDB
