const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const OpenApiValidator = require('express-openapi-validator');
const student = require('./routes/student.js')
const port = 3000;
app.use(cors());
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}));

//load router modules
app.use(
  OpenApiValidator.middleware({
    apiSpec: './openAPI.json',
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }),
);

app.use((err, req, res, next) => {
  // format error
  
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});
app.use('/api',student)


app.listen(port, () => {
  console.log(`server is running on port number..${port}`);
});