class AdminDashboard {
    constructor() {
        this.courses = [];
        this.categories = new Set();
        this.selectedCourseId = null;
        this.initializeElements();
        this.attachEventListeners();
        this.loadData();
        this.updateStats();
        this.renderCourseTable();
    }

    initializeElements() {
        this.modals = {
            add: document.getElementById('AD_addModal'),
            edit: document.getElementById('AD_editModal'),
            delete: document.getElementById('AD_deleteModal')
        };

        this.addForm = {
            name: document.getElementById('AD_courseName'),
            category: document.getElementById('AD_courseCategoriy'),
            price: document.getElementById('AD_coursePrice'),
            photo: document.getElementById('AD_coursePhoto'),
            duration: document.getElementById('AD_courseDuration'),
            description: document.getElementById('AD_courseDesc'),
            instructor: document.getElementById('AD_instructor'),
            instructorPicture: document.getElementById('AD_instructor_Picture')
        };

        this.editForm = {
            name: document.getElementById('AD_editCourseName'),
            category: document.getElementById('AD_editCourseCategoriy'),
            price: document.getElementById('AD_editCoursePrice'),
            photo: document.getElementById('AD_editCoursePhoto'),
            duration: document.getElementById('AD_editCourseDuration'),
            description: document.getElementById('AD_editCourseDesc'),
            instructor: document.getElementById('AD_editInstructor'),
            instructorPicture: document.getElementById('AD_editInstructor_Picture')
        };

        this.successMessage = document.getElementById('AD_successMessage');
        this.overlay = document.getElementById('AD_overlay');
        this.successText = document.getElementById('AD_successText');
    }

    attachEventListeners() {
        document.getElementById('AD_addBtn').addEventListener('click', () => this.openAddModal());
        document.getElementById('AD_editBtn').addEventListener('click', () => this.openEditModal());
        document.getElementById('AD_deleteBtn').addEventListener('click', () => this.openDeleteModal());

        document.getElementById('AD_closeAdd').addEventListener('click', () => this.closeModal('add'));
        document.getElementById('AD_closeEdit').addEventListener('click', () => this.closeModal('edit'));
        document.getElementById('AD_closeDelete').addEventListener('click', () => this.closeModal('delete'));

        document.getElementById('AD_cancelAdd').addEventListener('click', () => this.closeModal('add'));
        document.getElementById('AD_cancelEdit').addEventListener('click', () => this.closeModal('edit'));
        document.getElementById('AD_cancelDelete').addEventListener('click', () => this.closeModal('delete'));

        document.getElementById('AD_submitAdd').addEventListener('click', () => this.handleAddCourse());
        document.getElementById('AD_submitEdit').addEventListener('click', () => this.handleEditCourse());
        document.getElementById('AD_confirmDelete').addEventListener('click', () => this.handleDeleteCourse());

        
        const coursesNavItem = document.getElementById('AD-courses');
        if (coursesNavItem) {
            coursesNavItem.addEventListener('click', () => {
                this.scrollToCourseTable();
                // Add active class
                document.querySelectorAll('.AD_nav-item').forEach(item => {
                    item.classList.remove('AD_active');
                });
                coursesNavItem.classList.add('AD_active');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === this.modals.add) this.closeModal('add');
            if (e.target === this.modals.edit) this.closeModal('edit');
            if (e.target === this.modals.delete) this.closeModal('delete');
        });
    }

    // New method: Scroll to course table
    scrollToCourseTable() {
        const courseList = document.querySelector('.AD_course-list');
        if (courseList) {
            courseList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    loadData() {
        const saved = this.getFromStorage('courses');
        if (saved && saved.length > 0) {
            this.courses = saved;
            this.courses.forEach(c => this.categories.add(c.category));
        }
    }

    openAddModal() {
        this.clearForm(this.addForm);
        this.modals.add.style.display = 'block';
    }

    openEditModal() {
        if (!this.selectedCourseId) {
            this.showMessage('Please select a course to edit', 'error');
            return;
        }
        const course = this.courses.find(c => c.id === this.selectedCourseId);
        if (course) {
            this.editForm.name.value = course.name || '';
            this.editForm.category.value = course.category || '';
            this.editForm.price.value = course.price || '';
            this.editForm.photo.value = '';
            this.editForm.duration.value = course.duration || '';
            this.editForm.description.value = course.description || '';
            this.editForm.instructor.value = course.instructor || '';
            this.editForm.instructorPicture.value = '';
            this.modals.edit.style.display = 'block';
        }
    }

    openDeleteModal() {
        if (!this.selectedCourseId) {
            this.showMessage('Please select a course to delete', 'error');
            return;
        }
        const course = this.courses.find(c => c.id === this.selectedCourseId);
        if (course) {
            document.getElementById('AD_deleteCourseName').textContent = course.name;
            this.modals.delete.style.display = 'block';
        }
    }

    closeModal(type) {
        this.modals[type].style.display = 'none';
    }

    handleAddCourse() {
        if (!this.validateForm(this.addForm)) {
            this.showMessage('Please fill in all required fields correctly', 'error');
            return;
        }

        const newCourse = {
            id: Date.now(),
            name: this.addForm.name.value.trim(),
            category: this.addForm.category.value.trim(),
            price: parseFloat(this.addForm.price.value) || 0,
            photo: this.addForm.photo.value.trim() || '',
            duration: this.addForm.duration.value || '',
            description: this.addForm.description.value.trim(),
            instructor: this.addForm.instructor.value.trim(),
            instructorPicture: this.addForm.instructorPicture.value.trim() || '',
            createdAt: new Date().toISOString()
        };

        this.courses.push(newCourse);
        this.categories.add(newCourse.category);
        this.saveToStorage('courses', this.courses);
        this.updateStats();
        this.renderCourseTable();
        this.closeModal('add');
        this.showMessage('Course added successfully!', 'success');
    }

    handleEditCourse() {
        if (!this.selectedCourseId) {
            this.showMessage('No course selected', 'error');
            return;
        }

        if (!this.validateForm(this.editForm)) {
            this.showMessage('Please fill in all required fields correctly', 'error');
            return;
        }

        const idx = this.courses.findIndex(c => c.id === this.selectedCourseId);
        if (idx !== -1) {
            this.courses[idx] = {
                ...this.courses[idx],
                name: this.editForm.name.value.trim(),
                category: this.editForm.category.value.trim(),
                price: parseFloat(this.editForm.price.value) || 0,
                photo: this.editForm.photo.value.trim() || this.courses[idx].photo,
                duration: this.editForm.duration.value || '',
                description: this.editForm.description.value.trim(),
                instructor: this.editForm.instructor.value.trim(),
                instructorPicture: this.editForm.instructorPicture.value.trim() || this.courses[idx].instructorPicture,
                updatedAt: new Date().toISOString()
            };

            this.categories.clear();
            this.courses.forEach(c => this.categories.add(c.category));
            this.saveToStorage('courses', this.courses);
            this.updateStats();
            this.renderCourseTable();
            this.closeModal('edit');
            this.showMessage('Course updated successfully!', 'success');
        }
    }

    handleDeleteCourse() {
        if (!this.selectedCourseId) {
            this.showMessage('No course selected', 'error');
            return;
        }

        this.courses = this.courses.filter(c => c.id !== this.selectedCourseId);
        this.categories.clear();
        this.courses.forEach(c => this.categories.add(c.category));
        this.saveToStorage('courses', this.courses);
        this.selectedCourseId = null;
        this.updateStats();
        this.renderCourseTable();
        this.closeModal('delete');
        this.showMessage('Course deleted successfully!', 'success');
    }

    validateForm(form) {
        const required = ['name', 'category', 'price', 'description', 'instructor'];
        let valid = true;

        for (const field of required) {
            if (!form[field].value || form[field].value.trim() === '') {
                form[field].classList.add('error');
                valid = false;
            } else {
                form[field].classList.remove('error');
            }
        }

        if (form.price.value && parseFloat(form.price.value) < 0) {
            form.price.classList.add('error');
            valid = false;
        }

        return valid;
    }

    clearForm(form) {
        Object.values(form).forEach(input => {
            input.value = '';
            input.classList.remove('error');
        });
    }

    renderCourseTable() {
        const container = document.getElementById('AD_courseTableContainer');
        
        if (this.courses.length === 0) {
            container.innerHTML = `
                <div class="AD_empty-state">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/>
                    </svg>
                    <p>No courses yet. Click "Add Course" to get started!</p>
                </div>
            `;
            return;
        }

        let tableHTML = `
            <table class="AD_course-table">
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Instructor</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        this.courses.forEach(course => {
            const isSelected = this.selectedCourseId === course.id ? 'selected' : '';
            tableHTML += `
                <tr class="${isSelected}" data-id="${course.id}">
                    <td><strong>${this.escapeHtml(course.name)}</strong></td>
                    <td>${this.escapeHtml(course.category)}</td>
                    <td>$${course.price.toFixed(2)}</td>
                    <td>${this.escapeHtml(course.instructor)}</td>
                    <td>${course.duration ? course.duration + ' hrs' : 'N/A'}</td>
                    <td class="AD_action-btns">
                        <button class="AD_icon-btn edit" data-course-id="${course.id}" title="Edit Course">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="pointer-events: none;">
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                            </svg>
                        </button>
                        <button class="AD_icon-btn delete" data-course-id="${course.id}" title="Delete Course">
                            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style="pointer-events: none;">
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            `;
        });

        tableHTML += `
                </tbody>
            </table>
        `;

        container.innerHTML = tableHTML;

        // Add row click handlers for selection
        document.querySelectorAll('.AD_course-table tbody tr').forEach(row => {
            row.addEventListener('click', (e) => {
                if (!e.target.closest('button')) {
                    const id = parseInt(row.dataset.id);
                    this.selectCourse(id);
                }
            });
        });

        // Add event listeners for EDIT buttons
        document.querySelectorAll('.AD_icon-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                console.log('Edit clicked for course ID:', courseId); // Debug
                this.editCourse(courseId);
            });
        });

        // Add event listeners for DELETE buttons
        document.querySelectorAll('.AD_icon-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = parseInt(btn.getAttribute('data-course-id'));
                console.log('Delete clicked for course ID:', courseId); // Debug
                this.deleteCourse(courseId);
            });
        });
    }

    selectCourse(id) {
        this.selectedCourseId = id;
        this.renderCourseTable();
    }

    editCourse(id) {
        console.log('editCourse called with ID:', id); // Debug
        this.selectedCourseId = id;
        this.openEditModal();
    }

    deleteCourse(id) {
        console.log('deleteCourse called with ID:', id); // Debug
        this.selectedCourseId = id;
        this.openDeleteModal();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    updateStats() {
        document.getElementById('AD_totalCourses').textContent = this.courses.length;
        document.getElementById('AD_totalCategories').textContent = this.categories.size;
    }

    showMessage(message, type = 'success') {
        this.successText.textContent = message;
        
        const icon = document.querySelector('.AD_success-icon');
        if (type === 'error') {
            this.successMessage.style.background = '#f8d7da';
            this.successMessage.style.color = '#721c24';
            icon.style.color = '#dc3545';
            icon.textContent = '✕';
        } else {
            this.successMessage.style.background = 'white';
            this.successMessage.style.color = '#333';
            icon.style.color = '#28a745';
            icon.textContent = '✓';
        }

        this.overlay.style.display = 'block';
        this.successMessage.style.display = 'block';

        setTimeout(() => {
            this.overlay.style.display = 'none';
            this.successMessage.style.display = 'none';
        }, 2000);
    }

    saveToStorage(key, data) {
        if (!window.appStorage) window.appStorage = {};
        window.appStorage[key] = data;
    }

    getFromStorage(key) {
        if (!window.appStorage) window.appStorage = {};
        return window.appStorage[key] || null;
    }
}

let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new AdminDashboard();
});
       
        
    