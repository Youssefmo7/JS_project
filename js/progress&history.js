//import { courses } from "./data.js";

const courses = JSON.parse(localStorage.getItem("courses")) || []; // get courses from localstorage

// Data structure for courses
let ongoingCourses = JSON.parse(localStorage.getItem('currentUser')).courses
.filter(course => course.progress < 100);

if(ongoingCourses.length > 3) ongoingCourses = [ongoingCourses[0], ongoingCourses[1], ongoingCourses[2]];

ongoingCourses = ongoingCourses.map(ele => {
    let ret = courses.find(course => course.id == ele.id);
    ret.progress = ele.progress
    return ret;
});

let completedCourses = JSON.parse(localStorage.getItem('currentUser')).courses
.filter(course => course.progress == 100);

completedCourses = completedCourses.map(ele => {
    let ret = courses.find(course => course.id == ele.id);
    ret.date = ele.date;
    return ret;
});

const certificates = [
    {
        name: "Fundamentals of Programming"
    },
    {
        name: "Digital Marketing Strategy"
    },
    {
        name: "Basic Accounting Principles"
    }
];

// Render ongoing courses
function renderOngoingCourses() {
    const container = document.getElementById('ongoingCourses');
    container.innerHTML = ongoingCourses.map(course => `
        <div class="ph-course-item">
            <div class="ph-course-icon"><img src="./images/${course.image}" /></div>
            <div class="ph-course-details">
                <div class="ph-course-meta">
                    <div class="ph-course-title">${course.courseName}</div>
                </div>
                <div class="ph-instructor">Instructor: ${course.instructor.name}</div><br>
                <div class="ph-progress-bar">
                    <div class="ph-progress-fill" style="width: ${course.progress}%"></div>
                </div>
                <div class="ph-due-date">Progress: ${course.progress}%</div>
            </div>
            <button class="ph-resume-button" onclick="window.location.href='resume_course.html?id=${course.id}'">Resume</button>
        </div>
    `).join('');
}

// Render completed courses
function renderCompletedCourses() {
    const container = document.getElementById('completedCourses');
    container.innerHTML = completedCourses.map(course => `
        <div class="ph-completed-item">
            <div class="ph-check-icon">✓</div>
            <div class="ph-completed-details">
                <div class="ph-completed-title">${course.courseName}</div>
                <div class="ph-completed-desc">${course.description}</div>
            </div>
            <div class="ph-completion-date">${course.date}</div>
        </div>
    `).join('');
}

// Render certificates
function renderCertificates() {
    const container = document.getElementById('certificatesGrid');
    container.innerHTML = certificates.map((cert, index) => `
        <div class="ph-certificate-card">
            <div class="ph-certificate-preview">
                <div>Certificate</div>
            </div>
            <div class="ph-certificate-name">${cert.name}</div>
            <button class="ph-download-pdf-btn" onclick="downloadCertificate('${cert.name}')">
                <span>⬇️</span>
                <span>Download PDF</span>
            </button>
        </div>
    `).join('');
}

export {renderCertificates, renderOngoingCourses, renderCompletedCourses};
