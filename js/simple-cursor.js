/**
 * Simplified cursor implementation
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple cursor script loaded');
    
    // Create cursor elements
    const cursorOuter = document.createElement('div');
    const cursorInner = document.createElement('div');
    
    // Style directly to avoid CSS conflicts
    cursorOuter.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 2px solid #3a1c71;
        opacity: 0.8;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, background-color 0.2s;
        display: block;
    `;
    
    cursorInner.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #3a1c71;
        left: 0;
        top: 0;
        transform: translate(-50%, -50%);
        display: block;
    `;
    
    cursorOuter.classList.add('cursor-outer-simple');
    cursorInner.classList.add('cursor-inner-simple');
    
    document.body.appendChild(cursorOuter);
    document.body.appendChild(cursorInner);
    
    // Handle mouse movement with direct positioning
    document.addEventListener('mousemove', function(e) {
        cursorOuter.style.left = e.clientX + 'px';
        cursorOuter.style.top = e.clientY + 'px';
        
        cursorInner.style.left = e.clientX + 'px';
        cursorInner.style.top = e.clientY + 'px';
    });
    
    // Hide default cursor
    document.documentElement.style.cursor = 'none';
    
    console.log('Simple cursor initialized');
});
