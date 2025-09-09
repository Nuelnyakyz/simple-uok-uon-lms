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