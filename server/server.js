
// Bring in our dependencies
const app = require('express')();
const useroutes = require('./route/user-route');
const PORT = process.env.PORT || 3000;
app.use('/', useroutes);

// Turn on that server!
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});