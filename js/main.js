/* ========================================
   DAILY JUICE - Main JavaScript
   Interactive Components & Animations
   ======================================== */

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all components
    initMobileMenu();
    initPodcastPlayer();
    initSmoothScroll();
    initScrollAnimations();
    initCounterAnimation();
    initLazyLoading();
    initNavbarScroll();
    
});

/* ========================================
   Mobile Menu Toggle
   ======================================== */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset hamburger icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

/* ========================================
   Podcast Player Tab Switching
   ======================================== */
function initPodcastPlayer() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const playerFrames = document.querySelectorAll('.player-frame');
    
    if (!tabButtons.length || !playerFrames.length) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            
            // Remove active class from all tabs and frames
            tabButtons.forEach(btn => btn.classList.remove('active'));
            playerFrames.forEach(frame => frame.classList.remove('active'));
            
            // Add active class to selected tab
            this.classList.add('active');
            
            // Show corresponding player
            const selectedPlayer = document.getElementById(`${platform}-player`);
            if (selectedPlayer) {
                selectedPlayer.classList.add('active');
                
                // Load embed only when tab is clicked (lazy loading)
                loadPodcastEmbed(platform);
            }
        });
    });
    
    // Load Spotify embed by default after a short delay
    setTimeout(() => {
        loadPodcastEmbed('spotify');
    }, 1000);
}

/* Load Podcast Embeds */
function loadPodcastEmbed(platform) {
    const playerContainer = document.getElementById(`${platform}-player`);
    if (!playerContainer || playerContainer.dataset.loaded === 'true') return;
    
    if (platform === 'spotify') {
        // Replace with your actual Spotify podcast embed URL
        playerContainer.innerHTML = `
            <iframe 
                style="border-radius:12px" 
                src="https://open.spotify.com/embed/show/YOUR_SPOTIFY_SHOW_ID?utm_source=generator&theme=0" 
                width="100%" 
                height="350" 
                frameBorder="0" 
                allowfullscreen="" 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
            </iframe>
        `;
    } else if (platform === 'apple') {
        // Replace with your actual Apple Podcasts embed URL
        playerContainer.innerHTML = `
            <iframe 
                style="width:100%;height:350px;border:none;overflow:hidden;" 
                src="https://podcasts.apple.com/embed/YOUR_PODCAST_ID" 
                loading="lazy"
                frameBorder="0" 
                scrolling="no">
            </iframe>
        `;
    }
    
    playerContainer.dataset.loaded = 'true';
}

/* ========================================
   Smooth Scroll for Anchor Links
   ======================================== */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#" or mobile menu toggle
            if (href === '#' || href.length < 2) return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/* ========================================
   Scroll Animations with Intersection Observer
   ======================================== */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.community-card, .benefit-item, .stat-box, .action-card, .offer-card'
    );
    
    if (!animatedElements.length) return;
    
    // Add fade-in class initially
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/* ========================================
   Subscriber Counter Animation
   ======================================== */
function initCounterAnimation() {
    const counterElements = document.querySelectorAll('.current-count');
    const progressFill = document.getElementById('progress-fill');
    
    if (!counterElements.length) return;
    
    // Current subscriber count (this would come from your backend in production)
    const currentCount = 1247;
    const targetCount = 2000;
    
    // Animate counters
    counterElements.forEach(counter => {
        animateCounter(counter, currentCount, 2000);
    });
    
    // Update progress bar
    if (progressFill) {
        const percentage = (currentCount / targetCount) * 100;
        setTimeout(() => {
            progressFill.style.width = `${percentage}%`;
        }, 500);
    }
}

/* Animate Individual Counter */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

/* ========================================
   Lazy Loading Images
   ======================================== */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if (!lazyImages.length) return;
    
    // Check if browser supports native lazy loading
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        lazyImages.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers without native support
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/* ========================================
   Navbar Scroll Effect
   ======================================== */
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add shadow on scroll
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
        
        // Hide/show navbar on scroll (optional UX enhancement)
        if (currentScroll <= lastScroll || currentScroll < 100) {
            navbar.style.transform = 'translateY(0)';
        } else {
            // navbar.style.transform = 'translateY(-100%)'; // Uncomment to hide on scroll down
        }
        
        lastScroll = currentScroll;
    });
}

/* ========================================
   PayFast Form Enhancement
   ======================================== */
// Add additional functionality to PayFast form if needed
document.addEventListener('DOMContentLoaded', function() {
    const payfastForm = document.querySelector('.payfast-form');
    
    if (payfastForm) {
        payfastForm.addEventListener('submit', function(e) {
            // You can add analytics tracking here
            console.log('Subscription initiated');
            
            // Track conversion event (example: Google Analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'subscription_started', {
                    'event_category': 'conversion',
                    'event_label': 'R20_monthly_subscription',
                    'value': 20.00,
                    'currency': 'ZAR'
                });
            }
        });
    }
});

/* ========================================
   Social Share Tracking
   ======================================== */
document.addEventListener('DOMContentLoaded', function() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const platform = this.classList.contains('whatsapp') ? 'WhatsApp' :
                           this.classList.contains('facebook') ? 'Facebook' : 'Twitter';
            
            console.log(`Shared on ${platform}`);
            
            // Track social shares (example: Google Analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'social_share', {
                    'event_category': 'engagement',
                    'event_label': platform
                });
            }
        });
    });
});

/* ========================================
   Performance Optimization: Debounce Functions
   ======================================== */
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

/* ========================================
   Utility: Add to Home Screen Prompt (Mobile)
   ======================================== */
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // You could show a custom prompt here
    console.log('Install prompt available');
});

/* ========================================
   Error Handling & Analytics
   ======================================== */
window.addEventListener('error', function(e) {
    console.error('Error caught:', e.error);
    
    // Send error to analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'exception', {
            'description': e.error.message,
            'fatal': false
        });
    }
});

/* ========================================
   Page Load Performance Monitoring
   ======================================== */
window.addEventListener('load', function() {
    if ('performance' in window) {
        const timing = performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        
        console.log(`Page load time: ${pageLoadTime}ms`);
        
        // Send to analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                'event_category': 'performance',
                'value': pageLoadTime
            });
        }
    }
});

/* ========================================
   Console Welcome Message
   ======================================== */
console.log('%c🍊 Welcome to Daily Juice!', 'color: #FF6F00; font-size: 24px; font-weight: bold;');
console.log('%cJoin the community at https://dailyjuice.info', 'color: #4CAF50; font-size: 14px;');
