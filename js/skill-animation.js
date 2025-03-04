document.addEventListener('DOMContentLoaded', function() {
    // Initialize skill bar animations
    const skillBars = document.querySelectorAll('.skill-progress-bar');
    
    if (skillBars.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fill = entry.target.querySelector('.skill-progress-fill');
                    const width = fill.style.width;
                    
                    // Animate the fill
                    fill.style.width = '0';
                    
                    // Force a reflow to ensure animation works
                    void fill.offsetWidth;
                    
                    // Set the final width with transition
                    fill.style.width = width;
                }
            });
        }, { threshold: 0.5 });
        
        skillBars.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    console.log('Skill animations initialized');
});
