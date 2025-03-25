const jwt=require('jsonwebtoken')

exports.isLoggedIn = async (req,res,next)=>{
    try{
        const utoken = req.cookies?.usertoken
        const dtoken = req.cookies?.drivertoken

        if(utoken){
            return res.redirect('/ride')
        }
        if(dtoken){
            return res.redirect('/driver')
        }    
        return next()
    }catch(e){
        console.log(e)
        return res.redirect('/error')
    }
   
}
