const upload = require('../helpers/upload').single('picture');
const response = require('../helpers/standardResponse');

const uploadFile = (req,res, next) => {
  upload(req, res, function (err){
    if (err){
      return response(res, Error `upload: ${err.message}`, null, null, 400);
    }
    next();
  });
};

module.exports = uploadFile;