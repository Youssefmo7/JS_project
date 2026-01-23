const loginForm = document.querySelector("form");

if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();
   
    const rememberMe = document.getElementById("remember_me").checked;

    if (!email || !password) {
      showError("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

   
    const userMatch = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userMatch) {
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userMatch));
      
      if (!rememberMe) {
        sessionStorage.setItem("tempSession", "true");
      }

      window.location.href = "student_dashboard.html";
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
