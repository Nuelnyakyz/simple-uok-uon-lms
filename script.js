// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Initialize - make sure the first tab is active
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        // Remove active class from all first
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Set first tab as active
        tabBtns[0].classList.add('active');
        const firstTabId = tabBtns[0].getAttribute('data-tab');
        const firstPane = document.getElementById(firstTabId);
        if (firstPane) {
            firstPane.classList.add('active');
        }
    }
    
    // Add click event listeners to all tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = this.getAttribute('data-tab');
            const targetPane = document.getElementById(tabId);
            
            if (targetPane) {
                targetPane.classList.add('active');
            }
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
        
        // Open the clicked module
        moduleContent.classList.add('active');
        moduleItem.classList.add('expanded');
    }
}