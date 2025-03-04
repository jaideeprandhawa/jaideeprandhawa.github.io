// This file is now integrated into main.js for better performance
// Please delete this file to reduce HTTP requests

document.addEventListener('DOMContentLoaded', function() {
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    // Add classes for styling
    cursorOuter.classList.add('cursor-outer');
    cursorInner.classList.add('cursor-inner');
    
    // Append to the body
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Track cursor position
    let mouseX = 0;
    let mouseY = 0;
    let outX = 0;
    let outY = 0;
    let innerX = 0;
    let innerY = 0;
    
    // Update mouse position variables on mouse move
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Animation loop for smooth cursor movement using requestAnimationFrame
    function animateCursor() {
        // Calculate smooth movement with easing
        let outSpeed = 0.1;
        let innerSpeed = 0.2;
        
        outX += (mouseX - outX) * outSpeed;
        outY += (mouseY - outY) * outSpeed;
        innerX += (mouseX - innerX) * innerSpeed;
        innerY += (mouseY - innerY) * innerSpeed;
        
        // Apply transforms to cursor elements
        cursorOuter.style.transform = `translate3d(${outX}px, ${outY}px, 0)`;
        cursorInner.style.transform = `translate3d(${innerX}px, ${innerY}px, 0)`;
        
        requestAnimationFrame(animateCursor);
    }
    
    // Start animation
    animateCursor();
    
    // Add interactive states
    
    // Hoverable elements (links, buttons, cards)
    const hoverables = document.querySelectorAll('a, button, .project-card, .education-card, .experience-card, .skill-category, .contact-item, .theme-toggle');
    
    hoverables.forEach(hoverable => {
        // Grow cursor on hover
        hoverable.addEventListener('mouseenter', () => {
            cursorOuter.classList.add('cursor-hover');
            cursorInner.classList.add('cursor-hover');
        });
        
        // Return to normal when not hovering
        hoverable.addEventListener('mouseleave', () => {
            cursorOuter.classList.remove('cursor-hover');
            cursorInner.classList.remove('cursor-hover');
        });
    });
    
    // Active state for clickable elements
    const clickables = document.querySelectorAll('a, button, input[type="submit"], .theme-toggle');
    
    clickables.forEach(clickable => {
        // Shrink cursor on mouse down
        clickable.addEventListener('mousedown', () => {
            cursorOuter.classList.add('cursor-active');
            cursorInner.classList.add('cursor-active');
        });
        
        // Return to hover state on mouse up
        clickable.addEventListener('mouseup', () => {
            cursorOuter.classList.remove('cursor-active');
            cursorInner.classList.remove('cursor-active');
        });
    });
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    
    // Show default cursor when it leaves the window
    document.addEventListener('mouseout', function(e) {
        if (e.relatedTarget === null) {
            document.documentElement.style.cursor = 'auto';
            cursorOuter.style.display = 'none';
            cursorInner.style.display = 'none';
        }
    });
    
    document.addEventListener('mouseover', function() {
        document.documentElement.style.cursor = 'none';
        cursorOuter.style.display = 'block';
        cursorInner.style.display = 'block';
    });
    
    // Disable custom cursor on mobile devices
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               ('ontouchstart' in window) || 
               (navigator.maxTouchPoints > 0);
    }
    
    if (isMobileDevice()) {
        cursorOuter.style.display = 'none';
        cursorInner.style.display = 'none';
        document.documentElement.style.cursor = 'auto';
    }
});
