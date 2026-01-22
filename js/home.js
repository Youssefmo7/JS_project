
let loginBtn = document.querySelector('.btn-login');
let registerBtn = document.querySelector('.btn-register');
let allCourseBtn = document.querySelector('.btn-courses');

document.getElementById('logout-btn').addEventListener('click', (e) => {
  localStorage.setItem('currentUser', JSON.stringify({}));
  localStorage.setItem('isLoggedIn', 'false');
  document.querySelector('.header-buttons').style.display = 'flex'
  document.querySelector('.header-buttons-login').style.display = 'none'
  window.location.href = 'home.html';
})


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

if(JSON.parse(localStorage.getItem('isLoggedIn'))) {
  document.querySelector('.header-buttons').style.display = 'none'
  document.querySelector('.header-buttons-login').style.display = 'flex'
}
document.getElementById('profile-btn').addEventListener('click', e => {
  document.querySelector('.header-buttons-login .nav-popup').classList.toggle('show');
})  