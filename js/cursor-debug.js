/**
 * Debugging script for custom cursor issues
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Cursor debug script loaded');
    
    // Check if custom cursor elements exist
    setTimeout(() => {
        const cursorOuter = document.querySelector('.cursor-outer');
        const cursorInner = document.querySelector('.cursor-inner');
        
        if (!cursorOuter || !cursorInner) {
            console.error('Custom cursor elements not found in DOM!');
        } else {
            console.log('Custom cursor elements found:');
            console.log('- Outer cursor:', cursorOuter);
            console.log('- Inner cursor:', cursorInner);
            
            // Check computed styles
            const outerStyles = window.getComputedStyle(cursorOuter);
            const innerStyles = window.getComputedStyle(cursorInner);
            
            console.log('Outer cursor styles:', {
                display: outerStyles.display,
                opacity: outerStyles.opacity,
                zIndex: outerStyles.zIndex,
                transform: outerStyles.transform,
                width: outerStyles.width,
                height: outerStyles.height,
                backgroundColor: outerStyles.backgroundColor,
                border: outerStyles.border
            });
            
            console.log('Inner cursor styles:', {
                display: innerStyles.display,
                opacity: innerStyles.opacity,
                zIndex: innerStyles.zIndex,
                transform: innerStyles.transform,
                width: innerStyles.width,
                height: innerStyles.height,
                backgroundColor: innerStyles.backgroundColor
            });
        }
        
        // Check if default cursor is properly hidden
        const bodyStyles = window.getComputedStyle(document.body);
        const htmlStyles = window.getComputedStyle(document.documentElement);
        
        console.log('Cursor styles:', {
            body: bodyStyles.cursor,
            html: htmlStyles.cursor
        });
    }, 1000);
    
    // Track mouse movements to confirm events are firing
    let movementCount = 0;
    document.addEventListener('mousemove', function() {
        movementCount++;
        if (movementCount % 100 === 0) { // Log every 100 moves to avoid console spam
            console.log(`Mouse move events working (${movementCount} events)`);
        }
    });
});
