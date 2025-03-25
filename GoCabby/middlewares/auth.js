const jwt=require('jsonwebtoken')

exports.isUser = async (req,res,next)=>{
    try{
        const token = req.cookies.usertoken
        if(!token){
            return res.redirect('/login')
        }

        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        req.user= decoded
    
        return next()
    }catch(e){
        console.log(e)
        return res.cookie('usertoken',null).redirect('/login')
    }
   
}

exports.isDriver = async (req,res,next)=>{
    try{

        const token = req.cookies.drivertoken
        if(!token){

            return res.redirect('/driver/login')
        }

        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        req.user= decoded

        return next()
    }catch(e){
        console.log(e)
        return res.cookie('drivertoken',null).redirect('/driver/login')
    }
   
}

exports.isAdmin = async (req,res,next)=>{
    try{
        const token = req.cookies.admintoken
        if(!token){
            return res.redirect('/admin/login')
        }

        const decoded = await jwt.verify(token,process.env.JWT_SECRET)
        req.user= decoded
    
        return next()
    }catch(e){
        console.log(e)
        return res.cookie('admintoken',null).redirect('/admin/login')
    }
   
}