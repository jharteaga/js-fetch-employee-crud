class Employee {
  constructor(
    firstName,
    lastName,
    dateOfBirth,
    department,
    position,
    photoUrl = `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 50
    )}.jpg`
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.department = department;
    this.position = position;
    this.photoUrl = photoUrl;
  }
}

//Get elements
const getEmployeesBtn = document.getElementById("getEmployees");
const getContainer = document.querySelector(".get-container");

//Post elements
const postEmployeeBtn = document.getElementById("postEmployee");
const postContainer = document.querySelector(".post-container");
const postForm = document.getElementById("post-form");
const postFirstName = document.getElementById("postFirstName");
const postLastName = document.getElementById("postLastName");
const postDateOfBirth = document.getElementById("postDateOfBirth");
const postDepartment = document.getElementById("postDepartment");
const postPosition = document.getElementById("postPosition");

//Put elements
const putEmployeeBtn = document.getElementById("putEmployee");
const putContainer = document.querySelector(".put-container");
const putForm = document.getElementById("put-form");
const putEmployeeCode = document.getElementById("putEmployeeCode");
const putEmpForm = document.getElementById("putEmpForm");
const putFirstName = document.getElementById("putFirstName");
const putLastName = document.getElementById("putLastName");
const putDateOfBirth = document.getElementById("putDateOfBirth");
const putDepartment = document.getElementById("putDepartment");
const putPosition = document.getElementById("putPosition");
const putUrlPhoto = document.getElementById("putUrlPhoto");

//Delete elements
const deleteEmployeeBtn = document.getElementById("deleteEmployee");
const deleteContainer = document.querySelector(".delete-container");
const deleteForm = document.getElementById("delete-form");
const deleteEmployeeCode = document.getElementById("deleteEmployeeCode");

//Show inputs error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-group error";
  const small = formControl.querySelector("small");
  small.textContent = message;
}

//Show inputs success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

//Get input field name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Validate required inputs values
function checkRequired(inputsArr) {
  let status = true;
  inputsArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
      status = false;
    } else {
      showSuccess(input);
    }
  });
  return status;
}

//Clean input fields
function cleanFields(inputArr) {
  inputArr.forEach((input) => {
    input.value = "";
    input.parentElement.classList.remove("success");
    input.parentElement.classList.remove("error");
  });
}

//Event listeners
//Get list of employees
getEmployeesBtn.addEventListener("click", () => {
  fetch("http://localhost:8081/employee-api/v1/employees/", {
    method: "get",
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  })
    .then((res) => res.json())
    .then((data) => {
      let output = "";
      if (data.length > 0) {
        data.forEach((employee) => {
          output += `<div class='employee'>
                      <img src='${employee.photoUrl}' alt='Employee image' class='photo'>
                      <ul>
                          <li><strong>First Name:</strong> ${employee.firstName}</li>
                          <li><strong>Last Name:</strong> ${employee.lastName}</li>
                          <li><strong>Date of Birth:</strong> ${employee.dateOfBirth}</li>
                          <li><strong>Department:</strong> ${employee.department}</li>
                          <li><strong>Position:</strong> ${employee.position}</li>
                      </ul>
                   </div>`;
        });
      } else {
        output += `<h2>No employee information</h2>`;
      }

      getContainer.innerHTML = output;
      postContainer.style.display = "none";
      getContainer.style.display = "block";
      putContainer.style.display = "none";
      deleteContainer.style.display = "none";

      cleanFields([
        postFirstName,
        postLastName,
        postDateOfBirth,
        postDepartment,
        postPosition,
        putEmployeeCode,
        putFirstName,
        putLastName,
        putDateOfBirth,
        putDepartment,
        putPosition,
        putUrlPhoto,
        deleteEmployeeCode
      ]);
    });
});

//Enable Post Employee Form
postEmployeeBtn.addEventListener("click", () => {
  postContainer.style.display = "block";
  getContainer.style.display = "none";
  putContainer.style.display = "none";
  deleteContainer.style.display = "none";

  cleanFields([
    postFirstName,
    postLastName,
    postDateOfBirth,
    postDepartment,
    postPosition,
    putEmployeeCode,
    putFirstName,
    putLastName,
    putDateOfBirth,
    putDepartment,
    putPosition,
    putUrlPhoto,
    deleteEmployeeCode
  ]);
});

//Create a new employee event
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    checkRequired([
      postFirstName,
      postLastName,
      postDateOfBirth,
      postDepartment,
      postPosition
    ])
  ) {
    const newEmp = new Employee(
      postFirstName.value,
      postLastName.value,
      postDateOfBirth.value,
      postDepartment.value,
      postPosition.value
    );

    fetch("http://localhost:8081/employee-api/v1/employees/", {
      method: "post",
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json, text/plain, */*",
        "Content-type": "application/json"
      },
      body: JSON.stringify(newEmp)
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    cleanFields([
      postFirstName,
      postLastName,
      postDateOfBirth,
      postDepartment,
      postPosition
    ]);
  }
});

//Enable Put form event
putEmployeeBtn.addEventListener("click", () => {
  postContainer.style.display = "none";
  getContainer.style.display = "none";
  putContainer.style.display = "block";
  deleteContainer.style.display = "none";
  cleanFields([
    postFirstName,
    postLastName,
    postDateOfBirth,
    postDepartment,
    postPosition,
    putEmployeeCode,
    putFirstName,
    putLastName,
    putDateOfBirth,
    putDepartment,
    putPosition,
    putUrlPhoto,
    deleteEmployeeCode
  ]);
});

//Update an employee event
putForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkRequired([putEmployeeCode])) {
    fetch(
      `http://localhost:8081/employee-api/v1/employees/${putEmployeeCode.value}`,
      {
        method: "get",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data !== null) {
          putFirstName.value = data.firstName;
          putLastName.value = data.lastName;
          putDateOfBirth.value = data.dateOfBirth;
          putDepartment.value = data.department;
          putPosition.value = data.position;
          putUrlPhoto.value = data.photoUrl;
        } else {
          showError(putEmployeeCode, "Employee code doesn't exist");
          cleanFields([
            putFirstName,
            putLastName,
            putDateOfBirth,
            putDepartment,
            putPosition,
            putUrlPhoto
          ]);
        }
      });
  }
});

putEmpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    checkRequired([
      putFirstName,
      putLastName,
      putDateOfBirth,
      putDepartment,
      putPosition,
      putUrlPhoto
    ])
  ) {
    const newEmp = new Employee(
      putFirstName.value,
      putLastName.value,
      putDateOfBirth.value,
      putDepartment.value,
      putPosition.value,
      putUrlPhoto.value
    );

    fetch(
      `http://localhost:8081/employee-api/v1/employees/${putEmployeeCode.value}`,
      {
        method: "put",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json, text/plain, */*",
          "Content-type": "application/json"
        },
        body: JSON.stringify(newEmp)
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    cleanFields([
      putEmployeeCode,
      putFirstName,
      putLastName,
      putDateOfBirth,
      putDepartment,
      putPosition,
      putUrlPhoto
    ]);
  }
});

//Enable Delete form container
deleteEmployeeBtn.addEventListener("click", () => {
  postContainer.style.display = "none";
  getContainer.style.display = "none";
  putContainer.style.display = "none";
  deleteContainer.style.display = "block";
  cleanFields([
    postFirstName,
    postLastName,
    postDateOfBirth,
    postDepartment,
    postPosition,
    putEmployeeCode,
    putFirstName,
    putLastName,
    putDateOfBirth,
    putDepartment,
    putPosition,
    putUrlPhoto,
    deleteEmployeeCode
  ]);
});

//Delete employee event
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (checkRequired([deleteEmployeeCode])) {
    fetch(
      `http://localhost:8081/employee-api/v1/employees/${deleteEmployeeCode.value}`,
      {
        method: "get",
        mode: "cors",
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data !== null) {
          console.log(data);
          fetch(
            `http://localhost:8081/employee-api/v1/employees/${deleteEmployeeCode.value}`,
            {
              method: "delete",
              mode: "cors",
              headers: {
                "Access-Control-Allow-Origin": "*"
              }
            }
          )
            .then((res) => res.text())
            .then((data) => console.log(data));
        } else {
          showError(deleteEmployeeCode, "Employee code doesn't exist");
        }
      });
  }
});
