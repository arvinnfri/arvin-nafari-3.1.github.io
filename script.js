// Loading Overlay
window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
    }, 1000);
});

// Mobile Menu (Improved)
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

const overlay = document.createElement('div');
overlay.className = 'menu-overlay';
document.body.appendChild(overlay);

function openMenu() {
    navMenu.classList.add('active');
    overlay.classList.add('active');
    mobileMenuBtn.classList.add('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
    document.body.style.overflow = 'hidden';
    document.body.style.paddingLeft = '0';
}

function closeMenu() {
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = 'auto';
    document.body.style.paddingLeft = '';
}

mobileMenuBtn.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            closeMenu();
        }
        
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Close menu on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
    }
});

// FAQ Toggle Function with Animation
function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
        if (otherAnswer !== answer && otherAnswer.classList.contains('open')) {
            otherAnswer.classList.remove('open');
            otherAnswer.previousElementSibling.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    answer.classList.toggle('open');
    
    if (answer.classList.contains('open')) {
        icon.style.transform = 'rotate(180deg)';
        answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
        icon.style.transform = 'rotate(0deg)';
        answer.style.maxHeight = '0';
    }
}

// Enhanced Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Add active class to clicked nav item
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Active Navigation on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const headerHeight = document.querySelector('header').offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - headerHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Banner Slider (Improved)
const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    // Animate slides
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slide.style.opacity = '0';
        slide.style.transform = 'translateX(100%)';
        
        if (i === currentSlide) {
            setTimeout(() => {
                slide.classList.add('active');
                slide.style.opacity = '1';
                slide.style.transform = 'translateX(0)';
            }, 50);
        }
    });
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlider() {
    clearInterval(slideInterval);
}

prevBtn.addEventListener('click', () => {
    prevSlide();
    stopSlider();
    startSlider();
});

nextBtn.addEventListener('click', () => {
    nextSlide();
    stopSlider();
    startSlider();
});

dots.forEach(dot => {
    dot.addEventListener('click', function() {
        const slideIndex = parseInt(this.getAttribute('data-slide'));
        showSlide(slideIndex);
        stopSlider();
        startSlider();
    });
});

// Pause slider on hover
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopSlider);
sliderContainer.addEventListener('mouseleave', startSlider);

// Initialize slider
function initSlider() {
    showSlide(0);
    startSlider();
}

// Video Slider (Enhanced)
const videoSource = document.getElementById('videoSource');
const currentVideoName = document.getElementById('currentVideoName');
const currentVideoDesc = document.getElementById('currentVideoDesc');
const videoDots = document.querySelectorAll('.video-dot');
const prevVideoBtn = document.querySelector('.prev-video-btn');
const nextVideoBtn = document.querySelector('.next-video-btn');
const videoItems = document.querySelectorAll('.video-item');

let currentVideoIndex = 0;
let isVideoChanging = false;

function changeVideo(index) {
    if (isVideoChanging) return;
    
    isVideoChanging = true;
    
    if (index >= videoDots.length) {
        currentVideoIndex = 0;
    } else if (index < 0) {
        currentVideoIndex = videoDots.length - 1;
    } else {
        currentVideoIndex = index;
    }
    
    const selectedDot = videoDots[currentVideoIndex];
    const videoSrc = selectedDot.getAttribute('data-src');
    const videoName = selectedDot.getAttribute('data-name');
    const videoDesc = selectedDot.getAttribute('data-desc');
    
    const videoPlayer = document.querySelector('video');
    const videoContainer = document.querySelector('.video-container');
    const videoPreloader = document.querySelector('.video-preloader');
    
    // Show preloader
    videoPreloader.style.display = 'flex';
    videoPlayer.style.opacity = '0';
    
    // Pause current video
    videoPlayer.pause();
    
    // Update video source
    videoSource.src = videoSrc;
    
    // Update video info with animation
    currentVideoName.style.opacity = '0';
    currentVideoDesc.style.opacity = '0';
    
    setTimeout(() => {
        currentVideoName.textContent = videoName;
        currentVideoDesc.textContent = videoDesc;
        
        currentVideoName.style.opacity = '1';
        currentVideoDesc.style.opacity = '1';
    }, 300);
    
    // Load new video
    videoPlayer.load();
    
    // Update dots
    videoDots.forEach(dot => dot.classList.remove('active'));
    selectedDot.classList.add('active');
    
    // Update video items
    videoItems.forEach(item => item.classList.remove('active'));
    videoItems[0].classList.add('active');
    
    // Add loading animation
    videoContainer.classList.add('loading');
    
    videoPlayer.addEventListener('loadeddata', function() {
        setTimeout(() => {
            videoPreloader.style.display = 'none';
            videoPlayer.style.opacity = '1';
            videoContainer.classList.remove('loading');
            isVideoChanging = false;
        }, 500);
    });
}

function nextVideo() {
    changeVideo(currentVideoIndex + 1);
}

function prevVideo() {
    changeVideo(currentVideoIndex - 1);
}

prevVideoBtn.addEventListener('click', prevVideo);
nextVideoBtn.addEventListener('click', nextVideo);

videoDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        if (!dot.classList.contains('active')) {
            changeVideo(index);
        }
    });
});

// Keyboard navigation for video slider
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextVideo();
    } else if (e.key === 'ArrowLeft') {
        prevVideo();
    }
});

// Video play button functionality
const videoPlayBtn = document.querySelector('.video-play-btn');
const videoPlayer = document.querySelector('video');

if (videoPlayBtn) {
    videoPlayBtn.addEventListener('click', () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
            videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            videoPlayer.pause();
            videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    videoPlayer.addEventListener('play', () => {
        videoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';
        videoPlayBtn.style.opacity = '0';
    });
    
    videoPlayer.addEventListener('pause', () => {
        videoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
        videoPlayBtn.style.opacity = '1';
    });
}

// Scroll Progress Indicator with Enhanced Colors
const scrollProgressBar = document.getElementById('scrollProgressBar');

function updateProgressBarColor() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    
    // Update width
    scrollProgressBar.style.width = `${scrolled}%`;
    
    // Update color based on scroll position
    if (scrolled < 30) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, var(--secondary-color), #ffd166)';
    } else if (scrolled < 70) {
        scrollProgressBar.style.background = 'linear-gradient(90deg, #ffd166, var(--primary-color))';
    } else {
        scrollProgressBar.style.background = 'linear-gradient(90deg, var(--primary-color), var(--accent-color))';
    }
}

// Back to Top Button with Enhanced Animation
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    updateProgressBarColor();
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Accessibility for back to top button
backToTop.setAttribute('role', 'button');
backToTop.setAttribute('aria-label', 'بازگشت به بالای صفحه');

backToTop.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Initialize counters when in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
            });
        }
    });
}, { threshold: 0.5 });

// Observe stats sections
document.querySelectorAll('.stats, .hero-stats, .testimonial-stats').forEach(section => {
    observer.observe(section);
});

// Notification Bubble Interaction
const notificationBubble = document.getElementById('notificationBubble');
if (notificationBubble) {
    notificationBubble.addEventListener('click', () => {
        window.scrollTo({
            top: document.querySelector('#contact').offsetTop - 80,
            behavior: 'smooth'
        });
        
        // Add pulse animation
        notificationBubble.style.animation = 'none';
        setTimeout(() => {
            notificationBubble.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
}

// Form Submission with Animation
const consultationForm = document.getElementById('consultationForm');
if (consultationForm) {
    consultationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            submitBtn.innerHTML = '<i class="fas fa-check"></i> ارسال شد!';
            submitBtn.style.background = 'linear-gradient(135deg, #2ed573, #1dd1a1)';
            
            // Reset form
            setTimeout(() => {
                consultationForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = '';
            }, 2000);
        }, 1500);
    });
}

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize sliders
    initSlider();
    changeVideo(0);
    
    // Initialize particles if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#d4af37" },
                shape: { type: "circle" },
                opacity: { value: 0.3, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#d4af37",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
    
    // Add hover effect to course cards
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
    });
    
    // Add click animation to CTA buttons
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes heartbeat {
            0% { transform: translateY(0) scale(1); }
            25% { transform: translateY(-5px) scale(1.1); }
            50% { transform: translateY(0) scale(1); }
            75% { transform: translateY(-3px) scale(1.05); }
            100% { transform: translateY(0) scale(1); }
        }
        
        .back-to-top:hover {
            animation: heartbeat 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

// Initialize AOS (Animate on Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        disable: window.innerWidth < 768
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add loaded class to images when they load
document.querySelectorAll('img').forEach(img => {
    if (img.complete) {
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    }
});