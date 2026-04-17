// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    if (window.innerWidth > 768) return;
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navLinks.style.display = 'none';
        }
    });
});

// Smooth Scrolling (already handled by CSS scroll-behavior, but enhanced here)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send this to a backend service
        // For now, we'll show a success message
        const formData = {
            name: name,
            email: email,
            message: message,
            timestamp: new Date().toISOString()
        };
        
        console.log('Form submitted:', formData);
        
        // Show success message
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--success)';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
        }, 3000);
    });
}

// Scroll animations - reveal elements as they come into view
const revealElements = () => {
    const elements = document.querySelectorAll('.skill-category, .cert-card, .project-card, .blog-card, .timeline-item');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight * 0.85) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

// Initial styles for reveal animation
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.skill-category, .cert-card, .project-card, .blog-card, .timeline-item');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    revealElements();
});

window.addEventListener('scroll', revealElements);

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.borderBottom = '1px solid rgba(0, 217, 255, 0.3)';
    } else {
        navbar.style.borderBottom = '1px solid rgba(0, 217, 255, 0.1)';
    }
});

// Active link highlighting in navbar
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.style.color = '';
        if (item.getAttribute('href').slice(1) === current) {
            item.style.color = 'var(--accent)';
            item.style.textShadow = '0 0 10px rgba(0, 217, 255, 0.5)';
        }
    });
});

// Typed effect for hero title (optional enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    type();
};

// Uncomment below if you want typewriter effect on hero title
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-content h1');
//     const originalText = heroTitle.textContent;
//     heroTitle.textContent = '';
//     typeWriter(heroTitle, originalText, 50);
// });

// Copy to clipboard functionality for contact links
document.querySelectorAll('.contact-method a').forEach(link => {
    if (link.href.includes(('@'))) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const email = link.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const originalText = link.textContent;
                link.textContent = 'Copied!';
                setTimeout(() => {
                    link.textContent = originalText;
                }, 2000);
            });
        });
    }
});

// Responsive mobile menu styling
const updateMobileMenu = () => {
    if (window.innerWidth <= 768) {
        navLinks.style.display = 'none';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.backgroundColor = 'var(--dark-bg)';
        navLinks.style.borderBottom = '1px solid rgba(0, 217, 255, 0.2)';
        navLinks.style.padding = '1rem 0';
        navLinks.style.gap = '0';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'row';
        navLinks.style.position = 'static';
        navLinks.style.backgroundColor = '';
        navLinks.style.borderBottom = '';
        navLinks.style.padding = '';
    }
};

window.addEventListener('resize', updateMobileMenu);
window.addEventListener('load', updateMobileMenu);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Log page load time (optional)
window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log('Page loaded in ' + pageLoadTime + 'ms');
});

// Prevent right-click context menu (optional security measure)
// Uncomment if you want this
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
//     return false;
// });

// Detect dark mode preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.body.classList.add('dark-mode');
}

console.log('Cybersecurity Portfolio loaded successfully!');
