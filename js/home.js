import { courses } from "./data.js";

//////////////////////////////////////////////////////////////////////////////////////////////////////
//to make admin control courses we will copy data from ./data.js to localstorage and make admin conrol it
// import { courses as manualCourses } from "./data.js";


// function copyDataInLocal() {
//    //if courses is empty
//     const storedCourses = localStorage.getItem("courses");

//     if (!storedCourses) {
//         // If not, take the manual courses from data.js and save them to localStorage
//         localStorage.setItem("courses", JSON.stringify(manualCourses));
//     }
// }

// copyDataInLocal();

// const courses = JSON.parse(localStorage.getItem("courses")) || []; // get courses from localstorage

//////////////////////////////////////////////////////////////////////////////////////////

let loginBtn = document.querySelector('.btn-login');
let registerBtn = document.querySelector('.btn-register');
let allCourseBtn = document.querySelector('.btn-courses');
let currentUser = JSON.parse(localStorage.getItem("currentUser"));


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


let profileName = document.querySelector("#profile-btn p");
let profileImg = document.querySelector("#profile-btn img");

if(JSON.parse(localStorage.getItem('isLoggedIn')) &&currentUser) {
  document.querySelector('.header-buttons').style.display = 'none'
  document.querySelector('.header-buttons-login').style.display = 'flex'

  profileName.textContent = `${currentUser.firstName} ${currentUser.lastName || ""}`;
  
  if (currentUser.avatar) {
    profileImg.src = `./images/${currentUser.avatar}`;
}
document.getElementById('profile-btn').addEventListener('click', e => {
  document.querySelector('.header-buttons-login .nav-popup').classList.toggle('show');
})  
}


document.querySelector('.cards').innerHTML = courses
  .slice(0, 4)
  .map(course => `
    <div class="course-card">
      <img src="./images/${course.image}" alt="${course.courseName}" class="h-courseImg">
      <div class="course-info">
        <span class="rating">★ 4.8</span>
        <h3 class="course-name">${course.courseName}</h3>
        <p class="course-ins">${course.instructor.name}</p>
        <div class="course-details">
          <span>👥 15.2K</span>
          <span class="course-duration">${course.duration}</span>
        </div>
        <div class="course-footer">
          <span class="price">${course.price}$</span>
          <button class="btn-view" onclick="window.location.href='courseDetails.html?id=${course.id}'">View</button>
        </div>
      </div>
    </div>
  `).join("");

  // view bitton
