const response = require ('../helpers/standardResponse');
const errorResponse = require ('../helpers/errorResponse');
const wishlistModels = require ('../models/wishlist');

exports.getWishlistById = (req,res) =>{
  const id = req.authUser.id;
  wishlistModels.getWishlistById(id, (err,result)=>{
    return response(res, 'Product Wishlist',result);
  });
};

exports.getWishlistByIdAndProductID = (req,res) =>{
  const id = req.authUser.id;
  const product_id = req.body.id;
  wishlistModels.getWishlistByIdAndProductId(id, product_id, (err,result)=>{
    console.log(product_id);
    return response(res, 'Product Wishlist',result.rows[0]);
  });
};