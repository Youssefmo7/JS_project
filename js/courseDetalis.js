 // Course data object
        const courseData = {
            title: "Machine Learning Fundamentals",
            category: "Computer Science",
            instructor: "Dr. Anya Sharma",
            price: "$199",
            duration: "12 Weeks",
            image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop",
            description1: "Machine Learning dolor Sit amet, Consectetue sunur elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrod exercitation en ullanco laboris nisi ut aliquip ox: ex ea commodo consequat. Lubors nisi ut aliquip ea learning exenmiss not tn:asscunt reproharn. In voluptate allum dolor in repoonontmodo consequat. Duis aute irure dolor in repohenderit in auiatat voluptate viatos ut aliquip ex ea commodo consequat.",
            description2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrod exercitation en exercitation ullanco laboris nisi ut aliquip ex ea commodo consequat. Duiscamte a eu ixerumir consequat. Duis aute irene intern quis volit esse cilllit dorr in exae eum ali. reprehenderit in voluptate dolore magna aliqua mollit anim id."
        };

        // Update course information
        function updateCourse(data) {
            document.getElementById('courseTitle').textContent = data.title;
            document.getElementById('category').textContent = data.category;
            document.getElementById('instructorName').textContent = data.instructor;
            document.getElementById('price').textContent = data.price;
            document.getElementById('duration').textContent = data.duration;
            document.getElementById('heroImage').src = data.image;
            document.getElementById('description1').textContent = data.description1;
            document.getElementById('description2').textContent = data.description2;
        }

        // Toggle content accordion
        function toggleContent(element) {
            element.classList.toggle('active');
        }

        // Enroll now function
        function enrollNow() {
            const courseName = document.getElementById('courseTitle').textContent;
            const price = document.getElementById('price').textContent;
            alert(`Enrolling in: ${courseName}\nPrice: ${price}`);
        }

        // Initialize the page
        updateCourse(courseData);
  