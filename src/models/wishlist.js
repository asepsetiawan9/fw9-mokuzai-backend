const db = require ('../helpers/db');

exports.getWishlistById = (user_id, cb) =>{
  const q = 'SELECT product_name, product_stock, product_price, product_picture FROM wishlist INNER JOIN product_details ON product_details.id = wishlist.product_id INNER JOIN users ON users.id = wishlist.user_id WHERE user_id = $1';
  const val = [user_id];
  console.log(val);
  db.query(q, val, (err,res)=>{
    console.log(res);
    cb(err, res);
  });
};

exports.getWishlistByIdAndProductId = (user_id, product_id, cb) =>{
  const q = 'SELECT product_name, product_stock, product_price, product_picture FROM wishlist INNER JOIN product_details ON product_details.id = wishlist.product_id INNER JOIN users ON users.id = wishlist.user_id WHERE user_id = $1 AND product_id = $2';
  const val = [user_id, product_id];
  console.log(val);
  db.query(q, val, (err,res)=>{
    console.log(res);
    cb(err, res);
  });
};

