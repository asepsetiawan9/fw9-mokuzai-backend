const db = require("../helpers/db");

exports.createCart = (data, cb) => {
  const query =
    "INSERT INTO cart (user_id, quantity, product_id) VALUES($1, $2, $3) RETURNING *";
  const value = [data.user_id, data.quantity, data.product_id];
  console.log(value);
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      console.log(err);
      cb(err);
    }
  });
};

exports.getCartById = (id, cb) => {
  db.query("SELECT * FROM cart WHERE user_id=$1", [id], (err, res) => {
    // console.log(res);
    cb(err, res.rows);
  });
};

exports.editQuantity = (data, cb) => {
  const query =
    "UPDATE product_details SET product_stock=product_stock - $1  WHERE id=$2 RETURNING *";
  const value = [data.stock_selled, data.id];
  db.query(query, value, (err, res) => {
    if (res) {
      cb(err, res.rows);
    } else {
      console.log(err);
      cb(err);
    }
  });
};
