document.addEventListener('DOMContentLoaded', () => {

    // 1. LOADING SCREEN
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 600);
        }, 2500);
    }

    // 2. CURSOR GLOW EFFECT
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }

    // 3. NAVBAR SCROLL BEHAVIOR
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Active section highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('data-section') === id);
                    });
                }
            });
        }, { threshold: 0.3 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // 4. HAMBURGER MENU
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.querySelectorAll('.mobile-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 5. PARTICLES.JS
    try {
        if (typeof particlesJS === 'function') {
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#C9A96E' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.6, random: true },
                    size: { value: 2.5, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#C9A96E',
                        opacity: 0.3,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 0.8,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: false },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 180, line_linked: { opacity: 0.3 } }
                    }
                },
                retina_detect: true
            });
        }
    } catch (e) {
        console.warn('Particles.js skipped:', e.message);
    }

    // 6. TYPED.JS
    try {
        if (typeof Typed === 'function') {
            new Typed('#typed-role', {
                strings: ['Full Stack Developer', 'CS Undergraduate', 'React.js Developer', 'AI Enthusiast', 'Problem Solver'],
                typeSpeed: 60,
                backSpeed: 40,
                backDelay: 2000,
                loop: true,
                cursorChar: '|'
            });
        }
    } catch (e) {
        // Fallback: just show first role
        const el = document.getElementById('typed-role');
        if (el) el.textContent = 'Full Stack Developer';
    }

    // 7. SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // 8. SKILL RING ANIMATIONS
    const skillRings = document.querySelectorAll('.skill-ring');
    if (skillRings.length > 0) {
        const circumference = 2 * Math.PI * 42; // radius = 42

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const circle = entry.target.querySelector('.ring-fill');
                    if (circle) {
                        const percent = parseFloat(circle.getAttribute('data-percent')) || 0;
                        const offset = circumference - (percent / 100) * circumference;
                        circle.style.strokeDasharray = circumference;
                        // Force reflow before setting new offset
                        void circle.offsetWidth;
                        circle.style.strokeDashoffset = offset;
                    }
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillRings.forEach(ring => skillObserver.observe(ring));
    }

    // 9. COUNT-UP ANIMATION
    const statNumbers = document.querySelectorAll('.stat-number, .achievement-stat-number');
    if (statNumbers.length > 0) {
        const countObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'), 10) || 0;
                    const duration = 2000;
                    let start = null;

                    function step(ts) {
                        if (!start) start = ts;
                        const progress = Math.min((ts - start) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                        el.textContent = Math.floor(eased * target);
                        if (progress < 1) {
                            requestAnimationFrame(step);
                        } else {
                            el.textContent = target;
                        }
                    }

                    requestAnimationFrame(step);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(stat => countObserver.observe(stat));
    }

    // 10. MAGNETIC HOVER EFFECT
    document.querySelectorAll('.magnetic-hover').forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
            el.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.transition = 'transform 0.3s ease';
            el.style.transform = 'translate(0, 0)';
            setTimeout(() => { el.style.transition = ''; }, 300);
        });
    });

    // 11. SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const id = this.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                if (hamburger && mobileMenu && mobileMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 12. CONTACT FORM
    const form = document.getElementById('contactForm');
    const status = document.getElementById('formStatus');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let valid = true;
            form.querySelectorAll('[required]').forEach(input => {
                if (!input.value.trim()) valid = false;
            });
            if (valid && status) {
                const formData = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
                if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
                
                try {
                    const response = await fetch('https://formsubmit.co/ajax/hematejaswi29@gmail.com', {
                        method: 'POST',
                        headers: { 'Accept': 'application/json' },
                        body: formData
                    });
                    
                    if (response.ok) {
                        status.textContent = 'Message sent successfully!';
                        status.style.color = '#27ae60';
                        form.reset();
                    } else {
                        status.textContent = 'Failed to send message. Please try again.';
                        status.style.color = '#e74c3c';
                    }
                } catch (error) {
                    console.error("Form error:", error);
                    status.textContent = 'Error: ' + error.message + ' (Are you opening this from file:///?)';
                    status.style.color = '#e74c3c';
                }
                
                if (submitBtn) submitBtn.innerHTML = originalText;
                setTimeout(() => { status.textContent = ''; }, 5000);
            }
        });
    }

    // 13. Vanilla Tilt — auto-initializes on [data-tilt] elements via CDN
});
