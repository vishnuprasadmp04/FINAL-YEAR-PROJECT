const mongoose = require('mongoose')

const connectToDB = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then(()=>{
        console.log('DB Connected')
    }).catch((err=>{
        console.log('DB Connection failed')
        console.log(err)
        process.exit(1)
    }))
}

module.exports=connectToDB