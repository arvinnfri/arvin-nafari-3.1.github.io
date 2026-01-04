// ===== MAIN JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    // 1. هدر اسکرول
    const header = document.querySelector('.header-main');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. منوی موبایل
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMain = document.querySelector('.nav-main');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMain.classList.toggle('active');
            document.body.style.overflow = navMain.classList.contains('active') ? 'hidden' : '';
        });
    }

    // 3. بستن منو با کلیک روی لینک
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMain.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 4. دکمه بازگشت به بالا
    const backToTop = document.createElement('a');
    backToTop.href = '#';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<span class="top-icon">↑</span>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. انیمیشن‌های اسکرول
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // اجرای اولیه

    // 6. فیلتر محصولات
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // حذف کلاس active از همه دکمه‌ها
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // اضافه کردن کلاس active به دکمه کلیک شده
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 7. تب‌های خدمات
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // حذف کلاس active از همه
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // اضافه کردن کلاس active
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // 8. شمارنده‌ها - اصلاح شده
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsContainer = document.querySelector('.hero-stats');
    
    // تابع animateCounter
    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000; // 2 ثانیه
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        // پاک کردن interval قبلی اگر وجود دارد
        if (element.timer) {
            clearInterval(element.timer);
        }
        
        element.timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.getAttribute('data-suffix') || '');
                clearInterval(element.timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };

    // Intersection Observer برای hero-stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statNumbers.forEach(stat => {
                    // تأخیر برای افکت بهتر
                    setTimeout(() => {
                        animateCounter(stat);
                    }, 300);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    // اگر hero-stats وجود داشت، observe کن
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // همچنین شمارنده‌های بخش خدمات
    const servicesStats = document.querySelector('.services-stats');
    if (servicesStats) {
        const serviceStatsNumbers = servicesStats.querySelectorAll('.stats-number');
        
        const serviceStatsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    serviceStatsNumbers.forEach(stat => {
                        setTimeout(() => {
                            animateCounter(stat);
                        }, 500);
                    });
                    serviceStatsObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        serviceStatsObserver.observe(servicesStats);
    }

    // 9. فرم خبرنامه
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            // شبیه‌سازی ارسال
            const submitBtn = this.querySelector('.newsletter-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="loading-spinner"></span> در حال ارسال...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '✓ اشتراک با موفقیت انجام شد!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    this.reset();
                }, 3000);
            }, 1500);
        });
    }

    // 10. Modal محصولات
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
if (quickViewBtns.length > 0) {
    const productModal = document.createElement('div');
    productModal.className = 'product-modal';
    productModal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body"></div>
        </div>
    `;
    
    // فقط اگر Modal وجود ندارد، آن را اضافه کن
    if (!document.querySelector('.product-modal')) {
        document.body.appendChild(productModal);
        
        // رویدادهای بستن Modal
        const modalOverlay = productModal.querySelector('.modal-overlay');
        const modalClose = productModal.querySelector('.modal-close');
        
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // بستن با کلید ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && productModal.classList.contains('active')) {
                productModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // رویدادهای باز کردن Modal
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); // جلوگیری از event bubbling
                
                const productCard = btn.closest('.product-card');
                const productTitle = productCard.querySelector('.product-title').textContent;
                const productImage = productCard.querySelector('.product-img').src;
                const productDescription = productCard.querySelector('.product-description').textContent;
                
                productModal.querySelector('.modal-body').innerHTML = `
                    <div class="modal-product">
                        <img src="${productImage}" alt="${productTitle}" class="modal-product-img">
                        <h3 class="modal-product-title">${productTitle}</h3>
                        <p class="modal-product-description">${productDescription}</p>
                        <a href="#contact" class="btn btn-primary modal-product-btn">
                            <span>درخواست مشاوره</span>
                            <i class="ti ti-arrow-left"></i>
                        </a>
                    </div>
                `;
                
                productModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
    }
}

    // 11. Preloader
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.loading-overlay');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 1000);
        }
    });

    // 12. افکت تایپینگ
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        setTimeout(() => {
            element.style.animation = `typing 3.5s steps(${text.length}, end), blink 0.75s step-end infinite`;
            element.textContent = text;
        }, 500);
    });

    // 13. تاریخ شمسی
    const dateElement = document.querySelector('.current-date');
    if (dateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        dateElement.textContent = now.toLocaleDateString('fa-IR', options);
    }

    // 14. دسترسی‌پذیری - فوکوس قابل مشاهده
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-user');
        }
    });

    document.addEventListener('mousedown', () => {
        document.documentElement.classList.remove('keyboard-user');
    });

    // 15. لودینگ تصاویر با LazyLoad
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// در فایل main.js، بعد از DOMContentLoaded این کد را اضافه کنید:

// لودینگ اسلایدر
const sliderLoading = document.createElement('div');
sliderLoading.className = 'slider-loading';
sliderLoading.innerHTML = '<div class="slider-loader"></div>';

const sliderContainer = document.querySelector('.slider-container');
if (sliderContainer) {
    sliderContainer.appendChild(sliderLoading);
    
    // شبیه‌سازی لودینگ تصاویر
    setTimeout(() => {
        sliderLoading.style.opacity = '0';
        setTimeout(() => {
            sliderLoading.style.display = 'none';
        }, 500);
    }, 1500);
}

// اضافه کردن افکت پارالاکس روی اسلایدها
document.addEventListener('mousemove', (e) => {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const rect = slider.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) - 0.5;
    const y = ((e.clientY - rect.top) / rect.height) - 0.5;
    
    const activeSlide = slider.querySelector('.slide.active .slide-image');
    if (activeSlide) {
        activeSlide.style.transform = `
            scale(1.1) 
            translateX(${x * 20}px) 
            translateY(${y * 20}px)
        `;
    }
});

// بازنشانی موقعیت پارالاکس هنگام تغییر اسلاید
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            const slide = mutation.target;
            if (slide.classList.contains('active')) {
                const image = slide.querySelector('.slide-image');
                if (image) {
                    image.style.transform = 'scale(1.1) translateX(0) translateY(0)';
                }
            }
        }
    });
});

document.querySelectorAll('.slide').forEach(slide => {
    observer.observe(slide, { attributes: true });
});