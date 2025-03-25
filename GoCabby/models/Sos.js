const mongoose = require('mongoose')

const rSchema = new mongoose.Schema({
    id:String,
    user:String,
    username:String,
    ok:{
        type:Boolean,
        default:false
    },
    lat:String,
    lon:String
})

module.exports=mongoose.model('Sos',rSchema)