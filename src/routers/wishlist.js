const wishlist = require('express').Router();
const authMw = require('../middleware/auth');
const wishlistControll = require('../controllers/wishlist');

wishlist.get('/', authMw,wishlistControll.getWishlistById);
wishlist.get('/productid', authMw,wishlistControll.getWishlistByIdAndProductID);


module.exports=wishlist;