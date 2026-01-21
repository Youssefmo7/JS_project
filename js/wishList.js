import { courses } from "./data.js";

export function renderWishlist() {
  let parent = document.querySelector('.wl-container');
  let wishlistIds = JSON.parse(localStorage.getItem('currentUser')).wishlist;
  // console.log(wishlist);

  let wishlist = wishlistIds.forEach(id => {
    let course = courses.find(ele => ele.id == id);
    let div = document.createElement('div');
    div.classList.add('wl-course-card');
    div.innerHTML = `
      <img src="./images/${course.image}" alt="course image" />
      <div class="wl-course-info">
        <div class="wl-course-title">${course.courseName}</div> 
        <div class="wl-course-instructor">${course.instructor.name}</div>
      </div>
      <input type="button" id="wl-enroll" value="View" data-id="${course.id}"/>
      <input type="button" id="wl-remove" value="Remove" data-id="${course.id}"/>
    `
    parent.appendChild(div);
  });

  // Add event listeners for View buttons
  document.querySelectorAll('#wl-enroll').forEach(button => {
    button.addEventListener('click', function() {
      window.location.href = `./courseDetails.html?id=${button.dataset.id}`;
    });
  });

  document.querySelectorAll('input[value="Remove"]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.target.parentElement.style.setProperty('display', 'none');
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let users = JSON.parse(localStorage.getItem('users'));

      let newList = currentUser.wishlist.filter(ele => ele != btn.dataset.id);
      currentUser.wishlist = newList;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    })
  })
}
