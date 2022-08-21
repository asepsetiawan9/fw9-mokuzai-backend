
const db = require ('../helpers/db');

exports.getAllProfile = (cb) => {
  const q = 'SELECT * FROM profile';
  db.query(q, (err, res) =>{
    return cb(err, res.rows);
  });
};

exports.getProfilebyId = (user_id, cb) =>{
  // const q = 'SELECT * FROM profile WHERE id=$1';
  const q = 'SELECT email, gender, store_name, store_desc, picture FROM profile INNER JOIN users on users.id = profile.user_id WHERE user_id = $1';
  const val = [user_id];
  db.query(q, val, (err, res)=>{
    return cb(err, res);
  });
};

exports.createProfiles = (data, picture, cb)=>{
  let val=[];
  const filtered = {};
  const obj = {
    picture,
    gender: data.gender,
    store_name: data.store_name,
    store_desc: data.store_desc,
  };

  for(let x in obj){
    if(obj[x]!==null){
      filtered[x] = obj [x];
      val.push(obj[x]);
    }
  }

  const key = Object.keys(filtered);
  const strKey = key.join();
  const finalResult = key.map((o, ind) => `$${ind+1}`);

  const q = `INSERT INTO profile (${strKey}) VALUES (${finalResult}) RETURNING *`;
  db.query(q, val, (err,res)=>{
    if (res) {
      cb(err, res);
    }else{
      cb(err);
    }
  });
};

exports.updateProfiles = (user_id, picture, data, cb)=>{
  let val = [user_id];

  const filtered = {};
  const obj = {
    picture,
    gender: data.gender,
    store_name: data.store_name,
    store_desc: data.store_desc,
  };

  for(let x in obj){
    if(obj[x]!==null){
      filtered[x] = obj [x];
      val.push(obj[x]);
    }
  }

  const key = Object.keys(filtered);
  const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);

  const q = `UPDATE profile SET ${finalResult} WHERE user_id=$1 RETURNING *`;
  db.query(q, val, (err,res)=>{
    console.log(res);
    cb(err, res);
  });
};


exports.createProfileAfterRegister = (data, cb) => {
  const query = 'INSERT INTO profile (user_id) VALUES($1) RETURNING *';
  const values = [data];
  db.query(query, values, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(err, res.rows);
    }
  });
};

// exports.updateProfile = (id, picture, email, data, cb) => {
//   db.query('BEGIN', err => {
//     if (err){
//       console.log(err);
//     }else{
//       const q = 'UPDATE users SET email=$1 WHERE id=$2 RETURNING *';
//       db.query(q, [email, id], (err, res) => {
        
//         if (err) {
//           console.log(err);
//         }else{
//           let val = [id];

//           const filtered = {};
//           const obj = {
//             picture,
//             gender: data.gender,
//             store_name: data.store_name,
//             store_desc: data.store_desc,
//           };
//           for(let x in obj){
//             if(obj[x]!==null){
//               filtered[x] = obj [x];
//               val.push(obj[x]);
//             }
//           }
        
//           const key = Object.keys(filtered);
//           const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);
        
//           const q1 = `UPDATE profile SET ${finalResult} WHERE user_id=$1 RETURNING *`;
//           const show = [res.rows];
//           db.query(q1, val, show, (err, res) => {
//             if (err) {
//               console.log(err);
//             }else{
//               cb(err,res);
//               db.query('COMMIT', err => {
//                 if (err) {
//                   console.error('Error committing transaction', err.stack);
//                 }
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// };

exports.updateProfile=(id, picture, email, data, cb)=>{
  // console.log(picture);
  db.query('BEGIN', err =>{
    if(err){
      cb(err);
    }else{
      const queryUser = 'UPDATE users SET email=$1 WHERE id=$2 RETURNING *';
      const valUser = [email, id];
      db.query(queryUser,valUser,(err,res)=>{
        // console.log(res);
        if(err){
          cb(err);
        }else{
          let val = [id];
          const user_id = res.rows[0].id;
          // console.log('user test');
          // console.log(user_id);
          const filtered = {};
          const obj = {
            user_id,
            picture,
            gender: data.gender,
            store_name: data.store_name,
            store_desc: data.store_desc,
          };

          for(let x in obj){
            if(obj[x]!==null){
              filtered[x] = obj [x];
              val.push(obj[x]);
            }
          }

          const key = Object.keys(filtered);
          const finalResult = key.map((o, ind) => `${o}=$${ind+2}`);
          console.log(finalResult);
          const queryProfile = `UPDATE profile SET ${finalResult} WHERE user_id=$1 RETURNING *`;
          db.query(queryProfile,val, (err,res)=>{
            if(err){
              cb(err);
            }else{
              cb(err,res);
            }
            db.query('COMMIT',err=>{
              if(err){
                cb(err);
              }
            });
          });
        }
      });
    }
  });
};