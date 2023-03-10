const express = require("express");
//const bodyParser = require("body-parser");
const {studentDisplay,singleStudentDisplay,studentAdd,studentUpdate,studentDelete} = require("../controller/studentController");
const router = express.Router();

 //router.use(bodyParser.urlencoded({ extended: false }));
 //router.use(bodyParser.json());


//save student data into json file
router.post("/user",studentAdd);
  
  //student data display
  router.get("/user",studentDisplay);

  //get single student data 
  router.get('/user/:id', singleStudentDisplay)
  // student data update
  router.put("/user/:id",studentUpdate );
  
  //deleting student
  router.delete("/user/:id",studentDelete );

  module.exports = router  