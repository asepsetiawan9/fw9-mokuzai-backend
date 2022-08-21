const upload = require('../helpers/upload').array('picture');
const response = require('../helpers/standardResponse');

const uploadPhoto = (req,res,next)=>{
  upload(req,res,(err)=>{
    if(err){
      console.log(err);
      return response(res,`Failed Upload ${err.message}`, null,null,400);

    }
    next();
  });
};
//

module.exports = uploadPhoto;

