// ========================================
// Animated Background Particles System
// Floating molecular particles effect
// ========================================

class ParticleSystem {
    constructor() {
        this.container = document.getElementById('particles');
        this.particles = [];
        this.particleCount = 30;
        this.init();
    }

    init() {
        if (!this.container) return;
        
        this.createParticles();
        this.animateParticles();
        
        // Adjust particle count on resize
        window.addEventListener('resize', () => {
            this.adjustParticleCount();
        });
        
        console.log('✓ Particle System initialized');
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            const particle = this.createParticle();
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: parseFloat(particle.style.left),
                y: parseFloat(particle.style.top),
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: parseFloat(particle.style.width)
            });
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.borderRadius = '50%';
        
        // Random particle type
        const types = [
            'radial-gradient(circle, rgba(41, 121, 255, 0.8), transparent)',
            'radial-gradient(circle, rgba(0, 229, 255, 0.8), transparent)',
            'radial-gradient(circle, rgba(0, 200, 83, 0.8), transparent)',
            'radial-gradient(circle, rgba(255, 214, 0, 0.8), transparent)'
        ];
        particle.style.background = types[Math.floor(Math.random() * types.length)];
        
        particle.style.boxShadow = '0 0 15px rgba(41, 121, 255, 0.5)';
        particle.style.animation = `particleFloat ${5 + Math.random() * 5}s ease-in-out infinite`;
        particle.style.animationDelay = `${Math.random() * 3}s`;
        
        return particle;
    }

    animateParticles() {
        const animate = () => {
            this.particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Bounce off edges
                if (particle.x <= 0 || particle.x >= 100) particle.vx *= -1;
                if (particle.y <= 0 || particle.y >= 100) particle.vy *= -1;
                
                // Apply position
                particle.element.style.left = `${particle.x}%`;
                particle.element.style.top = `${particle.y}%`;
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    adjustParticleCount() {
        const width = window.innerWidth;
        let newCount = 30;
        
        if (width < 768) {
            newCount = 15;
        } else if (width < 1200) {
            newCount = 20;
        }
        
        if (newCount < this.particles.length) {
            // Remove excess particles
            while (this.particles.length > newCount) {
                const removed = this.particles.pop();
                removed.element.remove();
            }
        } else if (newCount > this.particles.length) {
            // Add more particles
            while (this.particles.length < newCount) {
                const particle = this.createParticle();
                this.container.appendChild(particle);
                this.particles.push({
                    element: particle,
                    x: parseFloat(particle.style.left),
                    y: parseFloat(particle.style.top),
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    size: parseFloat(particle.style.width)
                });
            }
        }
        
        this.particleCount = newCount;
    }
}

// Add particle animation CSS
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.6;
        }
        25% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-40px) scale(1);
            opacity: 1;
        }
        75% {
            transform: translateY(-20px) scale(0.9);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(particleStyle);

// Initialize particle system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem();
});

console.log('✓ Particles.js loaded successfully');