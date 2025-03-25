const Driver = require('../models/Driver')
const Ride = require('../models/Ride')

exports.getRides = async(req,res)=>{
    
    try{
        let ride = await Ride.findOne({accepted:true,driver:req.user.id,completed:false})
        let requests = await Ride.find({accepted:false}).sort({id:-1})

        return res.render('driver/ride',{ride,requests})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.acceptRide = async(req,res)=>{
    try{
        let ride = await Ride.findOne({id:req.params.id})
        ride.accepted=true
        ride.driver = req.user.id
        await ride.save()

        return res.redirect('/driver')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.acceptRide = async(req,res)=>{
    try{
        let ride = await Ride.findOne({id:req.params.id})
        ride.accepted=true
        ride.driver = req.user.id
        ride.vno=req.user.vno
        await ride.save()

        return res.redirect('/driver')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.completeRide = async(req,res)=>{
    try{
        let ride = await Ride.findOne({id:req.params.id})
        ride.completed=true
        await ride.save()

        return res.redirect('/driver')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getProfile = (req,res)=>{
    return res.render('driver/profile')
}

exports.rideHistory = async(req,res)=>{
    try{
        let rides = await Ride.find({driver:req.user.id,completed:true}).sort({id:-1})
        return res.render('driver/history',{rides})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
   
}