
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
                <div class="ph-course-item">
                    <div class="ph-course-icon">${course.icon}</div>
                    <div class="ph-course-details">
                        <div class="ph-course-meta">
                            <div class="ph-course-title">${course.title}</div>
                            <div class="ph-progress-info">${course.progress}% Complete</div>
                        </div>
                        <div class="ph-instructor">Instructor: ${course.instructor}</div>
                        <div class="ph-progress-bar">
                            <div class="ph-progress-fill" style="width: ${course.progress}%"></div>
                        </div>
                        <div class="ph-due-date">Due: ${course.dueDate}</div>
                    </div>
                    <button class="ph-resume-button" onclick="resumeCourse('${course.title}')">Resume</button>
                </div>
            `).join('');
        }

        // Render completed courses
        function renderCompletedCourses() {
            const container = document.getElementById('completedCourses');
            container.innerHTML = completedCourses.map(course => `
                <div class="ph-completed-item">
                    <div class="ph-check-icon">✓</div>
                    <div class="ph-completed-details">
                        <div class="ph-completed-title">${course.title}</div>
                        <div class="ph-completed-desc">${course.description}</div>
                    </div>
                    <div class="ph-completion-date">${course.date}</div>
                </div>
            `).join('');
        }

        // Render certificates
        function renderCertificates() {
            const container = document.getElementById('certificatesGrid');
            container.innerHTML = certificates.map((cert, index) => `
                <div class="ph-certificate-card">
                    <div class="ph-certificate-preview">
                        <div>Certificate</div>
                    </div>
                    <div class="ph-certificate-name">${cert.name}</div>
                    <button class="ph-download-pdf-btn" onclick="downloadCertificate('${cert.name}')">
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
        // document.getElementById('searchInput').addEventListener('input', (e) => {
        //     const searchTerm = e.target.value.toLowerCase();
        //     console.log('Searching for:', searchTerm);
        //     // Add search logic here
        // });

        // Initialize the page
        // renderOngoingCourses();
        // renderCompletedCourses();
        // renderCertificates();



        //////////////////////////////////

        // let dashboard_icon = document.querySelector('#dashboard_icon');
        // dashboard_icon.addEventListener("click", () => {
        //     window.location.href = "student_dashboard.html";
        // })

        export {renderCertificates, renderOngoingCourses, renderCompletedCourses};
