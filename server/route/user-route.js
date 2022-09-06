const express = require('express');
const router = express.Router();
const db = require('../db/dbconnect')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const {
	createJWT,
     } = require('../utils/jwt')
     const jwt = require('jsonwebtoken');
router.get('/test',(req,res)=>{
	res.status(200).json({message:"working"})
	
	console.log()
})

router.post('/register',(req,res)=>{
	let { name,dob, email, password, } = req.body;
	console.log(name,dob,email,password)
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
	     errors: [{ error: 'Something went wrong'+err }]
	   });
       })
});


router.post('/login',(req,res) =>{
	let { email, password } = req.body;
	User.findOne({ email: email }).then(user => {
	  if (!user) {
		console.log("not found57")
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
	  jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
   decoded) => {
	    if (err) {
	       res.status(500).json({ erros2: err });
	    }
	    if (decoded) {
		return res.status(200).json({
		   success: true,
		   token: access_token,
		   message: user.email
		});
	      }
	    });
	   }).catch(err => {
	     res.status(500).json({ erros1: err });
	   });
	 }
      }).catch(err => {
	 res.status(500).json({ erros: err });
      });
});

function hash(password){
	
}


module.exports = router