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


// Mock data for testimonials
const mockTestimonials = [
    {
        id: 1,
        quote: "The courses here transformed my career completely. The instructors are world-class and the content is always up-to-date with industry standards. I landed my dream job within 3 months of completing the program.",
        author: "Mary Wanjiru",
        role: "Data Scientist at Safaricom",
        avatar: "MW"
    },
    {
        id: 2,
        quote: "Flexible learning that fits my busy schedule. The quality of education rivals traditional universities, but with the convenience of learning from anywhere. Highly recommend to working professionals.",
        author: "James Ochieng",
        role: "Marketing Manager at KCB Bank",
        avatar: "JO"
    },
    {
        id: 3,
        quote: "The practical approach to learning and real-world projects helped me build a strong portfolio. The community support and networking opportunities are invaluable for career growth.",
        author: "Fatuma Ali",
        role: "Software Developer at iHub",
        avatar: "FA"
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

// Function to create course cards
function createCourseCard(course) {
    const priceClass = course.price === 'Free' ? 'free' : '';
    
    return `
        <div class="course-card" onclick="viewCourse(${course.id})">
            <img src="${course.image}" alt="${course.title}" class="course-image" />
            <div class="course-price ${priceClass}">${course.price}</div>
            <div class="course-content">
                <div class="course-level ${course.level}">${course.level} level</div>
                <h3 class="course-title">${course.title}</h3>
                <div class="course-meta">
                    <span>⏱️ ${course.duration}</span>
                    <span>👥 ${course.enrolled}</span>
                </div>
                <div class="course-footer">
                    <button class="course-btn">Start Learning</button>
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
                <div class="author-avatar">${testimonial.avatar}</div>
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

// Event handlers
function exploreCourses(category) {
    console.log(`Exploring courses in: ${category}`);
    // Implement category filtering logic
}

function viewCourse(courseId) {
    console.log(`Viewing course with ID: ${courseId}`);
    // Implement course detail view logic
}

// Initialize sections when page loads
document.addEventListener('DOMContentLoaded', function() {
    populateSections();
    
    // Add scroll animations for course cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

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