import { courses } from "./data.js";

document.querySelector('.co-courses-elem').innerHTML = courses.map(course => `
  <div class="co-course-card" data-id="${course.id}">
    <img src="./images/${course.image}" alt="${course.courseName}" class="co-course-image">
    <span class="co-course-category">${course.category}</span>
    <div class="co-course-title">${course.courseName}</div>
    <div class="co-course-instructor">${course.instructor.name}</div>
    <div class="co-course-footer">
      <div class="co-course-price">$${course.price}</div> 
      <button class="co-wishlist-btn" data-id="${course.id}">Wishlist</button>
    </div>
  </div>
`).join("");


document.querySelectorAll('.co-course-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = `courseDetails.html?id=${card.dataset.id}`;
  })
})

document.querySelectorAll('.co-wishlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    btn.textContent = "Added";

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    // console.log(currentUser);
    currentUser.wishlist.push(btn.dataset.id);
    users.find(user => user.id == currentUser.id).wishlist.push(btn.dataset.id);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  })
})