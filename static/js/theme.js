// ========================================
// Theme Management System
// Light/Dark Mode Toggle with Smooth Transitions
// ========================================

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }

    init() {
        this.applyTheme(this.theme);
        this.setupEventListeners();
        console.log('✓ Theme Manager initialized');
    }

    setupEventListeners() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.theme);
        localStorage.setItem('theme', this.theme);
        
        // Add ripple effect
        this.createRipple(this.themeToggle);
    }

    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        // Update theme icons
        const sunIcon = document.querySelector('.theme-icon.sun');
        const moonIcon = document.querySelector('.theme-icon.moon');
        
        if (theme === 'light') {
            sunIcon?.classList.add('active');
            moonIcon?.classList.remove('active');
        } else {
            sunIcon?.classList.remove('active');
            moonIcon?.classList.add('active');
        }
        
        // Trigger transition animation
        document.body.style.transition = 'background 0.3s ease, color 0.3s ease';
        
        console.log(`Theme switched to: ${theme}`);
    }

    createRipple(element) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.animation = 'rippleEffect 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
}

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes rippleEffect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(3);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Initialize theme manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

console.log('✓ Theme.js loaded successfully');