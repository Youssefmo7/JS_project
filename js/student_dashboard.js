import {courses} from './data.js';
import {renderCertificates, renderOngoingCourses, renderCompletedCourses} from "./progress&history.js";

if(!JSON.parse(localStorage.getItem('currentUser'))) {
    window.location.href = 'login.html';
}

const pages = {
    courses : `
    <div class="sd-search-header">
        <div class="sd-search-bar">
            <div class="sd-icon1">
                <svg xmlns="http://www.w3.org/2000/svg" style="width:20px; height:20px; color: #aaa" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>
            <input type="text" placeholder="Search courses, topics, or instructors...">
        </div>
        <div class="sd-filter-btn">
            <svg xmlns="http://www.w3.org/2000/svg" style="width: 20px; margin-right:8px;" fill="none" viewBox="0 -3 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>Filter
        </div>
    </div>
    <div class="sd-courses"></div>
    `,
    progress : `
    <div class="ph-content-area">
            <div class="ph-top-bar">
                <h2 class="ph-content-title">Progress</h2>
            </div>
            
            <div class="ph-content-grid">
                <div class="ph-section-card">
                    <h3 class="ph-section-title">Ongoing Courses</h3>
                    <div id="ongoingCourses"></div>
                </div>
                
                <div class="ph-section-card">
                    <h3 class="ph-section-title">My Certificates</h3>
                    <div class="ph-certificates-grid" id="certificatesGrid"></div>
                </div>
            </div>
            
            <div class="ph-section-card">
                <h3 class="ph-section-title">Completed Courses</h3>
                <div id="completedCourses"></div>
            </div>
            
            <div class="ph-footer">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Contact Us</a>
            </div>
        </div>
    `,
    wishlist : `
    <div class="wl-container">

      <div class="wl-course-card">
        <img src="./images/programming.jpeg" alt="course image" />
        <div class="wl-course-info">
          <div class="wl-course-title">Programming By C++</div>
          <div class="wl-course-instructor">Eng Merihan Mohamed</div>
        </div>
        <input type="button" id="wl-enroll" value="Enroll" />
        <input type="button" id="wl-remove" value="Remove" />
      </div>

      <div class="wl-course-card">
        <img src="./images/programming.jpeg" alt="course image" />
        <div class="wl-course-info">
          <div class="wl-course-title">Programming By C++</div>
          <div class="wl-course-instructor">Eng Merihan Mohamed</div>
        </div>
        <input type="button" id="wl-enroll" value="Enroll" />
        <input type="button" id="wl-remove" value="Remove" />
      </div>
      <div class="wl-course-card">
        <img src="./images/programming.jpeg" alt="course image" />
        <div class="wl-course-info">
          <div class="wl-course-title">Programming By C++</div>
          <div class="wl-course-instructor">Eng Merihan Mohamed</div>
        </div>
        <input type="button" id="wl-enroll" value="Enroll" />
        <input type="button" id="wl-remove" value="Remove" />
      </div>
    </div>
    `,

}

let content = document.querySelector(".sd-main");
let dash_buttons = document.querySelectorAll("[data-page]")

dash_buttons.forEach(btn => {
    btn.addEventListener("click", () => {
    content.innerHTML = pages[btn.dataset.page];
    dash_buttons.forEach(ele => {ele.classList.remove('sd-selected')});
    btn.classList.add('sd-selected');

    if(btn.dataset.page === 'progress'){
        renderCertificates();
        renderOngoingCourses();
        renderCompletedCourses();
    } else if(btn.dataset.page === 'courses') {
        renderStudentCourses();
    }
  });
});

///////////////////////////

function renderStudentCourses() {
    let coursesCards = document.querySelector('.sd-courses');
    let studentCourses = JSON.parse(localStorage.getItem('currentUser'));
    studentCourses = studentCourses.courses;
    studentCourses.forEach(course => {
        if(course.id < 100) {
            let courseData = courses.find(ele => ele.id == course.id);
            let card = document.createElement('div');
            card.classList.add('sd-course-card');
            card.innerHTML = 
            `
            <img class="sd-image" src="./images/${courseData.image}" alt="${courseData.courseName}">
            <p class="sd-name">${courseData.courseName}</p>
            <p class="sd-description">${courseData.description}</p>
            <p class="sd-instructor">Instructor: ${courseData.instructor.name}</p>
            <div class="sd-progress">
                <div class="sd-progress-bar">
                    <div class="sd-bar"><div class="sd-fill" style="width:${course.progress}%;"></div></div>
                    <p class="sd-percent">${course.progress}% Complete</p>
                </div>
                <button class="sd-resume-btn">Resume</button>
            </div>
            `;

            coursesCards.appendChild(card);
        }
    })
}