var express = require('express')
var app = express()
app.listen(3001, function()
{console.log(`Server is listening on port 3001`)})
module.exports = app;