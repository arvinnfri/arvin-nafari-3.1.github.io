// about.js - اسکریپت‌های صفحه درباره ما
document.addEventListener('DOMContentLoaded', function() {
    // انیمیشن timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
    });
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // انیمیشن feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        
        // افکت پارالاکس روی ماوس
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) - 0.5;
            const y = ((e.clientY - rect.top) / rect.height) - 0.5;
            
            card.style.transform = `
                translateY(-10px) 
                rotateY(${x * 5}deg) 
                rotateX(${y * -5}deg)
            `;
            
            const icon = card.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = `translateY(${y * -10}px)`;
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-10px)';
            const icon = card.querySelector('.feature-icon i');
            if (icon) {
                icon.style.transform = 'translateY(0)';
            }
        });
    });
    
    // شمارنده‌های تیم
const teamStats = document.querySelectorAll('.team-stat .stat-number');

const teamStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            teamStats.forEach((stat, index) => {
                // گرفتن مقدار عددی صحیح
                const currentText = stat.textContent.trim();
                // حذف علامت + و تبدیل به عدد
                const numericValue = currentText.replace(/[^0-9]/g, '');
                const target = parseInt(numericValue);
                
                // بررسی اینکه آیا عدد معتبر است
                if (isNaN(target) || target <= 0) {
                    console.error('مقدار شمارنده معتبر نیست:', currentText);
                    return; // ادامه نده
                }
                
                const duration = 2000;
                const increment = target / (duration / 60);
                let current = 0;
                
                setTimeout(() => {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            // نمایش مقدار نهایی با فرمت صحیح
                            stat.textContent = target.toLocaleString('fa-IR') + '+';
                            clearInterval(timer);
                            
                            // افکت پالس
                            stat.style.animation = 'pulse 0.5s ease';
                            setTimeout(() => {
                                stat.style.animation = '';
                            }, 500);
                        } else {
                            // نمایش اعداد فارسی در حین شمارش
                            stat.textContent = Math.floor(current).toLocaleString('fa-IR');
                        }
                    }, 16);
                }, index * 300);
            });
            
            teamStatsObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px' // کمی زودتر فعال شود
});

const teamSection = document.querySelector('.team-stats');
if (teamSection) {
    teamStatsObserver.observe(teamSection);
}

// همچنین اصلاح شمارنده‌های تصویر overlay
const overlayStats = document.querySelectorAll('.stats-overlay .stat-number');
overlayStats.forEach(stat => {
    const currentText = stat.textContent.trim();
    const numericValue = currentText.replace(/[^0-9]/g, '');
    const target = parseInt(numericValue);
    
    if (!isNaN(target) && target > 0) {
        // فقط نمایش دهد، شمارش نکند
        stat.textContent = target.toLocaleString('fa-IR') + '+';
    }
});
    
    // اسکرول smooth برای لینک‌های داخلی
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // لودینگ lazy برای تصاویر
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // افکت تایپینگ برای عنوان
    const heroTitle = document.querySelector('.about-hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease';
            heroTitle.style.opacity = '1';
        }, 500);
    }
});