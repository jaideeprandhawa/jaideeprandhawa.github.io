/**
 * Additional responsive improvements for the portfolio website
 * This script enhances the user experience on different devices
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detect device capability and apply optimizations
    detectDeviceCapabilities();
    
    // Handle orientation changes more gracefully
    handleOrientationChanges();
    
    // Optimize scroll performance
    improveScrollPerformance();
    
    // Resize and reposition elements for better layout
    adjustLayoutForScreen();
    
    // Listen for window resize events with debounce
    window.addEventListener('resize', debounce(function() {
        adjustLayoutForScreen();
    }, 250), { passive: true });
});

/**
 * Detects device capabilities and adjusts features accordingly
 */
function detectDeviceCapabilities() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.classList.add('reduced-motion');
        
        // Apply simplified animations
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            * { 
                transition-duration: 0.1s !important;
                animation-duration: 0.1s !important;
            }
            .fade-in {
                opacity: 1 !important;
                transform: none !important;
            }
        `;
        document.head.appendChild(styleSheet);
        
        console.log('Applied reduced motion settings');
    }
    
    // Check display quality and adjust visual effects
    if (window.devicePixelRatio > 1) {
        // High-DPI display
        document.documentElement.classList.add('high-dpi');
    } else {
        // Standard display - simplify some effects
        document.documentElement.classList.add('standard-dpi');
    }
    
    // Check for data-saving mode
    if (navigator.connection && navigator.connection.saveData) {
        document.documentElement.classList.add('data-saver');
        
        // Disable particles to save data
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
    }
}

/**
 * Handle orientation changes gracefully
 */
function handleOrientationChanges() {
    // Listen for orientation changes
    window.addEventListener('orientationchange', function() {
        // Brief timeout to allow layout to settle
        setTimeout(function() {
            // Recalculate section heights
            document.querySelectorAll('section').forEach(function(section) {
                section.style.minHeight = '';
            });
            
            // Re-center hero section
            const homeSection = document.getElementById('home');
            if (homeSection) {
                adjustHomeSection();
            }
        }, 300);
    }, { passive: true });
    
    // Initial adjustment for home section
    function adjustHomeSection() {
        const homeSection = document.getElementById('home');
        const hero = homeSection.querySelector('.hero');
        
        if (window.innerHeight < 500) {
            // Very short screen - compact layout
            homeSection.style.paddingTop = '60px';
            homeSection.style.height = 'auto';
            homeSection.style.minHeight = '100vh';
        } else {
            // Normal height - centered layout
            homeSection.style.paddingTop = '';
            homeSection.style.height = '100vh';
        }
    }
    
    // Call initially
    adjustHomeSection();
}

/**
 * Optimize scroll performance
 */
function improveScrollPerformance() {
    // Use IntersectionObserver for all scroll-based effects
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // For skill bars, animate them when visible
                if (entry.target.classList.contains('skill-progress-bar')) {
                    const fill = entry.target.querySelector('.skill-progress-fill');
                    if (fill) {
                        const width = fill.getAttribute('data-width') || '0%';
                        fill.style.width = width;
                    }
                }
            }
        });
    }, { threshold: 0.15 });
    
    // Observe elements that need animation on scroll
    document.querySelectorAll('section, .skill-progress-bar, .project-card, .education-card').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Adjust layout based on screen size
 */
function adjustLayoutForScreen() {
    // Fix content height on very short screens
    if (window.innerHeight < 600) {
        document.documentElement.classList.add('short-screen');
    } else {
        document.documentElement.classList.remove('short-screen');
    }
    
    // Adjust hero section based on screen width
    const hero = document.querySelector('.hero');
    if (hero) {
        if (window.innerWidth > 1400) {
            hero.style.maxWidth = '900px';
        } else if (window.innerWidth > 992) {
            hero.style.maxWidth = '800px';
        } else {
            hero.style.maxWidth = '';
        }
    }
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(context, args);
        }, wait);
    };
}
