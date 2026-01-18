
    const form = document.getElementById('feedbackForm');
        const feedbackList = document.getElementById('feedbackList');

        function getStars(rating) {
            const filled = '★';
            const empty = '☆';
            return filled.repeat(rating) + empty.repeat(5 - rating);
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const courseName = document.getElementById('courseName').value;
            const rating = document.getElementById('rating').value;
            const comments = document.getElementById('comments').value;

            const feedbackItem = document.createElement('div');
            feedbackItem.className = 'fb-item';
            feedbackItem.style.animation = 'slideIn 0.3s ease';
            
            feedbackItem.innerHTML = `
                <div class="fb-item-header">
                    <div class="fb-item-title">${courseName}</div>
                    <div class="fb-item-stars">${getStars(parseInt(rating))}</div>
                </div>
                ${comments ? `<div class="fb-item-comment">${comments}</div>` : ''}
            `;

            feedbackList.insertBefore(feedbackItem, feedbackList.firstChild);

            form.reset();

            feedbackItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
