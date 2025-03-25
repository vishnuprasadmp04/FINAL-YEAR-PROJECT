const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const dSchema = new mongoose.Schema({
    id:String,
    name:String,
    phone:String,
    otp:String,
    vehicle:{
        no:String,
        brand:String,
        model:String,
        year:String,
        seating:Number
    },
    score:{
        type:Number,
        default:0
    },
    isApproved:{
        type:Boolean,
        default:false
    }
})


dSchema.pre('save',async function(next){

    if(!(this.isModified('password'))){
        return next()
    }

    this.password= await bcrypt.hash(this.password,10)

})

//validate the password with passedon userpassword
dSchema.methods.isValidatedPassword = async function(userSendPassword){
    return await bcrypt.compare(userSendPassword,this.password)
}

//create and return jwt_token
dSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {    
            id:this.id,
            isApproved:this.isApproved,
            vno:this.vehicle.no
        },
        process.env.JWT_SECRET,
        {expiresIn:'8h'}
    )
}   
module.exports=mongoose.model('Driver',dSchema)