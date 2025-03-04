document.addEventListener('DOMContentLoaded', function() {
    // Check if particles container exists
    if (document.getElementById('particles-js')) {
        // Initialize particles.js with custom config
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 50, // Reduced number for subtlety
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#4776e6" // Using the secondary color from your theme
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.3, // Low opacity for subtlety
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#3a1c71", // Primary color from your theme
                    "opacity": 0.2, // Low opacity for subtlety
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1, // Slow speed for gentle movement
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.4
                        }
                    }
                }
            },
            "retina_detect": true
        });

        // Update particles for dark mode
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', function() {
                const isDark = document.body.classList.contains('dark-theme');
                updateParticlesForTheme(isDark);
            });
            
            // Initialize based on current theme
            const isDark = document.body.classList.contains('dark-theme');
            updateParticlesForTheme(isDark);
        }
    }
});

// Function to update particle colors based on theme
function updateParticlesForTheme(isDark) {
    if (!window.pJSDom || !window.pJSDom[0]) return;
    
    const particles = window.pJSDom[0].pJS.particles;
    
    if (isDark) {
        // Dark theme colors
        particles.color.value = '#8e54e9';
        particles.line_linked.color = '#4776e6';
    } else {
        // Light theme colors
        particles.color.value = '#4776e6';
        particles.line_linked.color = '#3a1c71';
    }
    
    // Refresh particles
    window.pJSDom[0].pJS.fn.particlesRefresh();
}
