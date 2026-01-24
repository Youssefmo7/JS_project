import { courses as initialCourses } from "./data.js";

class AdminDashboard {
    constructor() {
        this.courses = [];
        this.categories = new Set();
        this.selectedCourseId = null;
        this.initializeElements();
        this.attachEventListeners();
        this.loadData();
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
        document.getElementById('AD_closeAdd').addEventListener('click', () => this.closeModal('add'));
        document.getElementById('AD_cancelAdd').addEventListener('click', () => this.closeModal('add'));
        document.getElementById('AD_submitAdd').addEventListener('click', () => this.handleAddCourse());

        document.getElementById('AD_closeEdit').addEventListener('click', () => this.closeModal('edit'));
        document.getElementById('AD_cancelEdit').addEventListener('click', () => this.closeModal('edit'));
        document.getElementById('AD_submitEdit').addEventListener('click', () => this.handleEditCourse());

        document.getElementById('AD_closeDelete').addEventListener('click', () => this.closeModal('delete'));
        document.getElementById('AD_cancelDelete').addEventListener('click', () => this.closeModal('delete'));
        document.getElementById('AD_confirmDelete').addEventListener('click', () => this.handleDeleteCourse());

        const coursesNavItem = document.getElementById('AD-courses');
            coursesNavItem.addEventListener('click', () => {
                 const courseList = document.querySelector('.AD_course-list');
                 courseList.scrollIntoView({ behavior: 'smooth'});
            });    
    }

    loadData() {
        let saved =JSON.parse(localStorage.getItem("courses")) || [];
        
        
        if (!saved || saved.length === 0) {
            this.courses = initialCourses;
            this.saveToStorage('courses', this.courses);
        } else {
            this.courses = saved;
        }

        this.refreshUI();
    }

 

    handleAddCourse() {
        if (!this.validateForm(this.addForm)) {
            this.showMessage('Fill all fields correctly', 'error');
            return;
        }

        const newCourse = {
            id: Date.now(),
            courseName: this.addForm.name.value.trim(),
            description: this.addForm.description.value.trim(),
            category: this.addForm.category.value.trim(),
            instructor: {
                name: this.addForm.instructor.value.trim(),
                image: `instructors/${this.addForm.instructorPicture.value.split('\\').pop() || 'default.jpg'}`
            },
            price: parseFloat(this.addForm.price.value),
            duration: this.addForm.duration.value.includes('hours') ? this.addForm.duration.value : `${this.addForm.duration.value} hours`,
            content: ["Course introduction", "Core concepts", "Practical projects"], // Default placeholder
            image: `courses/${this.addForm.photo.value.split('\\').pop() || 'default.jpg'}`
        };

        this.courses.push(newCourse);
        this.saveToStorage('courses', this.courses);
        this.closeModal('add');
        this.refreshUI();
        this.showMessage('Course Created!');
    }

    handleEditCourse() {
        const idx = this.courses.findIndex(c => c.id === this.selectedCourseId);
        if (idx === -1) return;

        const updated = {
            ...this.courses[idx],
            courseName: this.editForm.name.value.trim(),
            category: this.editForm.category.value.trim(),
            price: parseFloat(this.editForm.price.value),
            duration: this.editForm.duration.value,
            description: this.editForm.description.value.trim(),
            instructor: {
                ...this.courses[idx].instructor,
                name: this.editForm.instructor.value.trim()
            }
        };

      
        if (this.editForm.photo.value) {
            updated.image = `courses/${this.editForm.photo.value.split('\\').pop()}`;
        }
        if (this.editForm.instructorPicture.value) {
            updated.instructor.image = `instructors/${this.editForm.instructorPicture.value.split('\\').pop()}`;
        }

        this.courses[idx] = updated;
        this.saveToStorage('courses', this.courses);
        this.closeModal('edit');
        this.refreshUI();
        this.showMessage('Course Updated!');
    }

    handleDeleteCourse() {
        this.courses = this.courses.filter(c => c.id !== this.selectedCourseId);
        this.saveToStorage('courses', this.courses);
        this.selectedCourseId = null;
        this.closeModal('delete');
        this.refreshUI();
        this.showMessage('Course Removed!');
    }

  

    refreshUI() {
        this.categories.clear();
        this.courses.forEach(c => this.categories.add(c.category));
        this.updateStats();
        this.renderCourseTable();
    }

    updateStats() {
        document.getElementById('AD_totalCourses').textContent = this.courses.length;
        document.getElementById('AD_totalCategories').textContent = this.categories.size;
    }

    renderCourseTable() {
        const container = document.getElementById('AD_courseTableContainer');
        if (this.courses.length === 0) {
            container.innerHTML = `<p class="AD_empty">No courses found.</p>`;
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${this.courses.map(course => `
                        <tr class="${this.selectedCourseId === course.id ? 'selected' : ''}" data-id="${course.id}">
                            <td><strong>${course.courseName}</strong></td>
                            <td>${course.category}</td>
                            <td>$${course.price}</td>
                            <td>${course.instructor.name}</td>
                            <td>
                                <button class="AD_icon-btn edit" onclick="dashboard.editCourse(${course.id})">Edit</button>
                                <button class="AD_icon-btn delete" onclick="dashboard.deleteCourse(${course.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>`;
        container.innerHTML = tableHTML;
    }

   

    openAddModal() {
        this.clearForm(this.addForm);
        this.modals.add.style.display = 'block';
    }

    editCourse(id) {
        this.selectedCourseId = id;
        const course = this.courses.find(c => c.id === id);
        this.editForm.name.value = course.courseName;
        this.editForm.category.value = course.category;
        this.editForm.price.value = course.price;
        this.editForm.duration.value = course.duration;
        this.editForm.description.value = course.description;
        this.editForm.instructor.value = course.instructor.name;
        this.modals.edit.style.display = 'block';
    }

    deleteCourse(id) {
        this.selectedCourseId = id;
        const course = this.courses.find(c => c.id === id);
        document.getElementById('AD_deleteCourseName').textContent = course.courseName;
        this.modals.delete.style.display = 'block';
    }

    closeModal(type) {
        this.modals[type].style.display = 'none';
    }

   

    validateForm(form) {
        let isValid = true;
        ['name', 'category', 'price', 'instructor'].forEach(key => {
            if (!form[key].value.trim()) isValid = false;
        });
        return isValid;
    }

    clearForm(form) {
        Object.values(form).forEach(input => input.value = '');
    }

    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    }

    getFromStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    showMessage(text, type = 'success') {
        this.successText.textContent = text;
        this.successMessage.style.display = 'block';
        this.overlay.style.display = 'block';
        setTimeout(() => {
            this.successMessage.style.display = 'none';
            this.overlay.style.display = 'none';
        }, 1000);
    }
}

// Global scope for the dashboard instance to allow onclick calls
window.dashboard = new AdminDashboard();