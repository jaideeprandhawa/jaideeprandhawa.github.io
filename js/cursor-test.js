/**
 * Use this script to test if the cursor is working properly
 * Open your browser console and paste this code to debug cursor issues
 */

(function() {
    console.log('===== CURSOR DIAGNOSTICS =====');
    
    // Check if cursor elements exist
    const cursorOuter = document.querySelector('.cursor-outer');
    const cursorInner = document.querySelector('.cursor-inner');
    
    console.log(`Cursor Outer exists: ${cursorOuter ? 'YES' : 'NO'}`);
    console.log(`Cursor Inner exists: ${cursorInner ? 'YES' : 'NO'}`);
    
    // Check device detection
    const isMobile = 
        window.innerWidth <= 768 || 
        'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log(`Device detected as: ${isMobile ? 'MOBILE' : 'DESKTOP'}`);
    console.log(`Window width: ${window.innerWidth}px`);
    console.log(`Touch events: ${'ontouchstart' in window ? 'YES' : 'NO'}`);
    
    // Check CSS applications
    if (cursorOuter) {
        const style = window.getComputedStyle(cursorOuter);
        console.log('Cursor Outer CSS properties:');
        console.log(` - display: ${style.display}`);
        console.log(` - opacity: ${style.opacity}`);
        console.log(` - visibility: ${style.visibility}`);
        console.log(` - position: ${style.position}`);
        console.log(` - z-index: ${style.zIndex}`);
    }
    
    // Check document cursor style
    console.log(`HTML cursor style: ${document.documentElement.style.cursor}`);
    console.log(`Body cursor style: ${document.body.style.cursor}`);
    
    // Check if scripts are loaded
    const scripts = document.querySelectorAll('script');
    let cursorScriptFound = false;
    
    scripts.forEach(script => {
        if (script.src.includes('cursor-fix.js')) {
            cursorScriptFound = true;
            console.log(`Cursor script found: ${script.src}`);
        }
    });
    
    console.log(`Cursor script properly loaded: ${cursorScriptFound ? 'YES' : 'NO'}`);
    
    // Fix solution
    console.log('\n===== SUGGESTED FIX =====');
    
    if (!cursorOuter || !cursorInner) {
        console.log('Attempting to create cursor elements...');
        
        // Try to initialize custom cursor manually
        try {
            // Create cursor elements
            const newCursorOuter = document.createElement('div');
            const newCursorInner = document.createElement('div');
            
            // Style elements
            newCursorOuter.className = 'cursor-outer';
            newCursorInner.className = 'cursor-inner';
            newCursorOuter.id = 'cursor-outer-fixed';
            newCursorInner.id = 'cursor-inner-fixed';
            
            newCursorOuter.style.position = 'fixed';
            newCursorOuter.style.pointerEvents = 'none';
            newCursorOuter.style.width = '30px';
            newCursorOuter.style.height = '30px';
            newCursorOuter.style.borderRadius = '50%';
            newCursorOuter.style.border = '2px solid var(--primary-color)';
            newCursorOuter.style.transform = 'translate(-50%, -50%)';
            newCursorOuter.style.zIndex = '9999';
            
            newCursorInner.style.position = 'fixed';
            newCursorInner.style.pointerEvents = 'none';
            newCursorInner.style.width = '8px';
            newCursorInner.style.height = '8px';
            newCursorInner.style.borderRadius = '50%';
            newCursorInner.style.backgroundColor = 'var(--primary-color)';
            newCursorInner.style.transform = 'translate(-50%, -50%)';
            newCursorInner.style.zIndex = '9999';
            
            // Add to DOM
            document.body.appendChild(newCursorOuter);
            document.body.appendChild(newCursorInner);
            
            // Add mouse move event
            document.addEventListener('mousemove', function(e) {
                newCursorOuter.style.left = e.clientX + 'px';
                newCursorOuter.style.top = e.clientY + 'px';
                newCursorInner.style.left = e.clientX + 'px';
                newCursorInner.style.top = e.clientY + 'px';
            });
            
            // Hide default cursor
            document.documentElement.style.cursor = 'none';
            document.body.style.cursor = 'none';
            
            console.log('✅ Manual cursor creation successful!');
        } catch (error) {
            console.error('❌ Manual cursor creation failed:', error);
        }
    } else {
        console.log('Cursor elements exist, checking visibility...');
        
        if (window.getComputedStyle(cursorOuter).display === 'none') {
            console.log('Cursor is hidden by CSS, attempting to fix...');
            
            // Try to override CSS
            cursorOuter.style.cssText = `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                position: fixed !important;
                z-index: 9999 !important;
                pointer-events: none !important;
            `;
            
            cursorInner.style.cssText = `
                display: block !important;
                opacity: 1 !important;
                visibility: visible !important;
                position: fixed !important;
                z-index: 9999 !important;
                pointer-events: none !important;
            `;
            
            console.log('✅ CSS visibility override applied!');
        }
    }
    
    // Final instructions
    console.log('\n===== NEXT STEPS =====');
    console.log('1. Ensure cursor-fix.js is loaded AFTER DOM is ready');
    console.log('2. Check for CSS conflicts in media queries');
    console.log('3. Verify CSS variables are properly defined');
    console.log('4. Try the updated cursor-fix.js file provided');
})();
