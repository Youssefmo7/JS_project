
let loginBtn = document.querySelector('.btn-login');
let registerBtn = document.querySelector('.btn-register');
let allCourseBtn = document.querySelector('.btn-courses');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    window.location.href = "./login.html";
  });
}

if (registerBtn) {
  registerBtn.addEventListener('click', () => {
    window.location.href = "./register.html";
  });
}

if (allCourseBtn) {
  allCourseBtn.addEventListener('click', () => {
    window.location.href = "./courses.html";
  });
}

