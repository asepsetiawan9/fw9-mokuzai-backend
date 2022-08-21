const favorite = require('express').Router();
const authMw = require('../middleware/auth');
const favoriteControll = require('../controllers/favorite');

favorite.get('/', authMw,favoriteControll.getWishlistById);
favorite.get('/favoriteid', authMw,favoriteControll.getWishlistByIdAndProductID);


module.exports=favorite;