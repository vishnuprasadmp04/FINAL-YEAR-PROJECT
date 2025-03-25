const Ride = require('../models/Ride')
const Sos = require('../models/Sos')
const Bus = require('../models/Bus')
const Driver = require('../models/Driver')

const analyseReview = require('../utils/analysisReview')



exports.getRides = async(req,res)=>{
    try{
        let ride = await Ride.findOne({user:req.user.id,completed:false})
        return res.render('user/ride',{ride})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
   
}

exports.addRide = async(req,res)=>{
    try{
        let digits = '0123456789'; 
        let otp = ''; 
        for (let i = 0; i < 4; i++ ) { 
            otp += digits[Math.floor(Math.random() * 10)]; 
        } 
        await Ride.create({
            id:`R${Date.now()}`,
            user:req.user.id,
            otp:otp,
            from:req.body.from,
            to:req.body.to,
            pickupTime:req.body.pickupTime,
        })
        return res.redirect('/ride')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}


exports.getSOS = (req,res)=>{
    return res.render('user/sos')
}

exports.sendSOS = async(req,res)=>{
    try{
        await Sos.create({
            id:`SOS${Date.now()}`,
            user:req.user.id,
            username:req.user.username,
            lat:req.body.lat,
            lon:req.body.lon
        })
        return res.redirect('/ride')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getBusTiming = async(req,res)=>{
    try{
        let times = await Bus.find()
        return res.render('user/bus',{times})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }

}
exports.cancelRide = async(req,res)=>{
    try{
        await Ride.deleteOne({id:req.params.id})
        return res.redirect('/ride')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }

}

exports.getProfile = (req,res)=>{
    return res.render('user/profile')
}

exports.addReview = async(req,res)=>{
    try{
        let x = await analyseReview(req.body.review)
        let ride = await Ride.findOne({id:req.body.rideid})
        let driver = await Driver.findOne({id:ride.driver})

        ride.score = x
        ride.review = req.body.review
        await ride.save()

        driver.score = driver.score+x
        await driver.save()
        return res.redirect('/ride')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
    

}
// try{

// }catch(e){
//     console.log(e)
//     return res.redirect('/error')
// }