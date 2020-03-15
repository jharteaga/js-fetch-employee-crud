class Employee {
  constructor(firstName, lastName, dateOfBirth, department, position) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dateOfBirth = dateOfBirth;
    this.department = department;
    this.position = position;
    this.photoUrl = `https://randomuser.me/api/portraits/men/${Math.floor(
      Math.random() * 50
    )}.jpg`;
  }
}

const getEmployeesBtn = document.getElementById("getEmployees");
const getContainer = document.querySelector(".get-container");

const postEmployeeBtn = document.getElementById("postEmployee");
const postContainer = document.querySelector(".post-container");
const postForm = document.getElementById("post-form");
const postFirstName = document.getElementById("postFirstName");
const postLastName = document.getElementById("postLastName");
const postDateOfBirth = document.getElementById("postDateOfBirth");
const postDepartment = document.getElementById("postDepartment");
const postPosition = document.getElementById("postPosition");

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
  return input.id.charAt(4).toUpperCase() + input.id.slice(5);
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

//Event listeners
getEmployeesBtn.addEventListener("click", () => {
  fetch("data/employees.json")
    .then((res) => res.json())
    .then((data) => {
      let output = "";
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
      getContainer.innerHTML = output;
      postContainer.style.display = "none";
      getContainer.style.display = "block";
    });
});

postEmployeeBtn.addEventListener("click", () => {
  postContainer.style.display = "block";
  getContainer.style.display = "none";
});

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
    console.log(newEmp);

    fetch("data/employees.json", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newEmp)
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
});
