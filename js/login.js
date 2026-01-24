let loginForm = document.querySelector("form");


if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let rememberMe = document.getElementById("remember_me").checked;

    if (!email || !password) {
      showError("Please fill in all fields.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let userMatch = users.find(
      (user) => user.email === email && user.password === password,
    );

    if (userMatch) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userMatch));

      if (!rememberMe) {
        sessionStorage.setItem("tempSession", "true");
      }

      // checkm if admin or student
      if (userMatch.role === "admin") {
        window.location.href = "admin_dashboard.html";
      } else {
        window.location.href = "student_dashboard.html";
      }
    } else {
      showError("Invalid email or password.");
    }
  });
}

function showError(message) {
  const existingError = loginForm.querySelector(".error-message");
  if (existingError) existingError.remove();
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "#d32f2f";
  errorDiv.style.padding = "10px";
  errorDiv.style.marginTop = "10px";
  errorDiv.style.backgroundColor = "#ffebee";
  errorDiv.style.borderRadius = "5px";
  errorDiv.style.border = "1px solid #f44336";

  loginForm.appendChild(errorDiv);
}


// function initializeAdmin() {
//     let users = JSON.parse(localStorage.getItem("users")) || [];

//     const adminExists = users.some(u => u.role === "admin");

//     if (!adminExists) {
//         const adminUser = {
//             id: 100, 
//             firstName: "System",
//             lastName: "Admin",
//             email: "admin@learnhub.com",
//             password: "Admin123!", // Make sure this passes your Regex!
//             role: "admin",
//             courses: []
//         };
//         users.push(adminUser);
//         localStorage.setItem("users", JSON.stringify(users));
//         console.log("Default admin created: admin@learnhub.com");
//     }
// }

// initializeAdmin(); // Run this when the script loads