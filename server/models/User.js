const mongoose = require('mongoose');

const userschema = new mongoose.Schema({

	name:String,
	dob:String,
	email:String,
	password:String


});

module.exports = mongoose.model('user', userschema);
