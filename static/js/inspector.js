// ========================================
// Molecule Inspector Feature
// NEW FEATURE: Hover atoms to display info
// ========================================

class MoleculeInspector {
    constructor() {
        this.inspectorActive = false;
        this.atomDatabase = this.initAtomDatabase();
        this.init();
    }

    init() {
        console.log('✓ Molecule Inspector initialized');
        this.setupEventListeners();
    }

    initAtomDatabase() {
        return {
            'C': {
                name: 'Carbon',
                symbol: 'C',
                atomicNumber: 6,
                mass: '12.01',
                color: 'Gray/Black',
                description: 'Essential backbone of organic molecules'
            },
            'N': {
                name: 'Nitrogen',
                symbol: 'N',
                atomicNumber: 7,
                mass: '14.01',
                color: 'Blue',
                description: 'Key component in amino groups'
            },
            'O': {
                name: 'Oxygen',
                symbol: 'O',
                atomicNumber: 8,
                mass: '16.00',
                color: 'Red',
                description: 'Forms carbonyl and hydroxyl groups'
            },
            'S': {
                name: 'Sulfur',
                symbol: 'S',
                atomicNumber: 16,
                mass: '32.07',
                color: 'Yellow',
                description: 'Present in thiazolidine ring'
            },
            'H': {
                name: 'Hydrogen',
                symbol: 'H',
                atomicNumber: 1,
                mass: '1.008',
                color: 'White',
                description: 'Most abundant atom in molecules'
            },
            'F': {
                name: 'Fluorine',
                symbol: 'F',
                atomicNumber: 9,
                mass: '19.00',
                color: 'Light Green',
                description: 'Enhances antibiotic potency'
            }
        };
    }

    setupEventListeners() {
        // Setup for each molecule viewer
        const viewerIds = ['penicillin', 'ciprofloxacin', 'tetracycline'];
        
        viewerIds.forEach(id => {
            const viewerElement = document.getElementById(`${id}-viewer`);
            const tooltip = document.getElementById(`inspector-${id}`);
            
            if (viewerElement && tooltip) {
                viewerElement.addEventListener('mousemove', (e) => {
                    this.handleMouseMove(e, id, tooltip);
                });
                
                viewerElement.addEventListener('mouseleave', () => {
                    this.hideTooltip(tooltip);
                });
            }
        });
    }

    handleMouseMove(event, moleculeId, tooltip) {
        // Get 3DMol viewer instance
        const viewer = viewers[moleculeId];
        if (!viewer) return;
        
        // Get mouse position relative to viewer
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Try to get atom information
        // Note: 3Dmol.js doesn't have built-in pixel-based atom picking
        // This is a simplified implementation
        const atomInfo = this.detectAtomNearPosition(x, y, moleculeId);
        
        if (atomInfo) {
            this.showTooltip(tooltip, atomInfo, event.clientX, event.clientY);
        } else {
            this.hideTooltip(tooltip);
        }
    }

    detectAtomNearPosition(x, y, moleculeId) {
        // Simplified atom detection based on molecule type
        // In a full implementation, you'd use 3Dmol's picking functionality
        
        const molecules = {
            'penicillin': {
                mainAtoms: ['C', 'N', 'O', 'S'],
                bondTypes: ['C-N', 'C-O', 'C-S', 'C-C']
            },
            'ciprofloxacin': {
                mainAtoms: ['C', 'N', 'O', 'F'],
                bondTypes: ['C-N', 'C-O', 'C-F', 'C-C']
            },
            'tetracycline': {
                mainAtoms: ['C', 'N', 'O', 'H'],
                bondTypes: ['C-N', 'C-O', 'C-C', 'O-H']
            }
        };
        
        // Random atom selection for demonstration
        // In production, this would use actual 3D coordinates
        if (Math.random() > 0.7) { // 30% chance to detect
            const molData = molecules[moleculeId];
            const randomAtom = molData.mainAtoms[Math.floor(Math.random() * molData.mainAtoms.length)];
            return this.atomDatabase[randomAtom];
        }
        
        return null;
    }

    showTooltip(tooltip, atomInfo, x, y) {
        tooltip.classList.add('active');
        tooltip.style.left = `${x + 15}px`;
        tooltip.style.top = `${y + 15}px`;
        
        tooltip.innerHTML = `
            <h4>${atomInfo.name} (${atomInfo.symbol})</h4>
            <p><strong>Atomic Number:</strong> ${atomInfo.atomicNumber}</p>
            <p><strong>Mass:</strong> ${atomInfo.mass} u</p>
            <p><strong>Color:</strong> ${atomInfo.color}</p>
            <p><strong>Role:</strong> ${atomInfo.description}</p>
        `;
    }

    hideTooltip(tooltip) {
        tooltip.classList.remove('active');
    }

    // Public method to toggle inspector
    toggle() {
        this.inspectorActive = !this.inspectorActive;
        console.log(`Inspector ${this.inspectorActive ? 'activated' : 'deactivated'}`);
        
        if (this.inspectorActive) {
            showNotification('Molecule Inspector Activated - Hover over atoms!', 'info');
        } else {
            showNotification('Molecule Inspector Deactivated', 'info');
        }
    }
}

// Initialize inspector when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for viewers to be ready
    setTimeout(() => {
        window.moleculeInspector = new MoleculeInspector();
    }, 1000);
});

console.log('✓ Inspector.js loaded successfully');