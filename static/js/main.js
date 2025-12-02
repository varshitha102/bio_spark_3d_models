// ========================================
// Main Application Logic - ENHANCED VERSION
// Tab Navigation & UI Controls
// ========================================

// Show selected section
function showSection(sectionId) {
    console.log(`Switching to section: ${sectionId}`);
    
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
    
    // Activate corresponding tab
    const activeTab = Array.from(tabs).find(tab => 
        tab.getAttribute('data-section') === sectionId
    );
    
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Special handling for comparison section
    if (sectionId === 'comparison') {
        setTimeout(() => {
            if (typeof initializeComparisonViewers === 'function') {
                initializeComparisonViewers();
            }
        }, 300);
    }
    
    // Refresh viewers when switching to a section with 3D models
    setTimeout(() => {
        refreshViewers(sectionId);
    }, 100);
}

// Refresh 3D viewers to ensure proper rendering
function refreshViewers(sectionId) {
    console.log(`Refreshing viewers for section: ${sectionId}`);
    
    if (sectionId === 'penicillin' && viewers['penicillin']) {
        viewers['penicillin'].render();
    } else if (sectionId === 'ciprofloxacin' && viewers['ciprofloxacin']) {
        viewers['ciprofloxacin'].render();
    } else if (sectionId === 'tetracycline' && viewers['tetracycline']) {
        viewers['tetracycline'].render();
    } else if (sectionId === 'comparison') {
        // Re-render comparison viewers if they exist
        const compareViewers = ['penicillin-compare', 'ciprofloxacin-compare', 'tetracycline-compare'];
        compareViewers.forEach(viewerId => {
            if (viewers[viewerId]) {
                console.log(`Rendering viewer: ${viewerId}`);
                viewers[viewerId].render();
            }
        });
    }
}

// ========================================
// Keyboard Navigation
// ========================================

document.addEventListener('keydown', function(e) {
    const sections = ['overview', 'penicillin', 'ciprofloxacin', 'tetracycline', 'resistance', 'comparison'];
    const currentSection = document.querySelector('.content-section.active');
    
    if (!currentSection) return;
    
    const currentId = currentSection.id;
    const currentIndex = sections.indexOf(currentId);
    
    if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showSection(sections[currentIndex - 1]);
    }
    
    if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
        showSection(sections[currentIndex + 1]);
    }
    
    const numKey = parseInt(e.key);
    if (numKey >= 1 && numKey <= 6) {
        showSection(sections[numKey - 1]);
    }
});

// ========================================
// Smooth Scrolling
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scroll behavior
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

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    // Observe all info cards and feature items
    document.querySelectorAll('.info-card, .feature-item, .process-step').forEach(el => {
        observer.observe(el);
    });
});

// ========================================
// Theme-aware Viewer Updates
// ========================================

function updateViewerThemes() {
    const theme = document.body.getAttribute('data-theme');
    const bgColor = theme === 'dark' ? '#0A0E27' : '#F9FBFF';
    
    Object.keys(viewers).forEach(viewerId => {
        const viewer = viewers[viewerId];
        if (viewer && viewer.setBackgroundColor) {
            viewer.setBackgroundColor(bgColor);
            viewer.render();
        }
    });
}

// Listen for theme changes
if (window.themeManager) {
    const originalApplyTheme = window.themeManager.applyTheme;
    window.themeManager.applyTheme = function(theme) {
        originalApplyTheme.call(this, theme);
        setTimeout(updateViewerThemes, 100);
    };
}

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🧬 BIOSPARK - 3D Molecular Visualization System Initialized');
    
    // Show overview by default
    showSection('overview');
    
    // Add entrance animation
    document.querySelector('.container').style.animation = 'fadeInUp 0.8s ease';
    
    console.log('Keyboard shortcuts:');
    console.log('- Arrow Left/Right: Navigate sections');
    console.log('- Number keys 1-6: Jump to specific section');
    console.log('- Theme toggle: Top right corner');
});

console.log('✓ Main application script loaded successfully');