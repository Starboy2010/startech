// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#00ffaa"
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
                    "value": 0.5,
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
                    "color": "#00ffaa",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
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
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.error('particlesJS is not defined. Make sure the particles.js library is included.');
    }

    // Custom cursor
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-dot-outline');

    window.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorOutline.style.left = e.clientX + 'px';
        cursorOutline.style.top = e.clientY + 'px';
        cursor.style.opacity = '1';
        cursorOutline.style.opacity = '1';
    });

    window.addEventListener('mouseout', function() {
        cursor.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    });

    // Typing effect
    const typingTextElement = document.getElementById('typingText');
    const texts = ['Tech Enthusiast', 'Full Stack Developer', 'UI/UX Designer', 'Cybersecurity Expert'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let erasingDelay = 50;
    let newTextDelay = 2000;

    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            typingTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typingDelay);
    }

    // Start typing effect
    setTimeout(type, newTextDelay);

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-number');
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const count = +stat.innerText;
            const increment = target / 30;
            
            if (count < target) {
                stat.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 50);
            } else {
                stat.innerText = target;
            }
        });
    }

    // Trigger stats animation when in viewport
    const aboutSection = document.querySelector('.about');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(aboutSection);

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.previousElementSibling.lastElementChild.textContent;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillsObserver.observe(bar);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show a success message
            
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            console.log('Form submitted:', formValues);
            
            // Reset form
            contactForm.reset();
            
            // Show success message (you could add a proper notification system)
            alert('Thank you for your message! I will get back to you soon.');
        });
    }

    // Audio control
    const audioToggle = document.getElementById('audioToggle');
    const audioIcon = document.getElementById('audioIcon');
    const backgroundAudio = document.getElementById('backgroundAudio');
    
    if (audioToggle && backgroundAudio) {
        audioToggle.addEventListener('click', function() {
            if (backgroundAudio.paused) {
                backgroundAudio.play();
                audioIcon.classList.remove('fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
            } else {
                backgroundAudio.pause();
                audioIcon.classList.remove('fa-volume-up');
                audioIcon.classList.add('fa-volume-mute');
            }
        });
    }

    // Initialize audio as muted by default
    if (backgroundAudio) {
        backgroundAudio.volume = 0.3; // Set volume to 30%
        audioIcon.classList.remove('fa-volume-up');
        audioIcon.classList.add('fa-volume-mute');
    }
});