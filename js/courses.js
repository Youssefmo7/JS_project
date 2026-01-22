import { courses } from "./data.js";

let wishlist = JSON.parse(localStorage.getItem('currentUser')).wishlist;
let loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
// console.log(loggedIn, typeof(loggedIn));

document.querySelector('.co-courses-elem').innerHTML = courses.map(course => {
  let text = "Wishlist";
  let style = "";
  // console.log(wishlist.indexOf(`${course.id}`));
  if(loggedIn && wishlist.indexOf(`${course.id}`) != -1) {
    text = "Added";
    style = "background-color: #0fc60f; color: white; border-color:#0fc60f; font-weight:bold;";
  }
  let innerHTML = `
  <div class="co-course-card" data-id="${course.id}">
    <img src="./images/${course.image}" alt="${course.courseName}" class="co-course-image">
    <span class="co-course-category">${course.category}</span>
    <div class="co-course-title">${course.courseName}</div>
    <div class="co-course-instructor">${course.instructor.name}</div>
    <div class="co-course-footer">
      <div class="co-course-price">$${course.price}</div> 
      <button class="co-wishlist-btn" style="${style}" data-id="${course.id}">${text}</button>
    </div>
  </div>
  `
  return innerHTML;
}).join("");


document.querySelectorAll('.co-course-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = `courseDetails.html?id=${card.dataset.id}`;
  })
})

// document.querySelector().style.cssText

document.querySelectorAll('.co-wishlist-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();

    btn.textContent = "Added";
    btn.style.cssText = "background-color: #0fc60f; color: white; border-color:#0fc60f; font-weight:bold;";
    // btn.removeEventListener('click');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let users = JSON.parse(localStorage.getItem('users'));
    // console.log(currentUser);
    let wishlist = [...new Set([...currentUser.wishlist, btn.dataset.id])];
    currentUser.wishlist = wishlist;
    users.find(user => user.id == currentUser.id).wishlist = wishlist;
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  })
})