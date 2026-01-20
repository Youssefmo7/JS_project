
        // Get elements
        const addBtn = document.getElementById('AD_addBtn');
        const editBtn = document.getElementById('AD_editBtn');
        const deleteBtn = document.getElementById('AD_deleteBtn');
        
        const addModal = document.getElementById('AD_addModal');
        const editModal = document.getElementById('AD_editModal');
        const deleteModal = document.getElementById('AD_deleteModal');
        
        const successMessage = document.getElementById('AD_successMessage');
        const overlay = document.getElementById('AD_overlay');
        const successText = document.getElementById('AD_successText');

        // Open Add Modal
        addBtn.onclick = function() {
            addModal.style.display = 'block';
        }

        // Open Edit Modal
        editBtn.onclick = function() {
            editModal.style.display = 'block';
        }

        // Open Delete Modal
        deleteBtn.onclick = function() {
            deleteModal.style.display = 'block';
        }

        // Close modals
        document.getElementById('AD_closeAdd').onclick = function() {
            addModal.style.display = 'none';
        }
        document.getElementById('AD_closeEdit').onclick = function() {
            editModal.style.display = 'none';
        }
        document.getElementById('AD_closeDelete').onclick = function() {
            deleteModal.style.display = 'none';
        }

        // Cancel buttons
        document.getElementById('AD_cancelAdd').onclick = function() {
            addModal.style.display = 'none';
        }
        document.getElementById('AD_cancelEdit').onclick = function() {
            editModal.style.display = 'none';
        }
        document.getElementById('AD_cancelDelete').onclick = function() {
            deleteModal.style.display = 'none';
        }

        // Submit Add Course
        document.getElementById('AD_submitAdd').onclick = function() {
            addModal.style.display = 'none';
            successText.textContent = 'Course added successfully!';
            showSuccessMessage();
        }

        // Submit Edit Course
        document.getElementById('AD_submitEdit').onclick = function() {
            editModal.style.display = 'none';
            successText.textContent = 'Course updated successfully!';
            showSuccessMessage();
        }

        // Confirm Delete
        document.getElementById('AD_confirmDelete').onclick = function() {
            deleteModal.style.display = 'none';
            successText.textContent = 'Course deleted successfully!';
            showSuccessMessage();
        }

        // Show success message
        function showSuccessMessage() {
            overlay.style.display = 'block';
            successMessage.style.display = 'block';
            setTimeout(function() {
                overlay.style.display = 'none';
                successMessage.style.display = 'none';
            }, 2000);
        }

        // Close modal when clicking outside
        window.onclick = function(e) {
            if (e.target == addModal) {
                addModal.style.display = 'none';
            }
            if (e.target == editModal) {
                editModal.style.display = 'none';
            }
            if (e.target == deleteModal) {
                deleteModal.style.display = 'none';
            }
        }
    