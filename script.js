const getEmployeesBtn = document.getElementById("getEmployees");
const getContainer = document.querySelector(".get-container");

const postEmployeeBtn = document.getElementById("postEmployee");
const postContainer = document.querySelector(".post-container");

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
