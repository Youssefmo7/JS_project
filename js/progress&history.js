
        // Data structure for courses
        const ongoingCourses = [
            {
                icon: "📊",
                title: "Introduction to Data Science",
                instructor: "James Duntorr",
                progress: 65,
                dueDate: "Nov 15"
            },
            {
                icon: "💻",
                title: "Advanced JavaScript Workshop",
                instructor: "Code Shifty",
                progress: 40,
                dueDate: "Dec 01"
            },
            {
                icon: "✏️",
                title: "User Experience Design Fundamentals",
                instructor: "John Firman",
                progress: 80,
                dueDate: "Oct 30"
            }
        ];

        const completedCourses = [
            {
                title: "Fundamentals of Programming",
                description: "Achieved an overall grade of A+",
                date: "Sep 10, 2023"
            },
            {
                title: "Digital Marketing Strategy",
                description: "Mastered key concepts in SEO and social media.",
                date: "Aug 22, 2023"
            },
            {
                title: "Basic Accounting Principles",
                description: "Successfully learned financial statement analysis.",
                date: "Jul 05, 2023"
            }
        ];

        const certificates = [
            {
                name: "Fundamentals of Programming"
            },
            {
                name: "Digital Marketing Strategy"
            },
            {
                name: "Basic Accounting Principles"
            }
        ];

        // Render ongoing courses
        function renderOngoingCourses() {
            const container = document.getElementById('ongoingCourses');
            container.innerHTML = ongoingCourses.map(course => `
                <div class="course-item">
                    <div class="course-icon">${course.icon}</div>
                    <div class="course-details">
                        <div class="course-meta">
                            <div class="course-title">${course.title}</div>
                            <div class="progress-info">${course.progress}% Complete</div>
                        </div>
                        <div class="instructor">Instructor: ${course.instructor}</div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${course.progress}%"></div>
                        </div>
                        <div class="due-date">Due: ${course.dueDate}</div>
                    </div>
                    <button class="resume-button" onclick="resumeCourse('${course.title}')">Resume</button>
                </div>
            `).join('');
        }

        // Render completed courses
        function renderCompletedCourses() {
            const container = document.getElementById('completedCourses');
            container.innerHTML = completedCourses.map(course => `
                <div class="completed-item">
                    <div class="check-icon">✓</div>
                    <div class="completed-details">
                        <div class="completed-title">${course.title}</div>
                        <div class="completed-desc">${course.description}</div>
                    </div>
                    <div class="completion-date">${course.date}</div>
                </div>
            `).join('');
        }

        // Render certificates
        function renderCertificates() {
            const container = document.getElementById('certificatesGrid');
            container.innerHTML = certificates.map((cert, index) => `
                <div class="certificate-card">
                    <div class="certificate-preview">
                        <div>Certificate</div>
                    </div>
                    <div class="certificate-name">${cert.name}</div>
                    <button class="download-pdf-btn" onclick="downloadCertificate('${cert.name}')">
                        <span>⬇️</span>
                        <span>Download PDF</span>
                    </button>
                </div>
            `).join('');
        }

        // Resume course function
        function resumeCourse(courseName) {
            alert(`Resuming course: ${courseName}`);
        }

        // Download certificate function
        function downloadCertificate(certName) {
            alert(`Downloading certificate: ${certName}`);
        }

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            console.log('Searching for:', searchTerm);
            // Add search logic here
        });

        // Initialize the page
        renderOngoingCourses();
        renderCompletedCourses();
        renderCertificates();

        //////////////////////////////////

        let dashboard_icon = document.querySelector('#dashboard_icon');
        dashboard_icon.addEventListener("click", () => {
            window.location.href = "student_dashboard.html";
        })
