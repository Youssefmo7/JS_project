import {courses} from './data.js'



let id = new URLSearchParams(window.location.search).get('id');
// console.log('Course ID:', id);
// console.log(window.location.search);


let course = courses.find(c => c.id == id);
// console.log(course);

if (course) {
    document.querySelector('.cd-title').textContent = course.courseName;
    document.querySelector('.cd-section').textContent = course.category;
    document.querySelector('.cd-description').textContent = course.description;
    document.querySelector('.cd-course_title img').src = `./images/${course.image}`;
    document.querySelector('.cd-instructorDetails .cd-name').textContent = course.instructor.name;
    document.querySelector('.cd-instructorDetails img').src = `./images/${course.instructor.image}`;
    document.getElementById('course-price').textContent = `${course.price}$`;
    document.getElementById('course-duration').textContent = course.duration;

    let content = document.querySelector('.cd-content-list');
    course.content.forEach(line => {
        let listItem = document.createElement('li');
        listItem.textContent = line;
        content.appendChild(listItem);
    })
} else {
    document.body.innerHTML = "<h1>Error404: page not found</h1>";
}


let enrollBtn = document.getElementById('cd-enrollBtn');
if(JSON.parse(localStorage.getItem('currentUser')).courses.find(c => c.id == id)) {
    enrollBtn.style.setProperty('background-color', '#0ee00e');
    enrollBtn.textContent = "Enrolled";
} else {
    enrollBtn.addEventListener('click', () => {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let users = JSON.parse(localStorage.getItem('users'));
        console.log(currentUser);
        
        enrollBtn.style.setProperty('background-color', '#0ee00e');
        enrollBtn.textContent = "Enrolled";
        currentUser.courses.push({id: id, progress: 0});
        users.find(user => user.id == currentUser.id).courses.push({id: id, progress: 0});
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    })
}
