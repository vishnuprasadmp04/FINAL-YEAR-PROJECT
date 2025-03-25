const mongoose = require('mongoose')

const rSchema = new mongoose.Schema({
    id:String,
    vno:String,
    driver:String,
    user:String,
    otp:String,
    fair:Number,
    from:String,
    to:String,
    accepted:{
        type:Boolean,
        default:false
    },
    completed:{
        type:Boolean,
        default:false
    },
    pickupTime:{
        type:String
    },
    review:String,
    score:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('Ride',rSchema)