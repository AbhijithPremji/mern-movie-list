const express = require('express');
const router = express.Router();
const db = require('../db/dbconnect')
const User = require('../models/User')


router.get('/test',(req,res)=>{
	res.status(200).json({message:"working"})
	
	console.log()
})

router.post('/register',(req,res)=>{
	var user = new User(req.body);
	user.save()
		.then((user) => {
			res.json({message:"user made"});
		}).catch(err=>{
			res.status(400).json({message:"user not made"+err}).send()
		})
});

router.post('/login',(req,res) =>{
	let { email, password } = req.body;
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
	  jwt.verify(access_token, process.env.TOKEN_SECRET, (err,
   decoded) => {
	    if (err) {
	       res.status(500).json({ erros: err });
	    }
	    if (decoded) {
		return res.status(200).json({
		   success: true,
		   token: access_token,
		   message: user
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

module.exports = router