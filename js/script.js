// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Section header fade-in: trigger when header enters viewport
const headerObserverOptions = { threshold: 0, rootMargin: '0px 0px 0px 0px' };
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-header--in-view');
        }
    });
}, headerObserverOptions);

function isHeaderInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .contact-item, .about-text');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Section headers: fade in when in view (Selected Works, Get In Touch)
    const projectsHeader = document.getElementById('projects-header');
    const contactHeader = document.getElementById('contact-header');
    if (projectsHeader) {
        headerObserver.observe(projectsHeader);
        if (isHeaderInViewport(projectsHeader)) projectsHeader.classList.add('section-header--in-view');
    }
    if (contactHeader) {
        headerObserver.observe(contactHeader);
        if (isHeaderInViewport(contactHeader)) contactHeader.classList.add('section-header--in-view');
    }
    // If headers are in view after layout (e.g. small viewport), add class on next frame
    requestAnimationFrame(() => {
        if (projectsHeader && isHeaderInViewport(projectsHeader)) projectsHeader.classList.add('section-header--in-view');
        if (contactHeader && isHeaderInViewport(contactHeader)) contactHeader.classList.add('section-header--in-view');
    });
    // Fallback: if a header is in view but still doesn't have the class (e.g. observer delayed), add it
    setTimeout(() => {
        if (projectsHeader && !projectsHeader.classList.contains('section-header--in-view') && isHeaderInViewport(projectsHeader)) projectsHeader.classList.add('section-header--in-view');
        if (contactHeader && !contactHeader.classList.contains('section-header--in-view') && isHeaderInViewport(contactHeader)) contactHeader.classList.add('section-header--in-view');
    }, 400);

    // On scroll, add class when header is in view (backup if observer misses)
    function checkSectionHeadersInView() {
        if (projectsHeader && isHeaderInViewport(projectsHeader)) projectsHeader.classList.add('section-header--in-view');
        if (contactHeader && isHeaderInViewport(contactHeader)) contactHeader.classList.add('section-header--in-view');
    }
    window.addEventListener('scroll', checkSectionHeadersInView);
    window.addEventListener('resize', checkSectionHeadersInView);
});

// Scroll event listeners
window.addEventListener('scroll', () => {
    updateActiveNavLink();
    updateNavbarBackground();
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        const originalText = heroName.textContent;
        setTimeout(() => {
            typeWriter(heroName, originalText, 150);
        }, 1000);
    }
});

// Parallax effect for hero section
function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}

window.addEventListener('scroll', updateParallax);

// Project card hover effects
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Contact form validation (if you add a form later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function to debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
    updateNavbarBackground();
    updateParallax();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero elements
    const heroElements = document.querySelectorAll('.hero-content > *');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set initial states
    updateActiveNavLink();
    updateNavbarBackground();
    
    // Add smooth transitions to all elements
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: all 0.3s ease;
        }
        
        .hero-content > * {
            opacity: 0;
            transform: translateY(30px);
        }
        
        body.loaded .hero-content > * {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Add focus management for accessibility
navLinks.forEach(link => {
    link.addEventListener('focus', () => {
        link.classList.add('focus-visible');
    });
    
    link.addEventListener('blur', () => {
        link.classList.remove('focus-visible');
    });
});

// Performance optimization: Use requestAnimationFrame for smooth animations
let ticking = false;

function updateAnimations() {
    updateActiveNavLink();
    updateNavbarBackground();
    updateParallax();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateAnimations);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);

// Lightbox: open project images in larger view on click
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxBackdrop = document.querySelector('.lightbox-backdrop');
    const projectImages = document.querySelectorAll('.project-img-clickable');

    function openLightbox(src, alt) {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('is-open');
        lightbox.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('hidden', '');
        document.body.style.overflow = '';
    }

    projectImages.forEach(img => {
        img.addEventListener('click', () => {
            openLightbox(img.src, img.alt || 'Enlarged project image');
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox && lightbox.classList.contains('is-open')) {
            closeLightbox();
        }
    });
});

