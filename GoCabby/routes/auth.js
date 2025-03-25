let router = require('express').Router()

const { getUserLogin, getHomePage, getAdminLogin, adminLogin, adminLogout, getDriverLogin, getDriverRegister, driverRegister, getUserRegister, userRegister, userLogin, userLogout, sendUserOtp, sendDriverOtp, driverLogin, driverLogout } = require('../controllers/auth')
const { isLoggedIn } = require('../middlewares/go')

router
    .route('/')
    .get(isLoggedIn,getHomePage)

router
    .route('/register')
    .get(isLoggedIn,getUserRegister)
    .post(isLoggedIn,userRegister)
    
router
    .route('/otp')
    .get(sendUserOtp)
    
router
    .route('/login')
    .get(isLoggedIn,getUserLogin)
    .post(isLoggedIn,userLogin)

router
    .route('/logout')
    .get(userLogout)

router
    .route('/driver/register')
    .get(isLoggedIn,getDriverRegister)
    .post(isLoggedIn,driverRegister)

router
    .route('/driver/otp')
    .get(sendDriverOtp)

router
    .route('/driver/login')
    .get(isLoggedIn,getDriverLogin)
    .post(isLoggedIn,driverLogin)

router
    .route('/driver/logout')
    .get(driverLogout)


router
    .route('/admin/login')
    .get(getAdminLogin)
    .post(adminLogin)

router
    .route('/admin/logout')
    .get(adminLogout)

module.exports = router