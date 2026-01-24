 // Certificate data object
        const certificateData = {
            studentName: "Abdulrahman Ali",
            courseName: "Introduction to Data Science",
            completionDate: "October 26, 2025"
        };

        // Function to update certificate information
        function updateCertificate(data) {
            document.getElementById('studentName').textContent = data.studentName;
            document.getElementById('courseName').textContent = data.courseName;
            document.getElementById('completionDate').textContent = data.completionDate;
        }

        // Function to download PDF (placeholder)
        function downloadPDF() {
            const studentName = document.getElementById('studentName').textContent;
            const courseName = document.getElementById('courseName').textContent;
            
            alert(`Downloading certificate for:\n${studentName}\n${courseName}`);
            
            // In a real application, this would trigger actual PDF generation
            // For example, using a library like jsPDF or calling a backend API
        }

        // Initialize certificate with data
        updateCertificate(certificateData);

        // Example: Update certificate dynamically (uncomment to test)
        /*
        setTimeout(() => {
            updateCertificate({
                studentName: "Sarah Williams",
                courseName: "Advanced Machine Learning",
                completionDate: "January 15, 2024"
            });
        }, 3000);
        */
  