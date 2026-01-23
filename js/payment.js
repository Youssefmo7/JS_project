// Dynamic course data
        const courseData = {
            title: "Data Science Bootcamp",
            description: "Learn the fundamentals of data",
            price: 149.99,
            instructor: "Jane Doe",
            duration: "10 Weeks"
        };

        // // Function to update course information
        // function updateCourseInfo(data) {
        //     document.getElementById('courseTitle').textContent = data.title;
        //     document.getElementById('courseDescription').textContent = data.description;
        //     document.getElementById('coursePrice').textContent = `$${data.price.toFixed(2)}`;
        //     document.getElementById('instructor').textContent = data.instructor;
        //     document.getElementById('duration').textContent = data.duration;
        // }

        // // Toggle alternative payment options
        // function toggleAlternatives() {
        //     const options = document.getElementById('paymentOptions');
        //     options.classList.toggle('pay-active');
        // }

        // // Process PayPal payment
        // function processPayment() {
        //    // alert(`Processing PayPal payment of $${courseData.price.toFixed(2)} for ${courseData.title}`);
        //    window.location.href = "https://buy.stripe.com/test_cNifZgar03mR2PGarQ8so00";
        // }

        // // Select alternative payment method
        // function selectPayment(method) {
        //     alert(`Selected payment method: ${method}\nAmount: $${courseData.price.toFixed(2)}`);
        // }

        // // Initialize page with course data
        // updateCourseInfo(courseData);

        // Example: Update course dynamically after 3 seconds (demonstration)
        // Uncomment to see dynamic updates
        /*
        setTimeout(() => {
            updateCourseInfo({
                title: "Advanced Machine Learning",
                description: "Master ML algorithms and techniques",
                price: 299.99,
                instructor: "Dr. John Smith",
                duration: "12 Weeks"
            });
        }, 3000);
        */
    export const stripeLinks = {
    1: "https://buy.stripe.com/test_cNifZgar03mR2PGarQ8so00", 
    2: "https://buy.stripe.com/test_bJebJ08iS5uZ3TKbvU8so01", 
    3: "https://buy.stripe.com/test_bJebJ0ar06z30HygQe8so02", 
    4: "https://buy.stripe.com/test_5kQ00i2YyaPj75WfMa8so03", 
    5: "https://buy.stripe.com/test_eVq3cugPoaPjduk0Rg8so04",
    6: "https://buy.stripe.com/test_bJedR82Yy0aF61S8jI8so05",
    7: "https://buy.stripe.com/test_9B65kC2Yyg9D1LC9nM8so06",
    8: "https://buy.stripe.com/test_dRm6oGfLkbTnduk6bA8so07",
    9: "https://buy.stripe.com/test_28E00i9mWe1vduk57w8so08",
    10: "https://buy.stripe.com/test_eVqdR87eO9Lfai88jI8so09"
};