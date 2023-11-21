let userData = [];

function displayUserData() {
  let tableHTML = "";

  userData.forEach((user) => {
    if (user.regName && user.regEmail && user.regPassword && user.regDob && user.regTerms) {
      tableHTML += "<tr>";
      tableHTML += `<td>${user.regName}</td>`;
      tableHTML += `<td>${user.regEmail}</td>`;
      tableHTML += `<td>${user.regPassword}</td>`;
      tableHTML += `<td>${user.regDob}</td>`;
      tableHTML += `<td>${user.regTerms}</td>`;
      tableHTML += "</tr>";
    }
  });

  document.getElementById("userDataBody").innerHTML = tableHTML;
}

function calculateUserAge(dateOfBirth) {
  const regDob = new Date(dateOfBirth);
  const regAgeDifference = Date.now() - regDob.getTime();
  const regAgeDate = new Date(regAgeDifference);
  const regAge = Math.abs(regAgeDate.getUTCFullYear() - 1970);

  return regAge;
}

function handleRegSubmit(event) {
  event.preventDefault();

  const regName = document.getElementById("regName").value;
  const regEmail = document.getElementById("regEmail").value;
  const regPassword = document.getElementById("regPassword").value;
  const regDob = document.getElementById("regDob").value;
  const regTerms = document.getElementById("regTerms").checked;

  const regAge = calculateUserAge(regDob);

  if (regAge < 18 || regAge > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const regEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regEmailRegex.test(regEmail)) {
    alert("Invalid email address format.");
    return;
  }

  const user = {
    regName,
    regEmail,
    regPassword,
    regDob,
    regTerms: regTerms ? "true" : "false",
  };

  userData.push(user);
  localStorage.setItem("userData", JSON.stringify(userData));
  document.getElementById("registrationForm").reset();
  displayUserData();
}

document.addEventListener("DOMContentLoaded", () => {
  const storedUserData = localStorage.getItem("userData");
  if (storedUserData) {
    userData = JSON.parse(storedUserData);
    displayUserData();
  }
});

document.getElementById("registrationForm").addEventListener("submit", handleRegSubmit);

document.getElementById("clearTableBtn").addEventListener("click", () => {
  userData = [];
  localStorage.removeItem("userData");
  displayUserData();
});
