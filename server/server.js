
// Bring in our dependencies
const app = require('express')();
const useroutes = require('./route/user-route');
const bodyParser = require('body-parser')
const cors = require('cors');
const connection = require("./db/dbconnect");
connection()
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use('/', useroutes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});