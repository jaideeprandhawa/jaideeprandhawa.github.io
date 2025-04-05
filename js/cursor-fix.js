/**
 * Enhanced cursor implementation with improved reliability and debugging
 * This version addresses issues with GitHub Pages deployment
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Cursor script loaded - DOMContentLoaded event fired');
    initCursorSystem();
});

// Additional event listener for safety
window.addEventListener('load', function() {
    console.log('🔍 Cursor script - window load event fired');
    // Double-check if cursor was already initialized
    const existingCursor = document.getElementById('cursor-outer-fixed');
    if (!existingCursor) {
        console.log('🔄 No cursor found - initializing on window load');
        initCursorSystem();
    }
});

/**
 * Main cursor system initialization - centralized to avoid code duplication
 */
function initCursorSystem() {
    // Improved mobile device detection
    const isMobileDevice = detectMobileDevice();
    console.log(`📱 Device detection: ${isMobileDevice ? 'Mobile' : 'Desktop'}`);

    // Initialize cursor only if not on mobile
    if (!isMobileDevice) {
        console.log('🔍 Desktop detected: Initializing custom cursor');
        try {
            initCustomCursor();
            console.log('✅ Custom cursor initialized successfully');
        } catch (error) {
            console.error('❌ Error initializing cursor:', error);
        }
    } else {
        console.log('📱 Mobile device detected: Disabling custom cursor');
        ensureDefaultCursorOnMobile();
    }
}

/**
 * Enhanced mobile detection function
 */
function detectMobileDevice() {
    // Multiple checks for more reliable detection
    return (
        window.innerWidth <= 768 || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.matchMedia('(hover: none)').matches
    );
}

/**
 * Ensure default cursor behavior on mobile
 */
function ensureDefaultCursorOnMobile() {
    document.documentElement.style.cursor = 'auto';
    document.body.style.cursor = 'auto';
    
    // Remove any existing cursor elements
    document.querySelectorAll('.cursor-outer, .cursor-inner').forEach(el => {
        if (el) el.remove();
    });
    
    // Add a style tag to ensure cursor doesn't appear on mobile
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        @media (pointer: coarse), (max-width: 768px) {
            .cursor-outer, .cursor-inner {
                display: none !important;
                opacity: 0 !important;
                visibility: hidden !important;
            }
            * {
                cursor: auto !important;
            }
        }
    `;
    document.head.appendChild(styleTag);
}

/**
 * Main cursor initialization function
 */
function initCustomCursor() {
    // Remove any existing cursors to prevent duplication
    document.querySelectorAll('.cursor-outer, .cursor-inner').forEach(el => {
        if (el) el.remove();
    });
    
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    // Add identifiable classes
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    cursorOuter.setAttribute('id', 'cursor-outer-fixed');
    cursorInner.setAttribute('id', 'cursor-inner-fixed');
    
    // Set initial position to center to avoid flashing at corner
    cursorOuter.style.left = '50%';
    cursorOuter.style.top = '50%';
    cursorInner.style.left = '50%';
    cursorInner.style.top = '50%';
    
    // Ensure opacity is set correctly
    cursorOuter.style.opacity = '1';
    cursorInner.style.opacity = '1';
    
    // Ensure pointerEvents is none
    cursorOuter.style.pointerEvents = 'none';
    cursorInner.style.pointerEvents = 'none';
    
    // Add to DOM
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Handle cursor positioning with improved performance
    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let isMoving = false;
    
    document.addEventListener('mousemove', function(e) {
        cursorX = e.clientX;
        cursorY = e.clientY;
        isMoving = true;
        
        // Show cursors if hidden
        if (cursorOuter.style.opacity === '0') {
            cursorOuter.style.opacity = '1';
            cursorInner.style.opacity = '1';
        }
    });
    
    // Animation loop for smooth cursor movement
    function animateCursor() {
        if (isMoving) {
            // Position cursors
            cursorOuter.style.left = `${cursorX}px`;
            cursorOuter.style.top = `${cursorY}px`;
            cursorInner.style.left = `${cursorX}px`;
            cursorInner.style.top = `${cursorY}px`;
            isMoving = false;
        }
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation loop
    animateCursor();
    
    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .education-card, .experience-card, .skill-category, .contact-item, .theme-toggle');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
        });
    });
    
    // Interactive click
    document.addEventListener('mousedown', () => {
        cursorOuter.classList.add('cursor-active');
        cursorInner.classList.add('cursor-active');
    });
    
    document.addEventListener('mouseup', () => {
        cursorOuter.classList.remove('cursor-active');
        cursorInner.classList.remove('cursor-active');
    });
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';
    
    // Hide cursor when mouse leaves window
    document.addEventListener('mouseleave', function() {
        cursorOuter.style.opacity = '0';
        cursorInner.style.opacity = '0';
    });
    
    // Show cursor when mouse enters window
    document.addEventListener('mouseenter', function() {
        cursorOuter.style.opacity = '1';
        cursorInner.style.opacity = '1';
    });
    
    // Debug info
    console.log(`Cursor elements created - outer: ${cursorOuter.id}, inner: ${cursorInner.id}`);
    
    // Return cursor controls for potential external use
    return {
        show: () => {
            cursorOuter.style.opacity = '1';
            cursorInner.style.opacity = '1';
        },
        hide: () => {
            cursorOuter.style.opacity = '0';
            cursorInner.style.opacity = '0';
        },
        destroy: () => {
            cursorOuter.remove();
            cursorInner.remove();
            document.documentElement.style.cursor = 'auto';
            document.body.style.cursor = 'auto';
        }
    };
}

// Periodically check if cursor has been removed and recreate if necessary
// This handles edge cases like theme changes or dynamic content updates
setInterval(() => {
    const isMobileDevice = detectMobileDevice();
    const cursorOuter = document.getElementById('cursor-outer-fixed');
    
    if (!isMobileDevice && !cursorOuter) {
        console.log('🔄 Cursor elements not found - recreating');
        initCustomCursor();
    }
}, 5000);
