let router = require('express').Router()

const { getRides, addRide,getSOS, sendSOS, getBusTiming, getProfile, cancelRide, addReview } = require('../controllers/user')


router
    .route('/ride')
    .get(getRides)
    .post(addRide)

router
    .route('/cancel-ride/:id')
    .get(cancelRide)

router
    .route('/review')
    .post(addReview)

router
    .route('/sos')
    .get(getSOS)
    .post(sendSOS)

router
    .route('/bus')
    .get(getBusTiming)

router
    .route('/profile')
    .get(getProfile)

module.exports = router