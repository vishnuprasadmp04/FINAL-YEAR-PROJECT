const userCookie=async(user,res)=>{

    const token = await user.getJwtToken()
    const options = {
        expires: new Date(Date.now()+(4*60*60*1000)),
        httpOnly:true
    }
    return res.cookie('usertoken', token, options ).redirect('/ride')
}

module.exports = userCookie