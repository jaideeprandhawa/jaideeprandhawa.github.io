/**
 * Performance monitoring tool for development
 * Include this script only during development
 */
document.addEventListener('DOMContentLoaded', function() {
    // Only run in development/debugging mode
    const isDevMode = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevMode) {
        createPerformanceMonitor();
    }
    
    function createPerformanceMonitor() {
        // Create performance monitor UI
        const monitor = document.createElement('div');
        monitor.classList.add('performance-monitor');
        monitor.style.cssText = `
            position: fixed;
            bottom: 10px;
            right: 90px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 250px;
            backdrop-filter: blur(5px);
        `;
        
        const fps = document.createElement('div');
        fps.textContent = 'FPS: --';
        
        const memory = document.createElement('div');
        memory.textContent = 'Memory: --';
        
        const layoutShifts = document.createElement('div');
        layoutShifts.textContent = 'CLS: 0';
        
        monitor.appendChild(fps);
        monitor.appendChild(memory);
        monitor.appendChild(layoutShifts);
        document.body.appendChild(monitor);
        
        // FPS counter
        let frameCount = 0;
        let lastTime = performance.now();
        let frameRate = 0;
        
        function updateFPS() {
            frameCount++;
            const now = performance.now();
            const delta = now - lastTime;
            
            if (delta >= 1000) {
                frameRate = Math.round((frameCount * 1000) / delta);
                fps.textContent = `FPS: ${frameRate}`;
                frameCount = 0;
                lastTime = now;
                
                // Update memory info if available
                if (window.performance && window.performance.memory) {
                    const used = Math.round(performance.memory.usedJSHeapSize / (1024 * 1024));
                    const total = Math.round(performance.memory.totalJSHeapSize / (1024 * 1024));
                    memory.textContent = `Memory: ${used}MB / ${total}MB`;
                }
            }
            
            requestAnimationFrame(updateFPS);
        }
        
        // Start FPS counter
        updateFPS();
        
        // Monitor Cumulative Layout Shift
        if ('PerformanceObserver' in window) {
            let clsValue = 0;
            
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        layoutShifts.textContent = `CLS: ${clsValue.toFixed(3)}`;
                    }
                });
            });
            
            observer.observe({type: 'layout-shift', buffered: true});
        }
        
        // Add toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'x';
        toggleButton.style.cssText = `
            position: absolute;
            top: 0;
            right: 0;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
        `;
        
        toggleButton.addEventListener('click', function() {
            if (monitor.style.display === 'none') {
                monitor.style.display = 'block';
                toggleButton.textContent = 'x';
            } else {
                monitor.style.display = 'none';
                toggleButton.textContent = 'P';
            }
        });
        
        monitor.appendChild(toggleButton);
    }
});
