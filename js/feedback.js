const form = document.getElementById('feedbackForm');
const successMessageContainer = document.getElementById('successMessageContainer');
const submitBtn = document.querySelector('.fb-submit-btn');

function showSuccessMessage() {
    successMessageContainer.innerHTML = `
        <div class="success-message">
            <div class="success-icon">✓</div>
            <div class="success-text">Thank you! Your feedback has been submitted successfully.</div>
        </div>
    `;

    setTimeout(() => {
        successMessageContainer.innerHTML = '';
    }, 4000);
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const courseName = document.getElementById('courseName').value;
    const rating = document.getElementById('rating').value;
    const comments = document.getElementById('comments').value;

    // Disable button temporarily
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    setTimeout(() => {
        // Clear form
        form.reset();
        
        // Show success message
        showSuccessMessage();

        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Feedback';
    }, 500);
});