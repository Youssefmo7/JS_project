
const courseCards = document.querySelectorAll('.wl-course-card');

courseCards.forEach(card => {
  const enrollBtn = card.querySelector('#wl-enroll');
  const removeBtn = card.querySelector('#wl-remove');
  
  // enroll button click handler
  if (enrollBtn) {
    enrollBtn.addEventListener('click', function() {
      this.value = 'Enrolled';
      this.disabled = true; // to prevent user from multiple click
      
      this.style.backgroundColor = '#28a745';
      this.style.cursor = 'not-allowed';
      this.style.opacity = '0.7';
      
      console.log('Successfully enrolled in course');
    });
  }
  
  // remove button click handler
  if (removeBtn) {
    removeBtn.addEventListener('click', function() {
      // to make this card be out from page
      card.style.transition = 'all 0.4s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateX(-20px)';
      
      // remove the card from list
       setTimeout(() => {
        card.remove();
        //cCheck if wishlist is empty
        const remainingCards = document.querySelectorAll('.wl-course-card');
        if (remainingCards.length === 0) {
          const emptyMessage = document.querySelector('.empty-wishlist');
          if (emptyMessage) {
            emptyMessage.style.display = 'block';
          }
        }
      }, 400);
    });
  }
});

// search functionality
const searchBar = document.querySelector('.wl-search-bar');
if (searchBar) {
  searchBar.addEventListener('input', function() {
    const searchValue = this.value.toLowerCase();
    const cards = document.querySelectorAll('.wl-course-card');
    
    cards.forEach(card => {
      const title = card.querySelector('.wl-course-title').textContent.toLowerCase();
      const instructor = card.querySelector('.wl-course-instructor').textContent.toLowerCase();
      
      if (title.includes(searchValue) || instructor.includes(searchValue)) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

