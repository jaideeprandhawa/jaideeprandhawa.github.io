/**
 * Portfolio Website JavaScript
 * Main functionality for theme toggling, animations, and interactivity
 * Optimized for performance and maintainability
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio initialized');
    
    // Initialize all features
    initThemeToggle();
    initNavigation();
    initAnimations();
    initMiscFeatures();
    
    // Check and disable heavy features on mobile devices
    if (isMobileDevice()) {
        optimizeForMobile();
    }
});

/**
 * Detects if the user is on a mobile device
 * @returns {boolean} true if mobile device detected
 */
function isMobileDevice() {
    return (window.innerWidth <= 768) || 
           ('ontouchstart' in window) || 
           (navigator.maxTouchPoints > 0);
}

/**
 * Optimizes the site for mobile by disabling heavy features
 */
function optimizeForMobile() {
    // Disable custom cursor on mobile
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    if (cursorOuter && cursorInner) {
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
    }
    
    // Disable particles animation if it exists
    if (window.pJSDom && window.pJSDom[0]) {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.display = 'none';
        }
    }
    
    console.log('Mobile optimizations applied');
}

/**
 * Theme toggler initialization with improved performance
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Apply theme based on preference or system setting
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-theme');
        updateThemeIcon(themeToggle, true);
    }
    
    // Add click event listener
    themeToggle.addEventListener('click', function() {
        const isDarkMode = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(themeToggle, isDarkMode);
        
        // Update particles theme if they exist
        if (window.pJSDom && window.pJSDom[0] && typeof updateParticlesForTheme === 'function') {
            updateParticlesForTheme(isDarkMode);
        }
        
        // Update cursor colors
        updateCursorForTheme(isDarkMode);
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', function(e) {
        // Only apply if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
            const isDarkMode = e.matches;
            document.body.classList.toggle('dark-theme', isDarkMode);
            updateThemeIcon(themeToggle, isDarkMode);
        }
    });
}

/**
 * Updates theme toggle icon based on current theme
 * @param {Element} toggleButton - The theme toggle button element
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function updateThemeIcon(toggleButton, isDarkMode) {
    const icon = toggleButton.querySelector('i');
    if (!icon) return;
    
    if (isDarkMode) {
        if (icon.classList.contains('fa-moon')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    } else {
        if (icon.classList.contains('fa-sun')) {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
}

/**
 * Updates cursor colors based on current theme
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function updateCursorForTheme(isDarkMode) {
    const cursorElements = document.querySelectorAll('.cursor-outer, .cursor-inner');
    
    if (cursorElements.length) {
        // The CSS will handle the specific styling through the dark-theme class
        console.log(`Cursor theme updated: ${isDarkMode ? 'dark' : 'light'}`);
    }
}

/**
 * Initializes navigation functionality with performance improvements
 */
function initNavigation() {
    // Debounced scroll handler for better performance
    let scrollTimeout;
    
    function debouncedScrollHandler() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }, 10);
    }
    
    // Passive event listener for scroll events
    window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
    
    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-links li a').forEach(item => {
            item.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling with better performance
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(targetId);
            
            if (target) {
                // Use requestAnimationFrame for smoother scrolling
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 70;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 800;
                let startTime = null;
                
                function scrollAnimation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const scrollY = ease(timeElapsed, startPosition, distance, duration);
                    
                    window.scrollTo(0, scrollY);
                    if (timeElapsed < duration) {
                        requestAnimationFrame(scrollAnimation);
                    }
                }
                
                // Easing function
                function ease(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }
                
                requestAnimationFrame(scrollAnimation);
            }
        });
    });
}

/**
 * Initialize animations with performance improvements
 */
function initAnimations() {
    // Animate skill bars
    animateSkillBars();
    
    // Fade in sections on scroll
    animateSectionsOnScroll();
    
    // Initialize custom cursor if not mobile
    if (!isMobileDevice()) {
        initCustomCursor();
    }
}

/**
 * Animate skill progress bars with improved performance
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress-fill');
    
    if (skillBars.length > 0) {
        // Store original widths before setting to zero
        skillBars.forEach(bar => {
            const width = bar.style.width || '0%';
            bar.setAttribute('data-width', width);
            bar.style.width = '0';
        });
        
        // Optimized intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const targetWidth = bar.getAttribute('data-width');
                    
                    // Use requestAnimationFrame for smoother animation
                    requestAnimationFrame(() => {
                        bar.style.width = targetWidth;
                    });
                    
                    observer.unobserve(bar);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Observe each skill bar
        skillBars.forEach(bar => observer.observe(bar));
    }
}

/**
 * Animate sections when scrolled into view
 */
function animateSectionsOnScroll() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '-50px' });
    
    sections.forEach(section => observer.observe(section));
}

/**
 * Disable the original custom cursor to avoid conflicts
 */
function initCustomCursor() {
    console.log('Original cursor implementation bypassed - using standalone cursor instead');
    // Original implementation is disabled to avoid conflicts
    // The cursor-fix.js script handles the cursor functionality
}

/**
 * Initialize miscellaneous features
 */
function initMiscFeatures() {
    // Add back-to-top button functionality
    const backToTopButton = document.querySelector('.back-to-top') || createBackToTopButton();
    
    if (backToTopButton) {
        // Throttled scroll handler
        let lastScrollTime = 0;
        window.addEventListener('scroll', function() {
            const now = performance.now();
            if (now - lastScrollTime > 100) { // Check every 100ms
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('active');
                } else {
                    backToTopButton.classList.remove('active');
                }
                lastScrollTime = now;
            }
        }, { passive: true });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Creates a back-to-top button if it doesn't exist
 * @returns {Element} The back-to-top button
 */
function createBackToTopButton() {
    const button = document.createElement('button');
    button.classList.add('back-to-top');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('title', 'Back to top');
    document.body.appendChild(button);
    return button;
}