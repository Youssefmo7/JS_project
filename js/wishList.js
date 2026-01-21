let courseCards = document.querySelectorAll('.wl-course-card');

courseCards.forEach(card => {
  // Select buttons SPECIFIC to this individual card
  let viewBtn = card.querySelector('.wl-view'); // Use a class if there are many
  let removeBtn = card.querySelector('.wl-remove');

  // view button
  if (viewBtn) {
    viewBtn.addEventListener("click", function() {
      window.location.href = "courseDetails.html"; 
    });
  }

  // remove button
  if (removeBtn) {
    removeBtn.addEventListener('click', function() {
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        card.remove();
        // check if wishlist is empty
        if (document.querySelectorAll('.wl-course-card').length === 0) {
          const emptyMessage = document.querySelector('.empty-wishlist');
          if (emptyMessage) emptyMessage.style.display = 'block';
        }
      }, 400);
    });
  }
});


// search functionality
let searchBar = document.querySelector(".wl-search-bar");
if (searchBar) {
  searchBar.addEventListener("input", function () {
    let searchValue = this.value.toLowerCase();
    let cards = document.querySelectorAll(".wl-course-card");

    cards.forEach((card) => {
      let title = card
        .querySelector(".wl-course-title")
        .textContent.toLowerCase();
      let instructor = card
        .querySelector(".wl-course-instructor")
        .textContent.toLowerCase();

      if (title.includes(searchValue) || instructor.includes(searchValue)) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
}
