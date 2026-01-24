// Get form elements
const form = document.querySelector("form");
const firstNameInput = document.getElementById("name");
const lastNameInput = document.querySelector('input[placeholder="Last"]');
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("re-password");
const femaleRadio = document.getElementById("female");
const maleRadio = document.getElementById("male");

// email validation
function isValidEmail(email) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return emailRegex.test(email);
}

function emailExists(email) {
  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  return existingUsers.some(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );
}
// password lenght
function isStrongPassword(password) {
  return password.length >= 8;
}

// show error message
function showError(input, message) {
  // remove existing error if any
  const existingError = input.parentElement.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }

  // create and add new error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "12px";
  errorDiv.style.marginTop = "5px";
  errorDiv.textContent = message;
  input.parentElement.appendChild(errorDiv);
  input.style.borderColor = "red";
}

// remove error message
function clearError(input) {
  const errorDiv = input.parentElement.querySelector(".error-message");
  if (errorDiv) {
    errorDiv.remove();
  }
  input.style.borderColor = "";
}

// real-time validation
firstNameInput.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    showError(this, "First name is required");
  } else {
    clearError(this);
  }
});

lastNameInput.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    showError(this, "Last name is required");
  } else {
    clearError(this);
  }
});

emailInput.addEventListener("blur", function () {
  if (this.value.trim() === "") {
    showError(this, "Email is required");
  } else if (!isValidEmail(this.value)) {
    showError(this, "Please enter a valid email address");
  } else if (emailExists(this.value.trim())) {
    showError(this, "This email is already registered");
  } else {
    clearError(this);
  }
});

passwordInput.addEventListener("blur", function () {
  if (this.value === "") {
    showError(this, "Password is required");
  } else if (!isStrongPassword(this.value)) {
    showError(this, "Password must be at least 8 characters long");
  } else {
    clearError(this);
  }
});

repeatPasswordInput.addEventListener("blur", function () {
  if (this.value === "") {
    showError(this, "Please repeat your password");
  } else if (this.value !== passwordInput.value) {
    showError(this, "Passwords do not match");
  } else {
    clearError(this);
  }
});

// form submission handler
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear all previous errors
  clearError(firstNameInput);
  clearError(lastNameInput);
  clearError(emailInput);
  clearError(passwordInput);
  clearError(repeatPasswordInput);

  let isValid = true;

  // validate first name
  if (firstNameInput.value.trim() === "") {
    showError(firstNameInput, "First name is required");
    isValid = false;  
  }

  // Validate last name
  if (lastNameInput.value.trim() === "") {
    showError(lastNameInput, "Last name is required");
    isValid = false;
  }

  // validate email
  if (emailInput.value.trim() === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailInput.value)) {
    showError(emailInput, "Please enter a valid email address");
    isValid=false;
  }else if (emailExists(emailInput.value.trim())) {
    showError(emailInput, 'This email is already registered');
    isValid = false;
  }

  // validate gender selection
  if (!femaleRadio.checked && !maleRadio.checked) {
    alert("Please select a gender");
    isValid = false;
  }

  // validate password
  if (passwordInput.value === "") {
    showError(passwordInput, "Password is required");
    isValid = false;
  } else if (!isStrongPassword(passwordInput.value)) {
    showError(passwordInput, "Password must be at least 8 characters long");
    isValid = false;
  }

  // validate repeat password
  if (repeatPasswordInput.value === "") {
    showError(repeatPasswordInput, "Please repeat your password");
    isValid = false;
  } else if (repeatPasswordInput.value !== passwordInput.value) {
    showError(repeatPasswordInput, "Passwords do not match");
    isValid = false;
  }

  // if all data valid submit it
  if (isValid) {
    const userData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      email: emailInput.value.trim(),
      gender: femaleRadio.checked ? "female" : "male",
      password: passwordInput.value,
      role :"student",
      courses: [],
      wishlist: [],
      certificates: []
    };

    // console.log('Form submitted successfully:', formData);
    const existingUsers = JSON.parse(localStorage.getItem("users")) || []; // convert it from json to object js
    existingUsers.push(userData); // add new user to array

    localStorage.setItem("users", JSON.stringify(existingUsers)); // convert it to json and store it

    // reset form
    form.reset();

    // redirect to login page after 1 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
});
