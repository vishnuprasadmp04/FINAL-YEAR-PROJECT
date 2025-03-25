const mongoose = require('mongoose')

const rSchema = new mongoose.Schema({
    id:String,
    destination:String,
    time:String
})

module.exports=mongoose.model('Bus',rSchema)