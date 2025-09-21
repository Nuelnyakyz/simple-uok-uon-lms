// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing tabs...');
    
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    console.log('Found', tabBtns.length, 'tab buttons');
    console.log('Found', tabPanes.length, 'tab panes');
    
    function activateTab(tabId) {
        // Remove active class from all buttons and panes
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Find and activate the target button and pane
        const targetBtn = Array.from(tabBtns).find(btn => btn.getAttribute('data-tab') === tabId);
        const targetPane = document.getElementById(tabId);
        
        if (targetBtn && targetPane) {
            targetBtn.classList.add('active');
            targetPane.classList.add('active');
            // Force DOM reflow to ensure rendering
            targetPane.offsetHeight; // Trigger reflow
            console.log('Activated tab:', tabId);
        } else {
            console.error('Could not find tab button or pane for ID:', tabId);
        }
    }
    
    // Initialize the first tab as active
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        const firstTabId = tabBtns[0].getAttribute('data-tab');
        activateTab(firstTabId);
    }
    
    // Add click event listeners to all tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.getAttribute('data-tab');
            console.log('Clicked tab:', tabId);
            activateTab(tabId);
        });
    });
});

// Search functionality (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            if (searchInput && searchInput.value.trim()) {
                alert(`Searching for: ${searchInput.value}`);
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && this.value.trim()) {
                alert(`Searching for: ${this.value}`);
            }
        });
    }
});

// Module toggle functionality
function toggleModule(moduleId) {
    const moduleItem = document.querySelector(`#${moduleId}-content`).closest('.module-item');
    const moduleContent = document.getElementById(`${moduleId}-content`);
    const toggleIcon = moduleItem.querySelector('.module-toggle i');

    // Toggle the module content visibility
    if (moduleContent.classList.contains('active')) {
        moduleContent.classList.remove('active');
        moduleItem.classList.remove('expanded');
    } else {
        // Close all other modules first (optional - remove if you want multiple open)
        document.querySelectorAll('.module-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.module-item').forEach(item => {
            item.classList.remove('expanded');
        });
        
        // Close all detailed content when switching modules
        document.querySelectorAll('.module-detailed-content').forEach(content => {
            content.classList.remove('active');
        });
        document.querySelectorAll('.show-more-btn').forEach(btn => {
            btn.classList.remove('expanded');
            btn.innerHTML = 'Show info about module content <i class="bi bi-chevron-down"></i>';
        });

        // Open the clicked module
        moduleContent.classList.add('active');
        moduleItem.classList.add('expanded');
    }
}

// Login function
function showLogin() {
    alert('Login functionality to be implemented');
}

// Signup function
function showSignup() {
    alert('Signup functionality to be implemented');
}

// Help function
function showHelp() {
    alert('Help functionality to be implemented');
}

// Search function
function searchCourses(event) {
    event.preventDefault();
    const searchTerm = document.getElementById('courseSearch').value;
    if (searchTerm.trim()) {
        alert(`Searching for courses: ${searchTerm}`);
        // Add your search logic here
    }
}

// Animate stats on scroll
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-count'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (target > 1000) {
                        entry.target.textContent = Math.floor(current).toLocaleString() + '+';
                    } else {
                        entry.target.textContent = Math.floor(current) + (target < 100 ? '%' : '+');
                    }
                }, 20);
                
                observer.unobserve(entry.target);
            }
        });
    });

    stats.forEach(stat => observer.observe(stat));
}

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    animateStats();
    
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mock user state - In real app, this would come from authentication service
const userState = {
    isLoggedIn: true, // Change to false to test "Start Learning" state
    enrolledCourses: [1, 2, 3, 5, 6, 9, 10], // Array of enrolled course IDs
    courseProgress: {
        1: 71,
        2: 85,
        3: 43,
        5: 67,
        6: 92,
        9: 28,
        10: 56
    }
};

// Function to check if user is enrolled in a course
function isUserEnrolled(courseId) {
    return userState.isLoggedIn && userState.enrolledCourses.includes(courseId);
}

// Function to get user progress for a course
function getUserProgress(courseId) {
    return userState.courseProgress[courseId] || 0;
}

// Function to handle course button clicks
function handleCourseAction(courseId, event) {
    event.stopPropagation(); // Prevent card click event
    
    const isEnrolled = isUserEnrolled(courseId);
    
    if (isEnrolled) {
        // User is enrolled - continue learning
        console.log(`Continuing course ${courseId}`);
        alert(`Continuing your learning journey! You're ${getUserProgress(courseId)}% complete.`);
        // In real app: redirect to course content/last watched lesson
    } else {
        // User not enrolled - start learning
        console.log(`Starting course ${courseId}`);
        if (userState.isLoggedIn) {
            // Logged in but not enrolled - show enrollment process
            alert('Enrolling you in this course...');
            // In real app: show enrollment modal or redirect to enrollment page
        } else {
            // Not logged in - show login/signup
            alert('Please log in or sign up to start learning');
            // In real app: show login modal
        }
    }
}

// Function to simulate user state changes (for testing)
function toggleUserState() {
    userState.isLoggedIn = !userState.isLoggedIn;
    console.log('User logged in:', userState.isLoggedIn);
    
    // Refresh the course displays
    populateSections();
    
    // Show feedback to user
    const status = userState.isLoggedIn ? 'logged in (enrolled student view)' : 'logged out (new visitor view)';
    alert(`User state changed: ${status}`);
}

// Function to simulate enrolling in a course
function enrollInCourse(courseId) {
    if (userState.isLoggedIn && !userState.enrolledCourses.includes(courseId)) {
        userState.enrolledCourses.push(courseId);
        userState.courseProgress[courseId] = Math.floor(Math.random() * 30) + 5; // 5-35% initial progress
        
        // Refresh the course displays
        populateSections();
        
        alert(`Enrolled in course ${courseId}! Starting with ${userState.courseProgress[courseId]}% progress.`);
    }
}

// Add test buttons to the page (for development/testing)
function addTestControls() {
    // Only add in development - remove in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const testControls = document.createElement('div');
        testControls.style.cssText = `
            position: fixed;
            top: 140px;
            right: 20px;
            z-index: 1000;
            background: white;
            padding: 15px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            font-size: 12px;
        `;
        testControls.innerHTML = `
            <h4 style="margin: 0 0 10px 0; color: #037b90;">Test Controls</h4>
            <button onclick="toggleUserState()" style="display: block; width: 100%; margin-bottom: 5px; padding: 5px; font-size: 11px;">
                Toggle Login State
            </button>
            <button onclick="enrollInCourse(4)" style="display: block; width: 100%; margin-bottom: 5px; padding: 5px; font-size: 11px;">
                Enroll in Food Safety
            </button>
            <div style="margin-top: 10px; font-size: 10px; color: #666;">
                Status: ${userState.isLoggedIn ? 'Logged In' : 'Logged Out'}
            </div>
        `;
        document.body.appendChild(testControls);
    }
}

// Mock data for categories
const mockCategories = [
    { name: 'IT', icon: '💻', count: '1,261 Courses', color: '#4285f4' },
    { name: 'Health', icon: '❤️', count: '1,027 Courses', color: '#ea4335' },
    { name: 'Language', icon: '🗣️', count: '314 Courses', color: '#fbbc05' },
    { name: 'Business', icon: '📊', count: '1,732 Courses', color: '#9c27b0' },
    { name: 'Management', icon: '👥', count: '1,053 Courses', color: '#ff7f50' },
    { name: 'English', icon: '🇬🇧', count: '55 Courses', color: '#34a853' },
    { name: 'Personal Development', icon: '🚀', count: '1,310 Courses', color: '#ff9800' },
    { name: 'Sales & Marketing', icon: '📢', count: '441 Courses', color: '#e91e63' },
    { name: 'Engineering & Construction', icon: '🏗️', count: '811 Courses', color: '#795548' },
    { name: 'Teaching & Academics', icon: '🎓', count: '1,631 Courses', color: '#607d8b' }
];

// Mock data for trust partners
const trustPartners = [
    {
        id: 1,
        name: "KUCCPS",
        description: "Kenya Universities and Colleges Central Placement Service - Official partner for student placement and guidance",
        logo: "🎓"
    },
    {
        id: 2,
        name: "Ministry of Education - KE",
        description: "Government of Kenya Ministry of Education - Ensuring quality education standards nationwide",
        logo: "🏛️"
    },
    {
        id: 3,
        name: "UASU",
        description: "Universities Academic Staff Union - Supporting academic excellence and professional development",
        logo: "👨‍🎓"
    }
];

// Mock data for top instructors
const topInstructors = [
    {
        id: 1,
        name: "Dr. Sarah Wanjiku",
        expertise: "Data Science & AI",
        bio: "Leading AI researcher with 15+ years experience at Google and Microsoft. Specializes in machine learning applications for African markets. Published 50+ research papers and mentored 200+ data scientists.",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=300&h=200&fit=crop&crop=face",
        students: "12,500+",
        courses: "18",
        rating: "4.9"
    },
    {
        id: 2,
        name: "Prof. James Kipkoech",
        expertise: "Engineering & Technology",
        bio: "Former Tesla engineering director and current MIT visiting professor. Expert in renewable energy systems and sustainable technology. Led major infrastructure projects across East Africa.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop&crop=face",
        students: "8,900+",
        courses: "12",
        rating: "4.8"
    },
    {
        id: 3,
        name: "Dr. Amina Hassan",
        expertise: "Business & Finance",
        bio: "Former World Bank economist and startup founder. Expertise in African financial markets, blockchain technology, and entrepreneurship. Advisor to 50+ successful startups.",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=200&fit=crop&crop=face",
        students: "15,200+",
        courses: "22",
        rating: "4.9"
    }
];

// Updated mock data for courses with prices
const mockCourses = {
    popular: [
        {
            id: 1,
            title: " Workplace Safety and Health",
            instructor: "Dr. Michael Johnson",
            university: "University of Nairobi",
            duration: "6-10 hrs",
            level: "beginner",
            enrolled: "182,890 learners",
            price: "Free",
            image: "https://images.unsplash.com/photo-1581092786450-7d0c4e8d2a9e?w=300&h=140&fit=crop&crop=center",
            category: "Management"
        },
        {
            id: 2,
            title: " Additional Needs",
            instructor: "Prof. Sarah Williams",
            university: "Kenyatta University",
            duration: "6-10 hrs",
            level: "intermediate",
            enrolled: "60,760 learners",
            price: "$49",
            image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=140&fit=crop&crop=center",
            category: "Education"
        },
        {
            id: 3,
            title: " Health and Social Care",
            instructor: "Dr. Emma Thompson",
            university: "Strathmore University",
            duration: "10-15 hrs",
            level: "advanced",
            enrolled: "67,776 learners",
            price: "$89",
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=300&h=140&fit=crop&crop=center",
            category: "Health"
        },
        {
            id: 4,
            title: " Food Safety",
            instructor: "Chef Robert Davis",
            university: "USIU Africa",
            duration: "15-20 hrs",
            level: "beginner",
            enrolled: "106,507 learners",
            price: "Free",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=140&fit=crop&crop=center",
            category: "Management"
        }
    ],
    trending: [
        {
            id: 5,
            title: "Data Science Fundamentals",
            instructor: "Dr. Jane Smith",
            university: "MIT Kenya",
            duration: "12 weeks",
            level: "intermediate",
            enrolled: "25,430 learners",
            price: "$129",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=140&fit=crop&crop=center",
            category: "IT"
        },
        {
            id: 6,
            title: "Digital Marketing Mastery",
            instructor: "Mark Johnson",
            university: "Strathmore University",
            duration: "8 weeks",
            level: "beginner",
            enrolled: "18,920 learners",
            price: "Free",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=140&fit=crop&crop=center",
            category: "Business"
        },
        {
            id: 7,
            title: "Mobile App Development",
            instructor: "Sarah Wilson",
            university: "Technical University of Kenya",
            duration: "10 weeks",
            level: "advanced",
            enrolled: "14,560 learners",
            price: "$199",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=140&fit=crop&crop=center",
            category: "IT"
        },
        {
            id: 8,
            title: "Financial Planning & Investment",
            instructor: "Prof. David Kim",
            university: "University of Nairobi",
            duration: "6 weeks",
            level: "intermediate",
            enrolled: "12,340 learners",
            price: "$79",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=140&fit=crop&crop=center",
            category: "Business"
        }
    ],
    new: [
        {
            id: 9,
            title: "AI Ethics and Governance",
            instructor: "Dr. Amina Hassan",
            university: "AKU Kenya",
            duration: "4 weeks",
            level: "advanced",
            enrolled: "5,230 learners",
            price: "$159",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=300&h=140&fit=crop&crop=center",
            category: "IT"
        },
        {
            id: 10,
            title: "Sustainable Agriculture Practices",
            instructor: "Prof. John Mwangi",
            university: "Egerton University",
            duration: "8 weeks",
            level: "beginner",
            enrolled: "8,450 learners",
            price: "Free",
            image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=140&fit=crop&crop=center",
            category: "Science"
        },
        {
            id: 11,
            title: "Blockchain Technology Fundamentals",
            instructor: "Michael Chen",
            university: "Strathmore University",
            duration: "6 weeks",
            level: "intermediate",
            enrolled: "3,780 learners",
            price: "$99",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=300&h=140&fit=crop&crop=center",
            category: "IT"
        },
        {
            id: 12,
            title: "Mental Health First Aid",
            instructor: "Dr. Grace Wanjiku",
            university: "Kenyatta University",
            duration: "3 weeks",
            level: "beginner",
            enrolled: "6,920 learners",
            price: "Free",
            image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=140&fit=crop&crop=center",
            category: "Health"
        }
    ]
};

// Mock data for testimonials with African avatar images
const mockTestimonials = [
    {
        id: 1,
        quote: "The courses here transformed my career completely. The instructors are world-class and the content is always up-to-date with industry standards. I landed my dream job within 3 months of completing the program.",
        author: "Mary Wanjiru",
        role: "Data Scientist at Safaricom",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 2,
        quote: "Flexible learning that fits my busy schedule. The quality of education rivals traditional universities, but with the convenience of learning from anywhere. Highly recommend to working professionals.",
        author: "James Ochieng",
        role: "Marketing Manager at KCB Bank",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
        id: 3,
        quote: "The practical approach to learning and real-world projects helped me build a strong portfolio. The community support and networking opportunities are invaluable for career growth.",
        author: "Fatuma Ali",
        role: "Software Developer at iHub",
        avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=150&h=150&fit=crop&crop=face"
    }
];

// Function to create category cards
function createCategoryCard(category) {
    return `
        <div class="category-card" onclick="exploreCourses('${category.name}')">
            <div class="category-icon" style="background: ${category.color}">
                ${category.icon}
            </div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.count} →</div>
        </div>
    `;
}

// Function to create trust partner cards
function createTrustCard(partner) {
    return `
        <div class="trust-card">
            <div class="trust-logo">${partner.logo}</div>
            <div class="trust-name">${partner.name}</div>
            <div class="trust-description">${partner.description}</div>
        </div>
    `;
}

// Updated dynamic course card function with better structure
function createCourseCard(course) {
    const priceClass = course.price === 'Free' ? 'free' : '';
    const isEnrolled = isUserEnrolled(course.id);
    const progress = isEnrolled ? getUserProgress(course.id) : 0;
    
    // Generate progress bar HTML only if user is enrolled
    const progressHTML = isEnrolled ? `
        <div class="course-progress">
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${progress}%"></div>
            </div>
            <span class="progress-text">${progress}% complete</span>
        </div>
    ` : '';
    
    // Determine button text and class based on enrollment status
    const buttonText = isEnrolled ? 'Continue' : 'Start Learning';
    const buttonClass = isEnrolled ? 'course-btn continue-btn' : 'course-btn';
    
    return `
        <div class="course-card" onclick="viewCourse(${course.id})">
            <img src="${course.image}" alt="${course.title}" class="course-image" />
            <div class="course-price ${priceClass}">${course.price}</div>
            <div class="course-content">
                <div class="course-header">
                    <div class="course-level ${course.level}">${course.level} level</div>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-meta">
                        <span>⏱️ ${course.duration}</span>
                        <span>👥 ${course.enrolled}</span>
                    </div>
                </div>
                ${progressHTML}
                <div class="course-footer">
                    <button class="${buttonClass}" onclick="handleCourseAction(${course.id}, event)">${buttonText}</button>
                </div>
            </div>
        </div>
    `;
}

// Function to create instructor cards
function createInstructorCard(instructor) {
    return `
        <div class="instructor-card" onclick="viewInstructor(${instructor.id})">
            <div class="instructor-avatar">
                <img src="${instructor.avatar}" alt="${instructor.name}" />
            </div>
            <div class="instructor-content">
                <h3 class="instructor-name">${instructor.name}</h3>
                <div class="instructor-expertise">${instructor.expertise}</div>
                <p class="instructor-bio">${instructor.bio}</p>
                <div class="instructor-stats">
                    <div class="stat-group">
                        <span class="stat-number-instructor">${instructor.students}</span>
                        <span class="stat-label-instructor">Students</span>
                    </div>
                    <div class="stat-group">
                        <span class="stat-number-instructor">${instructor.courses}</span>
                        <span class="stat-label-instructor">Courses</span>
                    </div>
                    <div class="stat-group">
                        <span class="stat-number-instructor">${instructor.rating}</span>
                        <span class="stat-label-instructor">Rating</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to create testimonial cards
function createTestimonialCard(testimonial) {
    return `
        <div class="testimonial-card">
            <p class="testimonial-quote">${testimonial.quote}</p>
            <div class="testimonial-author">
                <img src="${testimonial.avatar}" alt="${testimonial.author}" class="author-avatar" />
                <div class="author-name">${testimonial.author}</div>
                <div class="author-role">${testimonial.role}</div>
            </div>
        </div>
    `;
}

// Function to populate sections
function populateSections() {
    // Populate categories
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (categoriesGrid) {
        categoriesGrid.innerHTML = mockCategories.map(createCategoryCard).join('');
    }

    // Populate popular courses
    const popularGrid = document.getElementById('popularCoursesGrid');
    if (popularGrid) {
        popularGrid.innerHTML = mockCourses.popular.map(createCourseCard).join('');
    }

    // Populate trending courses
    const trendingGrid = document.getElementById('trendingCoursesGrid');
    if (trendingGrid) {
        trendingGrid.innerHTML = mockCourses.trending.map(createCourseCard).join('');
    }

    // Populate new courses
    const newGrid = document.getElementById('newCoursesGrid');
    if (newGrid) {
        newGrid.innerHTML = mockCourses.new.map(createCourseCard).join('');
    }

    // Populate testimonials
    const testimonialsGrid = document.getElementById('testimonialsGrid');
    if (testimonialsGrid) {
        testimonialsGrid.innerHTML = mockTestimonials.map(createTestimonialCard).join('');
    }
}

// Function to populate trust partners
function populateTrustSection() {
    const trustGrid = document.getElementById('trustGrid');
    if (trustGrid) {
        trustGrid.innerHTML = trustPartners.map(createTrustCard).join('');
    }
}

// Function to populate instructors
function populateInstructorsSection() {
    const instructorsGrid = document.getElementById('instructorsGrid');
    if (instructorsGrid) {
        instructorsGrid.innerHTML = topInstructors.map(createInstructorCard).join('');
    }
}

// Enhanced search with filters
function applyFilters() {
    const level = document.getElementById('levelFilter').value;
    const category = document.getElementById('categoryFilter').value;
    const price = document.getElementById('priceFilter').value;
    const searchTerm = document.getElementById('courseSearch').value;
    
    console.log('Filters applied:', { level, category, price, searchTerm });
    
    // Show user feedback
    const filters = [];
    if (level) filters.push(`Level: ${level}`);
    if (category) filters.push(`Category: ${category}`);
    if (price) filters.push(`Price: ${price}`);
    if (searchTerm) filters.push(`Search: ${searchTerm}`);
    
    if (filters.length > 0) {
        alert(`Searching with filters: ${filters.join(', ')}`);
    } else {
        alert('Please select at least one filter or enter a search term');
    }
    
    // Here you would implement the actual filtering logic
    // filterCourses(level, category, price, searchTerm);
}

// Event handlers
function exploreCourses(category) {
    console.log(`Exploring courses in: ${category}`);
    // Implement category filtering logic
}

function viewCourse(courseId) {
    console.log(`Viewing course with ID: ${courseId}`);
    // Implement course detail view logic
}

// View instructor details
function viewInstructor(instructorId) {
    const instructor = topInstructors.find(i => i.id === instructorId);
    if (instructor) {
        alert(`Viewing profile for ${instructor.name} - ${instructor.expertise} specialist`);
        // Implement instructor detail view
    }
}

// Enhanced search function (updated)
function searchCourses(event) {
    event.preventDefault();
    applyFilters(); // Use the new filter function
}

// Initialize sections when page loads
document.addEventListener('DOMContentLoaded', function() {
    addTestControls();
    populateSections();
    populateTrustSection();
    populateInstructorsSection();
    
    // Add scroll animations for course cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    // Add filter reset functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            // Optional: Auto-apply filters on change
            // applyFilters();
        });
    });

    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                applyFilters();
            }
        });
    }

    // Observe all course cards and testimonial cards
    setTimeout(() => {
        document.querySelectorAll('.course-card, .testimonial-card, .category-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }, 100);
});