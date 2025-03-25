const Driver = require('../models/Driver')
const User = require('../models/User')
const Sos = require('../models/Sos')
const Bus = require('../models/Bus')
const Ride = require('../models/Ride')


exports.getDashboard  = async(req,res)=>{
    try{
        let sos = await Sos.find({ok:false})
        return res.render('admin/dashboard',{sos})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getLocation = (req,res)=>{
    return res.render('admin/location',{lat:req.query.lat,lon:req.query.lon})
}

exports.getDriverRequests = async(req,res)=>{
    try{
        let drivers = await Driver.find({isApproved:false})
        return res.render('admin/driver-requests',{drivers})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.approveDriver = async(req,res)=>{
    try{
        let id=req.params.id
        let driver = await Driver.findOne({id:id})
        if(!driver){
            return res.redirect('/admin/driver-requests')
        }
        driver.isApproved=true
        await driver.save()
        return res.redirect('/admin/driver-requests')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getDrivers = async(req,res)=>{
    try{
        let drivers = await Driver.find({isApproved:true})
        return res.render('admin/drivers',{drivers})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.driverProfile = async(req,res)=>{
    try{
        let driver = await Driver.findOne({id:req.params.id})
        let rides = await Ride.find({completed:true,driver:req.params.id}).sort({id:-1})
        return res.render('admin/driver-profile',{driver,rides})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getUsers = async(req,res)=>{
    try{
        let users = await User.find({})
        return res.render('admin/users',{users})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.userProfile = async(req,res)=>{
    try{
        let user = await User.findOne({id:req.params.id})
        let rides = await Ride.find({completed:true,user:req.params.id}).sort({id:-1})
        return res.render('admin/user-profile',{user,rides})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.getBustime = async(req,res)=>{
    try{
        let times = await Bus.find()
        return res.render('admin/bustime',{times})
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.addBustime = async(req,res)=>{
    try{
        await Bus.create({
            id:`B${Date.now()}`,
            destination:req.body.destination,
            time:req.body.time
        })
        return res.redirect('/admin/bustime')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
}

exports.deleteBustime = async(req,res)=>{
    try{
        await Bus.deleteOne({id:req.params.id})
        return res.redirect('/admin/bustime')
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