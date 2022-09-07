const express = require('express');
const router = express.Router();
// const db = require('../db/dbconnect')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {
	createJWT,
     } = require('../utils/jwt')
     require("dotenv").config();
const jwt = require('jsonwebtoken');

router.get('/test',(req,res)=>{
	res.status(200).json({message:"working"})
	
	console.log()
})
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
router.post('/register',(req,res)=>{
	let { name,dob, email, password, } = req.body;
	 let errors = [];
  if (!name) {
	errors.push({ name: "required" });
      }
      if (!email) {
	errors.push({ email: "required" });
      }
      if (!emailRegexp.test(email)) {
	errors.push({ email: "invalid" });
      }
      if (!password) {
	errors.push({ password: "required" });
      }
      
    
      if (errors.length > 0) {
	return res.status(422).json({ errors: errors });
      }
     User.findOne({email: email})
	.then(user=>{
	   if(user){
	      return res.status(422).json({ errors: [{ user: "email already exists" }] });
	   }else {
	     const user = new User({
	       name: name,
	       dob:dob,
	       email: email,
	       password: password,

	     });
     bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
	     if (err) throw err;
	     user.password = hash;
	     user.save()
		 .then(response => {
		    res.status(200).json({
		      success: true,
		      result: response
		    })
		 })
		 .catch(err => {
		   res.status(500).json({
		      errors: [{ error: err }]
		   });
		});
	     });
	  });
	 }
      }).catch(err =>{
	  res.status(500).json({
	    errors: [{ error: 'Something went wrong' }]
	  });
      })
});


router.post('/login',(req,res) =>{
	let { email, password } = req.body;
let errors = [];
     if (!email) {
       errors.push({ email: "required" });
     }
     if (!emailRegexp.test(email)) {
       errors.push({ email: "invalid email" });
     }
     if (!password) {
       errors.push({ passowrd: "required" });
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
     User.findOne({ email: email }).then(user => {
        if (!user) {
          return res.status(404).json({
            errors: [{ user: "not found" }],
          });
        } else {
           bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
               return res.status(400).json({ errors: [{ password:
"incorrect" }] 
               });
              }
       let access_token = createJWT(
          user.email,
          user._id,
          3600
       );
//        console.log(access_token)
       jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
decoded) => {
         if (err) {
            res.status(500).json({ erros: err });
         }
	//  console.log(decoded)
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user._id,
             });
           }
         });
        }).catch(err => {
          res.status(500).json({ erros: err });
        });
      }
   }).catch(err => {
      res.status(500).json({ erros: err });
   });
});


router.put('/userupdate',(req,res)=>{
	
	let { name,dob,password,id } = req.body;
	const access_token = req.body.token || req.query.token || req.headers["x-access-token"];
	 const t = parseJwt(access_token)
	 
	

	console.log(t.userId)
	
	
	 let errors = [];

	 if(access_token==" "){
		errors.push({ token : "invalid token :" });
	 }
	 console.log(t.userId)
	//  	if(!iserrors){
	// 	errors.push({ token : "error:"+uid });
	// }
	      if (!name) {
		errors.push({ name: "required" });
	      }if (!password) {
		errors.push({ password: "required" });
	      }
	      
	//       if (!emailRegexp.test(email)) {
	// 	errors.push({ email: "invalid" });
	//       }
	     
	      if (!dob) {
		errors.push({ dob: "required" });
	      }
	      
	    
	      if (errors.length > 0) {
		return res.status(422).json({ errors3: errors });
	      }
	     
	// //      const user = new User({
	       
	       User.findOneAndUpdate({_id:t.userId},{
		name: name,
		dob:dob,
		// email: email,
		password:password
	       },{new :false}).then(responce=>{
		res.status(200).json({ errors9: [{success: true, error: responce }]});
	       }).catch(err => { 
		res.status(500).json({  result: err} )
		

    
	  });
	 
	  
	

});

router.delete("/userdelete",(req,res) =>{
	let { email} = req.body;
	var datas = null
	const access_token = req.body.token || req.query.token || req.headers["x-access-token"];
	const t = parseJwt(access_token)
	const userk = User.findOne({email:email}).then(resp=>{
		resp._id == t.userId?console.log("asuth"):res.status(405).json({error:"user no auth"})
	})
	
	 console.log(t.userId,datas)
	
		User.deleteOne({_id:t.userId}).then(responce=>{
			res.send(205).json({message:"user deleted"})
		}).catch(err=>{
			res.status(500).json({errors:err})
		})
	

	});

function verfytoken_returnid(access_token){ 
	const k = jwt.verify(access_token,process.env.TOKEN_SECRET)
		return k	
}



function parseJwt (token) {
	return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    }
module.exports = router