/**
 * Standalone cursor implementation - designed to be more robust
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔍 Cursor Fix Script Loaded');
    
    // Ensure any existing cursors are removed first
    document.querySelectorAll('.cursor-outer, .cursor-inner').forEach(el => el.remove());
    
    // Create new cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    // Add identifiable classes
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    cursorOuter.setAttribute('id', 'cursor-outer-fixed');
    cursorInner.setAttribute('id', 'cursor-inner-fixed');
    
    // Add to DOM
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Directly position the cursor elements using clientX/Y
    document.addEventListener('mousemove', function(e) {
        requestAnimationFrame(() => {
            cursorOuter.style.left = `${e.clientX}px`;
            cursorOuter.style.top = `${e.clientY}px`;
            cursorInner.style.left = `${e.clientX}px`;
            cursorInner.style.top = `${e.clientY}px`;
        });
    });
    
    // Show cursor elements (ensure they're visible)
    cursorOuter.style.display = 'block';
    cursorInner.style.display = 'block';
    cursorOuter.style.opacity = '1';
    cursorInner.style.opacity = '1';
    
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
    
    // Add visibility check via debug console
    setTimeout(() => {
        const isCursorVisible = 
            window.getComputedStyle(cursorOuter).display === 'block' && 
            window.getComputedStyle(cursorOuter).opacity !== '0';
        
        console.log(`🖱️ Custom cursor visibility check: ${isCursorVisible ? 'VISIBLE' : 'HIDDEN'}`);
        
        if (!isCursorVisible) {
            console.warn('🔴 Cursor may be hidden. Trying emergency fixes...');
            
            // Emergency fixes for visibility issues
            cursorOuter.style.cssText = `
                position: fixed !important;
                display: block !important;
                opacity: 1 !important;
                z-index: 10000 !important;
                pointer-events: none !important;
                border-radius: 50% !important;
                width: 30px !important;
                height: 30px !important;
                border: 2px solid #3a1c71 !important;
                transform: translate(-50%, -50%) !important;
            `;
            
            cursorInner.style.cssText = `
                position: fixed !important;
                display: block !important;
                opacity: 1 !important;
                z-index: 10001 !important;
                pointer-events: none !important;
                border-radius: 50% !important;
                width: 8px !important;
                height: 8px !important;
                background-color: #3a1c71 !important;
                transform: translate(-50%, -50%) !important;
            `;
        }
    }, 1000);
    
    // Check for mobile and disable if needed
    if ((window.innerWidth <= 768) || ('ontouchstart' in window) || (navigator.maxTouchPoints > 0)) {
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
        document.body.style.cursor = 'auto';
        console.log('📱 Mobile device detected - custom cursor disabled');
    } else {
        console.log('💻 Desktop device detected - custom cursor enabled');
    }
});
