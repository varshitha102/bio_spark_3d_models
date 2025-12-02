// ========================================
// AI Voice Explanation Feature
// Text-to-Speech for molecule descriptions
// ========================================

class VoiceExplanation {
    constructor() {
        this.speaking = false;
        this.synthesis = window.speechSynthesis;
        this.voiceToggle = document.getElementById('voiceToggle');
        this.currentUtterance = null;
        this.init();
    }

    init() {
        if (!this.synthesis) {
            console.warn('Speech Synthesis not supported');
            return;
        }
        
        this.setupEventListeners();
        console.log('✓ Voice Explanation initialized');
    }

    setupEventListeners() {
        if (this.voiceToggle) {
            this.voiceToggle.addEventListener('click', () => {
                this.toggleSpeaking();
            });
        }
        
        // Auto-read section content when tab changes
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.speaking) {
                    setTimeout(() => {
                        this.readCurrentSection();
                    }, 500);
                }
            });
        });
    }

    toggleSpeaking() {
        if (this.speaking) {
            this.stop();
        } else {
            this.speaking = true;
            this.updateIcon();
            this.readCurrentSection();
            showNotification('Voice explanation started', 'info');
        }
    }

    readCurrentSection() {
        const activeSection = document.querySelector('.content-section.active');
        if (!activeSection) return;
        
        const sectionTitle = activeSection.querySelector('h2')?.textContent || '';
        const sectionContent = this.extractSectionText(activeSection);
        
        const textToRead = `${sectionTitle}. ${sectionContent}`;
        this.speak(textToRead);
    }

    extractSectionText(section) {
        // Extract meaningful text from the section
        const texts = [];
        
        // Get main paragraphs
        section.querySelectorAll('p').forEach(p => {
            const text = p.textContent.trim();
            if (text && text.length > 20) {
                texts.push(text);
            }
        });
        
        // Limit to first 3 paragraphs for brevity
        return texts.slice(0, 3).join('. ');
    }

    speak(text) {
        // Stop any ongoing speech
        this.synthesis.cancel();
        
        // Create new utterance
        this.currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Configure voice properties
        this.currentUtterance.rate = 0.9; // Slightly slower for clarity
        this.currentUtterance.pitch = 1.0;
        this.currentUtterance.volume = 1.0;
        
        // Get available voices
        const voices = this.synthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
            this.currentUtterance.voice = englishVoice;
        }
        
        // Event handlers
        this.currentUtterance.onend = () => {
            console.log('Speech finished');
        };
        
        this.currentUtterance.onerror = (event) => {
            console.error('Speech error:', event);
            showNotification('Voice explanation error', 'error');
        };
        
        // Start speaking
        this.synthesis.speak(this.currentUtterance);
    }

    stop() {
        this.synthesis.cancel();
        this.speaking = false;
        this.updateIcon();
        showNotification('Voice explanation stopped', 'info');
    }

    updateIcon() {
        const icon = this.voiceToggle.querySelector('.voice-icon');
        if (icon) {
            icon.textContent = this.speaking ? '🔇' : '🔊';
        }
        
        if (this.speaking) {
            this.voiceToggle.style.background = 'rgba(0, 200, 83, 0.2)';
            this.voiceToggle.style.borderColor = '#00C853';
        } else {
            this.voiceToggle.style.background = 'var(--glass-bg)';
            this.voiceToggle.style.borderColor = 'var(--primary)';
        }
    }

    // Public method to speak custom text
    speakText(text) {
        if (text) {
            this.speak(text);
        }
    }
}

// Initialize voice explanation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.voiceExplanation = new VoiceExplanation();
});

console.log('✓ Voice.js loaded successfully');