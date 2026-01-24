import { courses } from "./data.js";
import { stripeLinks } from "./payment.js";

if (!JSON.parse(localStorage.getItem("currentUser"))) {
  window.location.href = "login.html";
}

let id = new URLSearchParams(window.location.search).get("id");
// console.log('Course ID:', id);
// console.log(window.location.search);

window.onload = () => {
  let params = new URLSearchParams(window.location.search);
  let status = params.get("status");
  let urlId = params.get("id");
  if (status === "success" && urlId) {
    unlockCourse(urlId);
    displayCourseDetails(urlId);
    renderButtons(urlId);
    //  console.log("after"+urlId);
  } else if (urlId) {
    //  console.log("before"+urlId);
    displayCourseDetails(urlId);
    renderButtons(urlId);
  }
};

function displayCourseDetails(id) {
  let course = courses.find((c) => c.id == id);
  // console.log(course);

  if (course) {
    document.querySelector(".cd-title").textContent = course.courseName;
    document.querySelector(".cd-section").textContent = course.category;
    document.querySelector(".cd-description").textContent = course.description;
    document.querySelector(".cd-course_title img").src =
      `./images/${course.image}`;
    document.querySelector(".cd-instructorDetails .cd-name").textContent =
      course.instructor.name;
    document.querySelector(".cd-instructorDetails img").src =
      `./images/${course.instructor.image}`;
    document.getElementById("course-price").textContent = `${course.price}$`;
    document.getElementById("course-duration").textContent = course.duration;

    let content = document.querySelector(".cd-content-list");
    course.content.forEach((line) => {
      let listItem = document.createElement("li");
      listItem.textContent = line;
      content.appendChild(listItem);
    });
  } else {
    document.body.innerHTML = "<h1>Error404: page not found</h1>";
  }
}

// enrollBtn.addEventListener('click', () => {
//     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     let users = JSON.parse(localStorage.getItem('users'));
//     console.log(currentUser);

//     enrollBtn.style.setProperty('background-color', '#0ee00e');
//     enrollBtn.textContent = "Enrolled";
//     currentUser.courses.push({id: id, progress: 100, date: new Date().toDateString()});
//     users.find(user => user.id == currentUser.id).courses.push({id: id, progress: 0});
//     localStorage.setItem('users', JSON.stringify(users));
//     localStorage.setItem('currentUser', JSON.stringify(currentUser));
// })

// payment first instead enroll directly

// let enrollBtn = document.getElementById('cd-enrollBtn');
// let currentUser = JSON.parse(localStorage.getItem('currentUser'));
// const isEnrolled = currentUser?.courses?.some(c => c.id == id); // check if this courseId exists

// if (isEnrolled) {
//     enrollBtn.style.backgroundColor = '#0ee00e';
//     enrollBtn.textContent = "Resume";
//     enrollBtn.disabled = true;
// }

// if enroll
document.getElementById("cd-enrollBtn").addEventListener("click", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    window.location.href = "login.html"; // if not logged in redirect to login page
    return;
  }

  window.location.href = stripeLinks[id]; //redirect to payment page for this course
});

//if resume
document.getElementById('cd-resumeBtn').addEventListener('click', () => {
    window.location.href =`resume_course.html?id=${id}`;
});

//console.log(" users :", JSON.parse(localStorage.getItem("users")));
function unlockCourse(id) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let users = JSON.parse(localStorage.getItem("users"));

  if (!currentUser || !users) return;

  // check if already in the list
  let alreadyOwns = currentUser.courses.find((c) => c.id == id);

  if (!alreadyOwns) {
    let newCourse = {
      id: parseInt(id),
      progress: 0,
      date: new Date().toLocaleDateString(),
    };

    //  console.log(newCourse);
    //  console.log(id);

    // update current session
    currentUser.courses.push(newCourse);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    // update  users list
    const userInList = users.find((u) => u.email == currentUser.email);

    if (userInList) {
      if (!userInList.courses) userInList.courses = [];

      userInList.courses.push(newCourse);
      localStorage.setItem("users", JSON.stringify(users)); // This saves it forever
     
    }
  }

  let cleanURL = window.location.pathname + `?id=${id}`; // clean url but id exist
  window.history.replaceState({}, document.title, cleanURL);
}

// which buuton will appear
function renderButtons(id) {
  let enrollBtn = document.getElementById("cd-enrollBtn");
  let resumeBtn = document.getElementById("cd-resumeBtn");

  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // check ownership
  let isEnrolled = currentUser?.courses?.find((c) => c.id == id);

  if (isEnrolled) {
    enrollBtn.style.display = "none";
    resumeBtn.style.display = "block";
  } else {
    enrollBtn.style.display = "block";
    resumeBtn.style.display = "none";
  }
}
