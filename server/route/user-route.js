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
			res.json({message:"user not made"+err}).send()
		})
});




module.exports = router