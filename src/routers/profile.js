const profile = require('express').Router();
const uploadFile = require('../middleware/singleUpload');
const profilesControll = require('../controllers/profile');
const validationCheck = require('../middleware/checkValidation');
const authMw = require('../middleware/auth');


// profile.get('/', profilesControll.getAllProfiles);
profile.get('/', authMw,profilesControll.getProfilebyId);
profile.post('/', authMw, uploadFile, profilesControll.createProfiles);
profile.patch('/edit', authMw, validationCheck, uploadFile, profilesControll.updateProfiles);
module.exports = profile;