const fs = require("fs");
const data = require("../Data.json");
const { v4: uuidv4 } = require("uuid");
const validator = require("validator");


// display student data
const studentDisplay = (req, res) => {
  res.send(data);
};

//save data into the file
const studentAdd = (req, res) => {

    if (validator.isEmail(req.body.email) == true) {
      const id = uuidv4();
      let studentObject = {
        id: id,
        firstName: req.body.firstName,
        email: req.body.email,
      };
      data.push(studentObject);
      console.log(data);
      //convert studentArray into JSON string
      let studentJson = JSON.stringify(data);
      //   //perform file write operation
      fs.writeFile("./Data.json", studentJson, (error) => {
        if (error) {
          res.send("wrong");
        } else {
          res.send(studentObject);
        }
      });
    } else {
      res.send("Enter Valid Email Address");
    }
 
};

//update student
const studentUpdate = (req, res) => {
  let id = req.params.id;
  let firstName = req.body.firstName;
  let email = req.body.email;

  if (
    validator.isLength(firstName, { min: 1 }) == true &&
    validator.isAlpha(firstName) == true
  ) {
    if (validator.isEmail(req.body.email) == true) {


      let index = data.findIndex((studentObject) => {
        return studentObject.id === id;
      });
      if (index >= 0) {
        let stud = data[index];
        stud.firstName = firstName;
        stud.email = email;
      } else {
        res.status("record not found");
      }
      let studentJson = JSON.stringify(data);
      //   //perform file write operation
      fs.writeFile("./Data.json", studentJson, (error) => {
        if (error) {
          console.log("wrong");
        } else {
          console.log("data save successfully....");
        }
        res.send("Record updated Successfully");
      });


    }else {
      res.send("Enter Valid Email Address");
    }


  }else {
    res.send("enter valid name");
  }


  
};

//delete specific record
const studentDelete = (req, res) => {
  let id = req.params.id;
  let index = data.findIndex((studentObject) => {
    return studentObject.id === id;
  });

  if (index >= 0) {
    let deleteStudent = data[index];
    data.splice(index, 1);
    res.send("record has been deleted successfully");
  } else {
    res.send("Data Not found");
  }
  let studentJson = JSON.stringify(data);
  //   //perform file write operation
  fs.writeFile("./Data.json", studentJson, (error) => {
    if (error) {
      console.log("wrong");
    } else {
      console.log("data save successfully....");
    }
    res.send(id);
  });
};

//display single record
const singleStudentDisplay = (req, res) => {
  let id = req.params.id;
  let index = data.findIndex((studentObject) => {
    return studentObject.id === id;
  });
  if (index >= 0) {
    let singleStudent = data[index];
    res.send(singleStudent);
  } else {
    res.send("Data Not found");
  }
};

module.exports = {
  studentDisplay,
  singleStudentDisplay,
  studentAdd,
  studentUpdate,
  studentDelete,
};
