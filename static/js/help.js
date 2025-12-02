// ========================================
// Quick Help Tooltip Feature
// NEW UI-ONLY FEATURE: Floating help button with keyboard shortcuts
// ========================================

class QuickHelp {
    constructor() {
        this.helpButton = null;
        this.helpContent = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createHelpUI();
        this.setupEventListeners();
        console.log('✓ Quick Help initialized');
    }

    createHelpUI() {
        // Create help container
        const helpContainer = document.createElement('div');
        helpContainer.className = 'help-tooltip';
        helpContainer.innerHTML = `
            <button class="help-button" id="helpButton" aria-label="Quick Help">
                ❓
            </button>
            <div class="help-content" id="helpContent">
                <h4>⌨️ Keyboard Shortcuts</h4>
                <ul>
                    <li><strong>1-6</strong> Jump to specific section</li>
                    <li><strong>←→</strong> Navigate sections</li>
                    <li><strong>?</strong> Toggle this help</li>
                </ul>
                <h4 style="margin-top: 1rem;">🖱️ Mouse Controls</h4>
                <ul>
                    <li><strong>Left drag</strong> Rotate molecule</li>
                    <li><strong>Scroll</strong> Zoom in/out</li>
                    <li><strong>Right drag</strong> Pan view</li>
                </ul>
                <h4 style="margin-top: 1rem;">💡 Tips</h4>
                <ul>
                    <li>Hover over atoms for info</li>
                    <li>Click tabs to switch sections</li>
                    <li>Use buttons to highlight features</li>
                </ul>
            </div>
        `;
        
        document.body.appendChild(helpContainer);
        
        this.helpButton = document.getElementById('helpButton');
        this.helpContent = document.getElementById('helpContent');
    }

    setupEventListeners() {
        // Button click to toggle help
        if (this.helpButton) {
            this.helpButton.addEventListener('click', () => this.toggleHelp());
        }

        // Close help when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.helpButton.contains(e.target) && 
                !this.helpContent.contains(e.target)) {
                this.closeHelp();
            }
        });

        // Keyboard shortcut "?" to toggle help
        document.addEventListener('keydown', (e) => {
            if (e.key === '?' || e.key === '/') {
                e.preventDefault();
                this.toggleHelp();
            }
        });
    }

    toggleHelp() {
        if (this.isOpen) {
            this.closeHelp();
        } else {
            this.openHelp();
        }
    }

    openHelp() {
        this.isOpen = true;
        this.helpContent.classList.add('active');
        this.helpButton.style.transform = 'scale(1.1) rotate(90deg)';
        console.log('Help opened');
    }

    closeHelp() {
        this.isOpen = false;
        this.helpContent.classList.remove('active');
        this.helpButton.style.transform = 'scale(1) rotate(0deg)';
        console.log('Help closed');
    }
}

// Initialize Quick Help when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.quickHelp = new QuickHelp();
});

console.log('✓ Help.js loaded successfully');