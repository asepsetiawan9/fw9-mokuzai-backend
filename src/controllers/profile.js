const response = require ('../helpers/standardResponse');
const errorResponse = require ('../helpers/errorResponse');
const profileModels = require ('../models/profile');


exports.getAllProfiles = (req, res)=>{
  
  profileModels.getAllProfile((err, result) =>{
    return response(res, 'Get All Profile', result);
  });
};

exports.getProfilebyId = (req, res)=>{
  // const {id} = req.params;
  const id = req.authUser.id;
  profileModels.getProfilebyId(id, (err,result)=>{
    return response(res, 'Profile User', result.rows[0]);
  });
};

exports.createProfiles = (req, res) =>{
  let filename = null;
  if(req.file){
    filename = req.file.filename;
  }
  profileModels.createProfiles(req.body, filename, (err, result)=>{
    if(err){  
      return errorResponse(err,res);
    }else{
      return response(res, 'Create Profiles successfully', result.rows[0]);  
    }
  });
};

exports.updateProfiles = (req, res) =>{
  const id = req.authUser.id;
  const {email} = req.body;
  let filename = null;
  if(req.file){
    filename = req.file.filename;
  }
  profileModels.updateProfile(id, filename, email, req.body, (err, result)=>{
    if(err){
      return errorResponse(err,res);
    }else{
      return response(res, 'UPDATE data success!', result.rows[0]);
    }
  });
};
