// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Load EmailJS configuration and initialize
let emailConfig = null;

// Function to load config and initialize EmailJS
function initializeEmailJS() {
    // For Vercel deployment, we need to access environment variables differently
    // Since this is a static site, we'll use a global variable approach
    emailConfig = {
        publicKey: window.EMAILJS_PUBLIC_KEY || 'YOUR_ACTUAL_PUBLIC_KEY',
        serviceId: window.EMAILJS_SERVICE_ID || 'YOUR_ACTUAL_SERVICE_ID',
        templateId: window.EMAILJS_TEMPLATE_ID || 'YOUR_ACTUAL_TEMPLATE_ID'
    };
    
    // Initialize EmailJS if config is available
    if (emailConfig && emailConfig.publicKey && emailConfig.publicKey !== 'YOUR_ACTUAL_PUBLIC_KEY') {
        emailjs.init(emailConfig.publicKey);
        console.log('EmailJS initialized successfully');
    } else {
        console.warn('EmailJS not configured properly - please check your environment variables');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeEmailJS);

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const business = formData.get('business');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !business || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Prepare email template parameters
        const templateParams = {
            from_name: name,
            from_email: email,
            business_name: business,
            message: message,
            to_name: 'SwiftStack Web'
        };
        
        // Check if EmailJS is properly configured
        if (!emailConfig || !emailConfig.serviceId || !emailConfig.templateId) {
            alert('Contact form is not properly configured. Please email us directly at hello@swiftstackweb.com');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            return;
        }
        
        // Send email using EmailJS
        emailjs.send(
            emailConfig.serviceId, 
            emailConfig.templateId, 
            templateParams
        )
            .then(function(response) {
                alert('Thank you for your message! We\'ll get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, function(error) {
                alert('Sorry, there was an error sending your message. Please try again or email us directly at hello@swiftstackweb.com');
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
    });
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .step, .benefit');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Lightning network animation
const lightningNodes = document.querySelectorAll('.node');
lightningNodes.forEach((node, index) => {
    node.style.animationDelay = `${index * 0.5}s`;
});

// Add some interactive hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Bitcoin price ticker simulation (for demo purposes)
function updateBitcoinPrice() {
    const priceElement = document.querySelector('.bitcoin-price');
    if (priceElement) {
        const basePrice = 45000;
        const variation = (Math.random() - 0.5) * 1000;
        const newPrice = basePrice + variation;
        priceElement.textContent = `$${newPrice.toLocaleString()}`;
    }
}

// Update price every 30 seconds if element exists
if (document.querySelector('.bitcoin-price')) {
    setInterval(updateBitcoinPrice, 30000);
    updateBitcoinPrice(); // Initial call
}

// Add typing effect to hero title
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize scroll progress
createScrollProgress(); 