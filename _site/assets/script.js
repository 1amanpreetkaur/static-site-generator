// Custom JavaScript for DigitalBoost

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initScrollAnimations();
    
    // Initialize contact form
    initContactForm();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize counter animations
    initCounterAnimations();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize all filters
    initPortfolioFilter();
    initBlogFilter();
    initServiceFilter();
    
    // Initialize form validation
    initFormValidation();
    
    // Initialize modals and interactive elements
    initInteractiveElements();
    
    // Initialize mobile menu
    initMobileMenu();
});

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.service-card, .portfolio-card, .blog-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                // Show success message
                const alertDiv = document.createElement('div');
                alertDiv.className = 'alert alert-success mt-3';
                alertDiv.innerHTML = '<i class="bi bi-check-circle me-2"></i>Thank you! Your message has been sent successfully.';
                contactForm.appendChild(alertDiv);
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    alertDiv.remove();
                }, 5000);
            }, 2000);
        });
    }
}

// Newsletter form handling
function initNewsletterForm() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput.value) {
                showNotification('Please enter a valid email address.', 'warning');
                return;
            }
            
            // Show loading state
            submitBtn.innerHTML = '<span class="loading"></span>';
            submitBtn.disabled = true;
            
            // Simulate subscription
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    });
}

// Counter animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
    }, 16);
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = 'top: 100px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${getIconForType(type)} me-2"></i>
            ${message}
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getIconForType(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'warning': return 'exclamation-triangle';
        case 'danger': return 'x-circle';
        default: return 'info-circle';
    }
}

// Portfolio filter functionality
function initPortfolioFilter() {
    const filterButtons = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            portfolioItems.forEach(item => {
                const categories = item.dataset.category.split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('fade-in'), 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
}

// Blog filter functionality
function initBlogFilter() {
    const filterButtons = document.querySelectorAll('.blog-filter');
    const blogItems = document.querySelectorAll('.blog-post');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            blogItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('fade-in'), 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        });
    });
}

// Initialize filters if they exist
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.portfolio-filter')) {
        initPortfolioFilter();
    }
    if (document.querySelector('.blog-filter')) {
        initBlogFilter();
    }
});

// Service filter functionality
function initServiceFilter() {
    const serviceCards = document.querySelectorAll('.service-card');
    const searchInput = document.querySelector('#serviceSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            serviceCards.forEach(card => {
                const title = card.querySelector('.card-title').textContent.toLowerCase();
                const text = card.querySelector('.card-text').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || text.includes(searchTerm)) {
                    card.parentElement.style.display = 'block';
                } else {
                    card.parentElement.style.display = 'none';
                }
            });
        });
    }
}

// Form validation enhancement
function initFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                
                // Focus on first invalid field
                const firstInvalid = form.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.focus();
                }
            }
            
            form.classList.add('was-validated');
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.checkValidity()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    });
}

// Interactive elements
function initInteractiveElements() {
    // FAQ accordion functionality
    const faqButtons = document.querySelectorAll('.accordion-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target) {
                target.classList.toggle('show');
            }
        });
    });
    
    // Testimonial carousel (if present)
    initTestimonialCarousel();
    
    // Back to top button
    initBackToTop();
    
    // Loading states for buttons
    initButtonLoadingStates();
    
    // Image lazy loading
    initLazyLoading();
}

// Mobile menu enhancements
function initMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close mobile menu when clicking on a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar') && navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    }
}

// Testimonial carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Auto-rotate testimonials
        if (testimonials.length > 1) {
            setInterval(nextTestimonial, 5000);
        }
        
        showTestimonial(0);
    }
}

// Back to top button
function initBackToTop() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="bi bi-arrow-up"></i>';
    backToTop.className = 'btn btn-primary position-fixed';
    backToTop.style.cssText = 'bottom: 30px; right: 30px; z-index: 1000; border-radius: 50%; width: 50px; height: 50px; display: none;';
    backToTop.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Button loading states
function initButtonLoadingStates() {
    const buttons = document.querySelectorAll('[data-loading-text]');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const loadingText = this.getAttribute('data-loading-text');
            const originalText = this.innerHTML;
            
            this.innerHTML = loadingText;
            this.disabled = true;
            
            // Reset after 3 seconds (or handle with actual async operation)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        });
    });
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Enhanced search functionality
function initSearchFeatures() {
    const searchInputs = document.querySelectorAll('[data-search-target]');
    
    searchInputs.forEach(input => {
        const targetSelector = input.getAttribute('data-search-target');
        const targets = document.querySelectorAll(targetSelector);
        
        input.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            targets.forEach(target => {
                const searchableText = target.textContent.toLowerCase();
                const parent = target.closest('.col-md-6, .col-lg-4, .col-12') || target;
                
                if (searchableText.includes(searchTerm) || searchTerm === '') {
                    parent.style.display = 'block';
                    target.classList.add('fade-in');
                } else {
                    parent.style.display = 'none';
                    target.classList.remove('fade-in');
                }
            });
        });
    });
}

// Cookie consent (if needed)
function initCookieConsent() {
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    if (!cookieConsent) {
        const consentBanner = document.createElement('div');
        consentBanner.className = 'alert alert-info position-fixed w-100';
        consentBanner.style.cssText = 'bottom: 0; left: 0; z-index: 9999; margin: 0; border-radius: 0;';
        consentBanner.innerHTML = `
            <div class="container d-flex justify-content-between align-items-center">
                <span>We use cookies to improve your experience. By continuing to use our site, you agree to our cookie policy.</span>
                <button class="btn btn-primary btn-sm" onclick="acceptCookies()">Accept</button>
            </div>
        `;
        
        document.body.appendChild(consentBanner);
    }
}

function acceptCookies() {
    localStorage.setItem('cookieConsent', 'true');
    document.querySelector('.alert.position-fixed').remove();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initSearchFeatures();
    initCookieConsent();
});
