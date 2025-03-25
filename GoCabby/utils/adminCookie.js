const adminCookie=async(user,res)=>{

    const token = await user.getJwtToken()
    const options = {
        expires: new Date(Date.now()+(4*60*60*1000)),
        httpOnly:true
    }
    return res.cookie('admintoken', token, options ).redirect('/admin')
}

module.exports = adminCookie