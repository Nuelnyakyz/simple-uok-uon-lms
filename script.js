// University of Nairobi LMS JavaScript Functions

// Course data
const courseData = {
    'robotics': { title: 'Introduction to Robotics' },
    'data-science': { title: 'Data Science Fundamentals' },
    'mobile-dev': { title: 'Mobile App Development' },
    'cybersecurity': { title: 'Cybersecurity Essentials' }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializePage();
    showCourseContentByDefault(); // Show content immediately on page load
});

// Setup event listeners
function setupEventListeners() {
    const menuBtn = document.querySelector('.menu-btn');
    const loginBtn = document.querySelector('.login-btn');
    const helpBtn = document.querySelector('.help-btn');

    if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
    if (loginBtn) loginBtn.addEventListener('click', () => showNotification('Login functionality not implemented in demo', 'info'));
    if (helpBtn) helpBtn.addEventListener('click', () => showNotification('Help: Contact support at help@uonbi.ac.ke', 'info'));

    // Setup sidebar navigation
    const sidebarItems = document.querySelectorAll('.nav-item');
    sidebarItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            sidebarItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Navigation function for course cards - NEW
function goToCourse(courseId) {
    window.location.href = 'course-summary.html?course=' + courseId;
}

// Course enrollment function
function enrollInCourse(courseId) {
    const enrollBtn = event.target;
    const originalText = enrollBtn.textContent;
    
    enrollBtn.textContent = 'Enrolling...';
    enrollBtn.disabled = true;
    
    setTimeout(() => {
        // Store enrollment in memory
        if (!window.enrolledCourses) {
            window.enrolledCourses = [];
        }
        
        if (!window.enrolledCourses.includes(courseId)) {
            window.enrolledCourses.push(courseId);
        }
        
        enrollBtn.textContent = 'Enrolled!';
        enrollBtn.style.backgroundColor = '#4caf50';
        
        setTimeout(() => {
            window.location.href = 'course-content.html?course=' + courseId;
        }, 1500);
        
        showNotification('Successfully enrolled in course!', 'success');
    }, 2000);
}

// Toggle course info (scroll to summary section)
function toggleCourseInfo() {
    const summarySection = document.querySelector('.course-summary-section');
    if (summarySection) {
        summarySection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (sidebar.style.transform === 'translateX(-100%)' || sidebar.style.transform === '') {
        sidebar.style.transform = 'translateX(0)';
        if (mainContent) mainContent.style.marginLeft = '60px';
    } else {
        sidebar.style.transform = 'translateX(-100%)';
        if (mainContent) mainContent.style.marginLeft = '0';
    }
}

// Topic toggle functions for course content pages
function toggleTopic(topicId) {
    const content = document.getElementById(topicId + '-content');
    const icon = document.getElementById(topicId + '-icon');
    
    if (content && icon) {
        const isExpanded = content.classList.contains('expanded');
        
        // Collapse all other topics first
        document.querySelectorAll('.topic-content').forEach(topic => {
            topic.style.maxHeight = '0';
            topic.classList.remove('expanded');
        });
        
        document.querySelectorAll('.expand-icon').forEach(topicIcon => {
            topicIcon.classList.remove('expanded');
        });
        
        if (!isExpanded) {
            // Expand current topic
            content.style.maxHeight = content.scrollHeight + 'px';
            content.classList.add('expanded');
            icon.classList.add('expanded');
            
            // Scroll to topic after expansion
            setTimeout(() => {
                const topicHeader = content.previousElementSibling;
                topicHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
    }
}

// Show course content by default (modified function)
function showCourseContentByDefault() {
    const courseContent = document.getElementById('courseContent');
    const continueBtn = document.querySelector('.continue-btn');
    
    if (courseContent) {
        // Hide or remove the continue button
        if (continueBtn) {
            continueBtn.style.display = 'none';
        }
        
        // Show course content immediately
        courseContent.style.display = 'block';
        courseContent.style.opacity = '1';
        courseContent.style.transform = 'translateY(0)';
    }
}

// Legacy function kept for compatibility (but not used)
function showCourseContent() {
    showCourseContentByDefault();
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    
    const colors = {
        success: '#4caf50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#4db6ac'
    };
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '6px',
        color: 'white',
        fontWeight: '500',
        zIndex: '9999',
        backgroundColor: colors[type],
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Initialize page based on URL
function initializePage() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('course');
    
    if (courseId && courseData[courseId]) {
        const titleElement = document.querySelector('.course-hero-title, .page-title');
        if (titleElement) {
            titleElement.textContent = courseData[courseId].title;
        }
    }
}

// Lesson interaction
function openLesson(lessonType, lessonTitle) {
    const lessonItem = event.target.closest('.lesson-item');
    if (lessonItem) {
        lessonItem.style.backgroundColor = '#e8f5e8';
        setTimeout(() => lessonItem.style.backgroundColor = '', 200);
    }
    showNotification(`Opening: ${lessonTitle}`, 'success');
}

// Course progress tracking
function markLessonComplete(lessonId) {
    if (!window.courseProgress) window.courseProgress = {};
    
    window.courseProgress[lessonId] = {
        completed: true,
        completedAt: new Date().toISOString()
    };
    
    showNotification('Lesson marked as complete!', 'success');
}

// Save course progress
function saveCourseProgress(courseId, progress) {
    if (!window.courseProgressData) window.courseProgressData = {};
    
    window.courseProgressData[courseId] = {
        ...window.courseProgressData[courseId],
        ...progress,
        lastUpdated: new Date().toISOString()
    };
}

// Load course progress
function loadCourseProgress(courseId) {
    return window.courseProgressData && window.courseProgressData[courseId] 
        ? window.courseProgressData[courseId] 
        : null;
}

// Event delegation for lesson clicks
document.addEventListener('click', function(e) {
    const lessonItem = e.target.closest('.lesson-item');
    if (lessonItem) {
        const lessonTitle = lessonItem.querySelector('h4')?.textContent;
        const lessonType = lessonItem.querySelector('.lesson-type')?.textContent;
        
        if (lessonTitle) {
            lessonItem.style.transform = 'scale(0.98)';
            setTimeout(() => lessonItem.style.transform = 'scale(1)', 150);
            openLesson(lessonType, lessonTitle);
        }
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close expanded topics
        document.querySelectorAll('.topic-content.expanded').forEach(topic => {
            topic.style.maxHeight = '0';
            topic.classList.remove('expanded');
        });
        document.querySelectorAll('.expand-icon.expanded').forEach(icon => {
            icon.classList.remove('expanded');
        });
    }
});

// Responsive menu handler
window.addEventListener('resize', function() {
    const sidebar = document.querySelector('.sidebar');
    if (window.innerWidth <= 768 && sidebar) {
        sidebar.style.transform = 'translateX(-100%)';
    } else if (sidebar) {
        sidebar.style.transform = 'translateX(0)';
    }
});