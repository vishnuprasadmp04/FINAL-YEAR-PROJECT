let router = require('express').Router()

const { getDriverRequests, getDashboard, approveDriver, getDrivers, getUsers, getLocation, getBustime, addBustime, driverProfile, userProfile, deleteBustime } = require('../controllers/admin')

router 
    .route('/')
    .get(getDashboard)

router
    .route('/location')
    .get(getLocation)

router
    .route('/driver-requests')
    .get(getDriverRequests)

router
    .route('/approve-driver/:id')
    .get(approveDriver)

router
    .route('/drivers')
    .get(getDrivers)

router
    .route('/driver/:id')
    .get(driverProfile)

router
    .route('/users')
    .get(getUsers)

router
    .route('/user/:id')
    .get(userProfile)

router
    .route('/bustime')
    .get(getBustime)
    .post(addBustime)

router
    .route('/deletebus/:id')
    .get(deleteBustime)

module.exports = router