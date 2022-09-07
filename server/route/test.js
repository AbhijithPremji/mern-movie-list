const jwt = require('jsonwebtoken');
require("dotenv").config();
var f= "iOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImExMkBhLmNvbSIsInVzZXJJZCI6IjYzMTc2NzViY2I0YmQwOTQ0MDg0NDNhNSIsImR1cmF0aW9uIjozNjAwLCJpYXQiOjE2NjI1NDUwMzgsImV4cCI6MTY2MjU0ODYzOH0.YsNwHq6PSMm7Ju9rZ_OD-CwuBpVuK3fujW_3J1lm9sA"
const res = verfytoken_returnid(f)
console.log(res)
function verfytoken_returnid(access_token){
	// const t = parseJwt(access_token)
	// console.log(t)
      if (!access_token) {
	return  "none"
      }
      try{
	jwt.verify(access_token, "letsgoo", (err,
		decoded) => {

			 if (err) {
			console.log(200,":", err)
			console.log(213+"form")
			return "none"
			 }
			 if (decoded) {
				const t = "hello"
				console.log(218+"form",typeof(decoded.userId))
			return (t)
			  
			
			}

			 });//veryfy token
			}
			catch(err){
				console.log(226+"form")
				return "none"
			}
		}