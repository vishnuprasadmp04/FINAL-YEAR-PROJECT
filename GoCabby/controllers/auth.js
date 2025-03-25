const User = require('../models/User')
const Driver = require('../models/Driver')
const Admin = require('../models/Admin')

const axios = require('axios')

const adminCookie=require('../utils/adminCookie')
const userCookie=require('../utils/userCookie')
const driverCookie=require('../utils/driverCookie')



exports.getHomePage = (req,res)=>{
    return res.render('home')
}

exports.getUserLogin = (req,res)=>{
    return res.render('user-login',{msg:''})
}

exports.userLogin = async(req,res)=>{
    try{
        console.log(req.body)
        let {phone,otp}=req.body
        
        if(!phone || !otp){
            return res.render('user-login',{msg:"Enter Phone And OTP"})
        }
        const user =  await User.findOne({phone:phone})
        if(!user){
            return res.render('user-login',{msg:"Invalid Phone Number"})
        }
        
        if(!(user.otp == otp)){
            return res.render('user-login',{msg:"Invalid OTP"})
        }
        userCookie(user,res)
    }catch(e){
        console.log(e)
        return res.redirect('/')
    }
}
exports.getUserRegister = (req,res)=>{
    return res.render('user/register')
}
exports.userRegister = async(req,res)=>{
    try{
        await User.create({
            id:`D${Date.now()}`,
            phone:req.body.phone,
            name:req.body.name,
            otp:'1122'
        })
        return res.redirect('/login')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
   
}

exports.sendUserOtp = async(req,res)=>{
    let otp = ''
    try{
        let {phone}=req.query
        let user=await User.findOne({phone:phone})
        
        let digits = '0123456789'; 

        for (let i = 0; i < 4; i++ ) { 
            otp += digits[Math.floor(Math.random() * 10)]; 
        } 
        if(user){
            user.otp=otp
            await user.save()
        }else{
            return res.status(404).json({success:false,msg:'invalid user'})
            
        }
        await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMS_KEY}&variables_values=${otp}&route=otp&numbers=${phone}&flash=0`)
        return res.status(200).json({success:true,otp:otp})
    }catch(e){
        console.log(e)
        return res.json({success:false,otp:otp})
    }
}

exports.userLogout = (req,res)=>{
    res.cookie('usertoken',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.redirect('/login')
}
//driver

exports.getDriverRegister = (req,res)=>{
    return res.render('driver/register')
}

exports.driverRegister = async(req,res)=>{
    try{
        await Driver.create({
            id:`D${Date.now()}`,
            name:req.body.name,
            phone:req.body.phone,
            otp:'1122',
            vehicle:{
                brand:req.body.vehicleBrand,
                model:req.body.vehicleModel,
                year:req.body.vehicleYear,
                seating:req.body.vehicleSeating,
                no:req.body.vehicleNo
            },
        })
        return res.redirect('/driver/login')
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
   
}

exports.sendDriverOtp = async(req,res)=>{
    let otp = ''
    try{
        let {phone}=req.query
        let user=await Driver.findOne({phone:phone})
        
        let digits = '0123456789'; 

        for (let i = 0; i < 4; i++ ) { 
            otp += digits[Math.floor(Math.random() * 10)]; 
        } 
        if(user){
            user.otp=otp
            await user.save()
        }else{
            return res.status(404).json({success:false,msg:'invalid user'})
            
        }
        await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMS_KEY}&variables_values=${otp}&route=otp&numbers=${phone}&flash=0`)
        return res.status(200).json({success:true,otp:otp})
    }catch(e){
        console.log(e)
        return res.json({success:false,otp:otp})
    }
}

exports.getDriverLogin = (req,res)=>{
    return res.render('driver-login',{msg:''})
}
exports.driverLogin = async(req,res)=>{
    try{

        let {phone,otp}=req.body
        
        if(!phone || !otp){
            return res.render('driver-login',{msg:"Enter Phone And OTP"})
        }
        const user =  await Driver.findOne({phone:phone})
        if(!user){
            return res.render('driver-login',{msg:"Invalid Phone Number"})
        }
        
        if(!(user.otp == otp)){
            return res.render('driver-login',{msg:"Invalid OTP"})
        }
        driverCookie(user,res)
    }catch(e){
        console.log(e)
        return res.redirect('/')
    }
}
exports.driverLogout = (req,res)=>{
    res.cookie('drivertoken',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.redirect('/driver/login')
}

//admin
exports.getAdminLogin = (req,res)=>{
    return res.render('admin/login',{msg:''})
}

exports.adminLogin = async(req,res)=>{
    try{
        let {username,password}=req.body
        
        if(!username || !password){
            return res.render('admin/login',{msg:"Enter username and password"})
        }
        const user =  await Admin.findOne({username:username}).select("+password")
        if(!user){
            return res.render('admin/login',{msg:"Incorrect Username or Password"})
        }
        const isPasswordCorrect = await  user.isValidatedPassword(password)
        if(!isPasswordCorrect){
            return res.render('admin/login',{msg:"Incorrect Username or Password"})
        }
        adminCookie(user,res)
    }catch(e){
        console.log(e)
        return res.redirect('/')
    }
}

exports.adminLogout = (req,res)=>{
    res.cookie('admintoken',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.redirect('/admin/login')
}