require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
	const connection = mongoose
		.connect("mongodb+srv://badu:badu@cluster0.eleaujd.mongodb.net/?retryWrites=true&w=majority")
		.then((result) => console.log("Connected to database"))
		.catch((err) => console.log("could not connect to database "+err));
};