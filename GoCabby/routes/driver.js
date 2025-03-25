let router = require('express').Router()

const { getRides, acceptRide, completeRide, getProfile, rideHistory } = require('../controllers/driver')

router
    .route('/')
    .get(getRides)

router
    .route('/accept-ride/:id')
    .get(acceptRide)

router
    .route('/complete-ride/:id')
    .get(completeRide)

router
    .route('/profile')
    .get(getProfile)

router
    .route('/history')
    .get(rideHistory)

module.exports = router