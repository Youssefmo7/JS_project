// Dynamic course data
        const courseData = {
            title: "Data Science Bootcamp",
            description: "Learn the fundamentals of data",
            price: 149.99,
            instructor: "Jane Doe",
            duration: "10 Weeks"
        };

        // Function to update course information
        function updateCourseInfo(data) {
            document.getElementById('courseTitle').textContent = data.title;
            document.getElementById('courseDescription').textContent = data.description;
            document.getElementById('coursePrice').textContent = `$${data.price.toFixed(2)}`;
            document.getElementById('instructor').textContent = data.instructor;
            document.getElementById('duration').textContent = data.duration;
        }

        // Toggle alternative payment options
        function toggleAlternatives() {
            const options = document.getElementById('paymentOptions');
            options.classList.toggle('pay-active');
        }

        // Process PayPal payment
        function processPayment() {
            alert(`Processing PayPal payment of $${courseData.price.toFixed(2)} for ${courseData.title}`);
        }

        // Select alternative payment method
        function selectPayment(method) {
            alert(`Selected payment method: ${method}\nAmount: $${courseData.price.toFixed(2)}`);
        }

        // Initialize page with course data
        updateCourseInfo(courseData);

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