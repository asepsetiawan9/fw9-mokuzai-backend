const router = require('express').Router();

router.use('/profile', require('./profile'));
router.use('/auth', require('./auth_seller'));
router.use('/auth', require('./auth_customer'));
router.use('/add_chart', require('./transaction'));
router.use('/get_chart', require('./transaction'));
router.use('/wishlist', require('./wishlist'));

module.exports = router;
