// ========================================
// Molecular Structures Data & Loading
// ENHANCED VERSION with Inspector Support
// ========================================

let viewers = {};
let moleculeData = {};

// Initialize all viewers when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Starting viewer initialization...');
    setTimeout(initializeAllViewers, 100);
});

// Initialize all 3D viewers
function initializeAllViewers() {
    console.log('Initializing 3Dmol viewers...');
    
    // Main viewers
    initViewer('penicillin-viewer', '/static/models/penicillin.sdf', 'penicillin');
    initViewer('ciprofloxacin-viewer', '/static/models/ciprofloxacin.sdf', 'ciprofloxacin');
    initViewer('tetracycline-viewer', '/static/models/tetracycline.sdf', 'tetracycline');
    
    console.log('Main viewers initialized');
}

// Initialize a single viewer
function initViewer(elementId, sdfFile, viewerId) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element ${elementId} not found - may not be visible yet`);
        return;
    }
    
    console.log(`Initializing viewer: ${elementId} with ${sdfFile}`);
    
    // Get theme
    const theme = document.body.getAttribute('data-theme');
    const bgColor = theme === 'dark' ? '#0A0E27' : '#F9FBFF';
    
    // Create viewer with explicit configuration
    const config = {
        backgroundColor: bgColor,
        antialias: true,
        cartoonQuality: 10
    };
    
    const viewer = $3Dmol.createViewer(element, config);
    viewers[viewerId] = viewer;
    
    // Load molecule
    fetch(sdfFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            moleculeData[viewerId] = data;
            viewer.addModel(data, "sdf");
            
            // Default style - optimized for visibility
            viewer.setStyle({}, {
                stick: {
                    colorscheme: 'Jmol',
                    radius: 0.15
                },
                sphere: {
                    scale: 0.3,
                    colorscheme: 'Jmol'
                }
            });
            
            viewer.zoomTo();
            viewer.render();
            
            console.log(`✓ Successfully loaded ${sdfFile} into ${elementId}`);
        })
        .catch(error => {
            console.error(`✗ Error loading ${sdfFile}:`, error);
            element.innerHTML = `
                <div style="
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    height: 100%; 
                    color: #e74c3c; 
                    font-weight: bold;
                    text-align: center;
                    padding: 20px;
                    flex-direction: column;
                ">
                    <div style="font-size: 18px; margin-bottom: 10px;">⚠️ Error Loading Molecule</div>
                    <div style="font-size: 14px; color: #666;">
                        Cannot load ${sdfFile}<br>
                        Please check if the file exists.
                    </div>
                </div>`;
        });
}

// Initialize comparison viewers when comparison section is shown
function initializeComparisonViewers() {
    console.log('Initializing comparison viewers...');
    
    // Initialize comparison viewers if they don't exist
    if (!viewers['penicillin-compare']) {
        initViewer('penicillin-compare', '/static/models/penicillin.sdf', 'penicillin-compare');
    }
    if (!viewers['ciprofloxacin-compare']) {
        initViewer('ciprofloxacin-compare', '/static/models/ciprofloxacin.sdf', 'ciprofloxacin-compare');
    }
    if (!viewers['tetracycline-compare']) {
        initViewer('tetracycline-compare', '/static/models/tetracycline.sdf', 'tetracycline-compare');
    }
    
    // Re-render existing comparison viewers
    setTimeout(() => {
        if (viewers['penicillin-compare']) viewers['penicillin-compare'].render();
        if (viewers['ciprofloxacin-compare']) viewers['ciprofloxacin-compare'].render();
        if (viewers['tetracycline-compare']) viewers['tetracycline-compare'].render();
    }, 200);
}

// Reload comparison viewers when comparison section is shown
function reloadComparisonViewers() {
    initializeComparisonViewers();
}

// ========================================
// Penicillin Highlighting Functions
// ========================================

function highlightBetaLactam() {
    const viewer = viewers['penicillin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({serial: [1, 5, 10, 12, 16]}, {
        stick: {color: '#ff6b6b', radius: 0.25},
        sphere: {scale: 0.5, color: '#ff6b6b'}
    });
    
    viewer.render();
    showNotification('β-Lactam Ring highlighted in red', 'success');
}

function highlightThiazolidine() {
    const viewer = viewers['penicillin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({serial: [1, 5, 12, 13, 14, 15]}, {
        stick: {color: '#4dabf7', radius: 0.25},
        sphere: {scale: 0.5, color: '#4dabf7'}
    });
    
    viewer.render();
    showNotification('Thiazolidine Ring highlighted in blue', 'success');
}

function highlightSideChain() {
    const viewer = viewers['penicillin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({serial: [13, 17, 18]}, {
        stick: {color: '#51cf66', radius: 0.25},
        sphere: {scale: 0.5, color: '#51cf66'}
    });
    
    viewer.render();
    showNotification('Side Chain highlighted in green', 'success');
}

function resetPenicillin() {
    const viewer = viewers['penicillin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol'}
    });
    
    viewer.zoomTo();
    viewer.render();
    showNotification('View reset', 'info');
}

// ========================================
// Ciprofloxacin Highlighting Functions
// ========================================

function highlightQuinoloneCore() {
    const viewer = viewers['ciprofloxacin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({serial: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}, {
        stick: {color: '#ffd43b', radius: 0.25},
        sphere: {scale: 0.5, color: '#ffd43b'}
    });
    
    viewer.render();
    showNotification('Quinolone Core highlighted in yellow', 'success');
}

function highlightFluorine() {
    const viewer = viewers['ciprofloxacin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({elem: 'F'}, {
        stick: {color: '#ff6b6b', radius: 0.3},
        sphere: {scale: 0.7, color: '#ff6b6b'}
    });
    
    viewer.render();
    showNotification('Fluorine atom highlighted in red', 'success');
}

function highlightPiperazine() {
    const viewer = viewers['ciprofloxacin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({serial: [14, 15, 16, 17, 18, 19]}, {
        stick: {color: '#a78bfa', radius: 0.25},
        sphere: {scale: 0.5, color: '#a78bfa'}
    });
    
    viewer.render();
    showNotification('Piperazine Ring highlighted in purple', 'success');
}

function resetCiprofloxacin() {
    const viewer = viewers['ciprofloxacin'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol'}
    });
    
    viewer.zoomTo();
    viewer.render();
    showNotification('View reset', 'info');
}

// ========================================
// Tetracycline Highlighting Functions
// ========================================

function highlightRingSystem() {
    const viewer = viewers['tetracycline'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({serial: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}, {
        stick: {color: '#f59e0b', radius: 0.25},
        sphere: {scale: 0.5, color: '#f59e0b'}
    });
    
    viewer.render();
    showNotification('Four-ring system highlighted in orange', 'success');
}

function highlightHydrophilic() {
    const viewer = viewers['tetracycline'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({elem: 'O'}, {
        stick: {color: '#3b82f6', radius: 0.3},
        sphere: {scale: 0.6, color: '#3b82f6'}
    });
    
    viewer.render();
    showNotification('Hydrophilic groups (oxygen) highlighted in blue', 'success');
}

function highlightDimethylamino() {
    const viewer = viewers['tetracycline'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol', opacity: 0.3}
    });
    
    viewer.setStyle({elem: 'N'}, {
        stick: {color: '#ec4899', radius: 0.3},
        sphere: {scale: 0.6, color: '#ec4899'}
    });
    
    viewer.render();
    showNotification('Dimethylamino group (nitrogen) highlighted in pink', 'success');
}

function resetTetracycline() {
    const viewer = viewers['tetracycline'];
    if (!viewer) return;
    
    viewer.setStyle({}, {
        stick: {colorscheme: 'Jmol', radius: 0.15},
        sphere: {scale: 0.3, colorscheme: 'Jmol'}
    });
    
    viewer.zoomTo();
    viewer.render();
    showNotification('View reset', 'info');
}

// ========================================
// Utility Functions
// ========================================

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = '80px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '12px';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '10000';
    notification.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    notification.style.animation = 'slideIn 0.3s ease';
    notification.style.backdropFilter = 'blur(10px)';
    
    if (type === 'success') {
        notification.style.background = 'rgba(0, 200, 83, 0.95)';
        notification.style.color = 'white';
        notification.style.border = '2px solid #00C853';
    } else if (type === 'info') {
        notification.style.background = 'rgba(0, 229, 255, 0.95)';
        notification.style.color = 'white';
        notification.style.border = '2px solid #00E5FF';
    } else if (type === 'error') {
        notification.style.background = 'rgba(255, 23, 68, 0.95)';
        notification.style.color = 'white';
        notification.style.border = '2px solid #FF1744';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
