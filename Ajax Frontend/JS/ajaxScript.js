//get all data function
function getData() {
  let table = document.getElementById("table");
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:3000/api/user", true);
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status === 200) {
      let arrayOfStudent = xhr.response;
      
      for (let i = 0; i < arrayOfStudent.length; i++) {
        let objectOfStudent = {
          id: arrayOfStudent[i].id,
          name: arrayOfStudent[i].firstName,
          email: arrayOfStudent[i].email,
        };
        table.innerHTML += `
        
        <tr id='tr'>
            <td id='td'>${objectOfStudent.id}</td>
            <td id='td'>${objectOfStudent.name}</td>
            <td id='td'>${objectOfStudent.email}</td>
            <td><button id="edit" onclick='edit("${objectOfStudent.id}","${objectOfStudent.name}","${objectOfStudent.email}")'>Edit</button></td>
            <td><button id="delete" onclick='deleteData("${objectOfStudent.id}");removeRow();'>Delete</button></td>
            
        </tr>`;
      
      }
    } else {
      console.log("Problem Occur");
    }
    
  };
  xhr.send();
}

//post data
function postData() {
  const firstName = document.getElementById("name").value;
  const emailId = document.getElementById("emailAdd").value;
  const studentId = document.getElementById("stdId").value;

  if (studentId == "") {
    let studentObj = {
      'firstName': firstName,
      'email': emailId,
    };
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:3000/api/user", true);
    xhr.responseType = "json";
    xhr.onload = () => {
      if (xhr.status === 200) {
        console.log("record added successfully");

        table.innerHTML += `
        
        <tr id='tr'>
            <td id='td'>${xhr.response.id}</td>
            <td id='td'>${studentObj.firstName}</td>
            <td id='td'>${studentObj.email}</td>
            <td><button id="edit" onclick='edit("${xhr.response.id}","${studentObj.firstName}","${studentObj.email}")'>Edit</button></td>
            <td><button id="delete" onclick='deleteData("${xhr.response.id}");removeRow();'>Delete</button></td>    
        </tr>`;

      } else {
        console.log("Problem Occur");
      }
    };
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.send(JSON.stringify(studentObj));
    alert("data send successfully");
  } else {
    updateData();
  }
}

//get single user data
function getSingleUserData() {
  let table = document.getElementById("table");
  let id = document.getElementById("search").value;
  if (id == 0) {
    alert("enter valid data");
    return;
  }
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:3000/api/user/${id}`, true);
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.response);
      table.innerHTML += `
        
      <tr>
          <td id='td'>${xhr.response.id}</td>
          <td id='td'>${xhr.response.firstName}</td>
          <td id='td'>${xhr.response.email}</td>
          <td id='td'><button id="edit" onclick='edit("${xhr.response.id}","${xhr.response.firstName}","${xhr.response.email}")'>Edit</button></td>
          <td><button id="delete" onclick='deleteData("${xhr.response.id}")'>Delete</button></td>
      </tr>`;
    } else {
      console.log("Problem Occur");
    }
  };
  xhr.send();
 // document.getElementById("btnid").disabled = true;

  
}

//delete data function
function deleteData(studentId) {
  console.log(studentId);
  //let id = document.getElementById("search").value
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `http://localhost:3000/api/user/${studentId}`, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.response);

      // table.innerHTML += `
        
      // <tr id='tr'>
      //     <td id='td'>${xhr.response.id}</td>
      //     <td id='td'>${xhr.response.firstName}</td>
      //     <td id='td'>${xhr.response.email}</td>
      //     <td id='td'><button id="edit">Edit</button></td>
      //     <td><button id="delete" onclick='deleteData("${xhr.response.id}");removeRow();'>Delete</button></td>
      // </tr>`;

      console.log("record delete");
    } else {
      console.log("Problem Occur");
    }
  };
  if (window.confirm("Do you want to delete this user data?")) {
    alert("record deleted successfully");
    xhr.send();
  } else {
    return;
  }
}

function removeRow() {
  document.getElementById("tr").remove();
}


function updateData() {
  const firstName = document.getElementById("name").value;
  const emailId = document.getElementById("emailAdd").value;
  const studentDataId = document.getElementById("stdId").value;

  let studentObj = {
    firstName: firstName,
    email: emailId,
  };

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", `http://localhost:3000/api/user/${studentDataId}`, true);
  xhr.responseType = "json";
  xhr.onload = () => {
    if (xhr.status === 200) {
      console.log(xhr.response);
      alert("data updated successfully");
    } else {
      console.log("data not send");
    }
  };
  // console.log(typeof(studentObj));
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

  if (window.confirm("Do you want to update this user data?")) {
    alert("record updated successfully");
    xhr.send(JSON.stringify(studentObj));
  } else {
    return;
  }
}

//edit function to set the value in text box
function edit(studentId, studentName, studentEmail) {
  document.getElementById("stdId").value = studentId;
  document.getElementById("name").value = studentName;
  document.getElementById("emailAdd").value = studentEmail;
}
