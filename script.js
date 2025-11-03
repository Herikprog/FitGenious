// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', currentTheme);

function updateTogglePosition() {
    const thumb = document.querySelector('.toggle-thumb');
    if (!thumb) return;
    thumb.style.transform = body.getAttribute('data-theme') === 'light' ? 'translateX(28px)' : 'translateX(2px)';
}
updateTogglePosition();

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateTogglePosition();
    });
}

// ========== SCROLL ANIMATIONS ==========
const fadeElements = document.querySelectorAll('.fade-in');
const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, observerOptions);
fadeElements.forEach(el => observer.observe(el));

// ========== ANIMATED COUNTERS ==========
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString() + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString() + '+';
        }
    }
    updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const views = document.getElementById('viewsCounter');
            const followers = document.getElementById('followersCounter');
            if (views) animateCounter(views, 150, 2000);
            if (followers) animateCounter(followers, 200, 2000);

            document.querySelectorAll('.metric-progress').forEach(bar => {
                const value = bar.getAttribute('data-value');
                setTimeout(() => { bar.style.width = value + '%'; }, 500);
            });
            counterObserver.unobserve(entry.target);
        }
    });
});
const resultsSection = document.querySelector('.results');
if (resultsSection) counterObserver.observe(resultsSection);

// ========== FAQ ACCORDION ==========
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
        faqItems.forEach(other => { if (other !== item) other.classList.remove('active'); });
        item.classList.toggle('active');
    });
});

// ========== STICKY HEADER & CTA ==========
const header = document.getElementById('header');
const stickyCta = document.getElementById('stickyCta');
window.addEventListener('scroll', () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 100);
    if (stickyCta) stickyCta.classList.toggle('visible', window.scrollY > 500);
});

// ========== MAGNETIC BUTTONS ==========
document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('mousemove', e => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) / centerX * 10;
        const deltaY = (y - centerY) / centerY * 10;
        button.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    });
    button.addEventListener('mouseleave', () => { button.style.transform = 'translate(0,0)'; });
});

// =======================
// Array de vídeos do Google Drive
// =======================
const videoProjects = [
    { 
        title: "", 
        video: "https://drive.google.com/file/d/1DN0UDSX_0MmgApvPXqztfD4GauZS9efc/preview",
        description: ""
    },
    { 
        title: "", 
        video: "https://drive.google.com/file/d/1QkHksdwELBSjpKtYGggu3Pa9HPuQlXhH/preview",
        description: ""
    },
    { 
        title: "", 
        video: "https://drive.google.com/file/d/1VFbB8V-PuUtluFkEd6tqRmquk5SOdkT4/preview",
        description: ""
    },
    { 
        title: "", 
        video: "https://drive.google.com/file/d/1YUfpERmbtPE-WFO6Zs5T5LJgE2NxuxyQ/preview",
        description: ""
    },
    { 
        title: "", 
        video: "https://drive.google.com/file/d/1XC1CVlc5fhhA7ir6RWdOZbf7R-RDROEn/preview",
        description: ""
    },
    { 
        title: "", 
        video: "https://drive.google.com/file/d/10T67anXBZd1aiWr0G6_tdLghZqz_348u/preview",
        description: ""
    }
];

// =======================
// Variáveis do carrossel de vídeos
// =======================
let currentVideoSlide = 0;
let totalVideoSlides = videoProjects.length;
let videoAutoSlideInterval = null;
let videoElements = [];
let isUserInteracting = false;

// =======================
// Inicialização do carrossel de vídeos
// =======================
function initVideoCarousel() {
    renderVideoSlides();
    setupVideoControls();
    updateVideoCarousel();
    updateVideoIndicators();
    updateVideoControlButtons();
    startVideoAutoSlide();
    initVideoAutoSlidePause();
    optimizeVideoCarouselPerformance();

    window.addEventListener('resize', updateVideoCarouselSize);
    document.addEventListener('visibilitychange', () => {
        document.hidden ? stopVideoAutoSlide() : resetVideoAutoSlide();
    });
}

// =======================
// Renderiza slides de vídeo - GOOGLE DRIVE
// =======================
function renderVideoSlides() {
    const carousel = document.getElementById('carouselTrack');
    const indicatorsContainer = document.getElementById('carouselDots');
    if (!carousel || !indicatorsContainer) return;

    carousel.innerHTML = '';
    indicatorsContainer.innerHTML = '';
    videoElements = [];

    videoProjects.forEach((project, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.position = 'relative';

        // Container do vídeo
        const videoContainer = document.createElement('div');
        videoContainer.className = 'video-wrapper';

        // Elemento iframe do Google Drive
        const video = document.createElement('iframe');
        video.src = project.video;
        video.allow = "autoplay; encrypted-media; fullscreen";
        video.allowFullscreen = true;
        video.className = 'carousel-video';
        video.frameBorder = '0';
        
        // Permissões para o iframe
        video.setAttribute('allow', 'autoplay; encrypted-media');
        video.setAttribute('webkitallowfullscreen', 'true');
        video.setAttribute('mozallowfullscreen', 'true');
        video.setAttribute('allowfullscreen', 'true');

        video.onerror = () => { 
            console.error(`Erro ao carregar vídeo do Google Drive: ${project.video}`);
            // Fallback para erro
            videoContainer.innerHTML = `
                <div class="video-error">
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #000; color: white; border-radius: 24px; padding: 20px; text-align: center;">
                        <p style="margin-bottom: 10px; font-size: 1.1rem;">Vídeo não disponível</p>
                        <small style="opacity: 0.8;">Verifique o link do Google Drive</small>
                    </div>
                </div>
            `;
        };

        videoContainer.appendChild(video);
        slide.appendChild(videoContainer);

        // Conteúdo descritivo
        const content = document.createElement('div');
        content.className = 'carousel-content';
        
        const title = document.createElement('h4');
        title.textContent = project.title;
        title.style.margin = '0 0 8px 0';
        title.style.color = 'var(--text-color)';
        
        const description = document.createElement('p');
        description.textContent = project.description;
        description.style.margin = '0';
        description.style.color = 'var(--text-secondary)';
        description.style.fontSize = '0.9rem';

        content.appendChild(title);
        content.appendChild(description);
        slide.appendChild(content);

        carousel.appendChild(slide);
        videoElements.push(video);

        // Indicador
        const indicator = document.createElement('button');
        indicator.className = 'carousel-dot';
        indicator.addEventListener('click', () => { 
            isUserInteracting = true;
            goToVideoSlide(index); 
            resetVideoAutoSlide();
            setTimeout(() => { isUserInteracting = false; }, 3000);
        });
        indicatorsContainer.appendChild(indicator);
    });
}

// =======================
// Controles do carrossel de vídeo
// =======================
function setupVideoControls() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { 
            isUserInteracting = true;
            previousVideoSlide(); 
            resetVideoAutoSlide();
            setTimeout(() => { isUserInteracting = false; }, 3000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { 
            isUserInteracting = true;
            nextVideoSlide(); 
            resetVideoAutoSlide();
            setTimeout(() => { isUserInteracting = false; }, 3000);
        });
    }

    const carousel = document.getElementById('carouselTrack');
    if (!carousel) return;

    let startX = 0;
    let isDragging = false;

    // Touch events
    carousel.addEventListener('touchstart', e => { 
        startX = e.touches[0].clientX; 
        isDragging = true;
        isUserInteracting = true;
        stopVideoAutoSlide();
    }, { passive: true });
    
    carousel.addEventListener('touchmove', e => { 
        if (isDragging && Math.abs(e.touches[0].clientX - startX) > 10) {
            e.preventDefault(); 
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', e => {
        handleVideoSwipe(e.changedTouches[0].clientX);
        setTimeout(() => { isUserInteracting = false; }, 3000);
    });

    // Mouse events
    carousel.addEventListener('mousedown', e => { 
        startX = e.clientX; 
        isDragging = true;
        isUserInteracting = true;
        stopVideoAutoSlide();
    });
    
    carousel.addEventListener('mousemove', e => { 
        if (isDragging) e.preventDefault(); 
    });
    
    carousel.addEventListener('mouseup', e => {
        handleVideoSwipe(e.clientX);
        setTimeout(() => { isUserInteracting = false; }, 3000);
    });
    
    carousel.addEventListener('mouseleave', () => { 
        isDragging = false; 
    });

    function handleVideoSwipe(endX) {
        if (!isDragging) return;
        isDragging = false;
        const diffX = startX - endX;
        if (Math.abs(diffX) > 50) {
            diffX > 0 ? nextVideoSlide() : previousVideoSlide();
            resetVideoAutoSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        const carouselElement = document.querySelector('.video-carousel');
        if (!isElementInViewport(carouselElement)) return;
        
        if (e.key === 'ArrowLeft') { 
            isUserInteracting = true;
            previousVideoSlide(); 
            resetVideoAutoSlide();
            setTimeout(() => { isUserInteracting = false; }, 3000);
        }
        if (e.key === 'ArrowRight') { 
            isUserInteracting = true;
            nextVideoSlide(); 
            resetVideoAutoSlide();
            setTimeout(() => { isUserInteracting = false; }, 3000);
        }
    });
}

// =======================
// Navegação do carrossel de vídeo
// =======================
function goToVideoSlide(index) { 
    currentVideoSlide = index; 
    updateVideoCarousel(); 
    updateVideoIndicators(); 
    updateVideoControlButtons(); 
}

function nextVideoSlide() { 
    currentVideoSlide = (currentVideoSlide + 1) % totalVideoSlides; 
    updateVideoCarousel(); 
    updateVideoIndicators(); 
    updateVideoControlButtons(); 
}

function previousVideoSlide() { 
    currentVideoSlide = (currentVideoSlide - 1 + totalVideoSlides) % totalVideoSlides; 
    updateVideoCarousel(); 
    updateVideoIndicators(); 
    updateVideoControlButtons(); 
}

// =======================
// Atualização visual do carrossel de vídeo
// =======================
function updateVideoCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    const slideWidth = 100;
    const translateX = -currentVideoSlide * slideWidth;
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${translateX}%)`;
        slide.style.transition = 'transform 0.6s ease-in-out';
        slide.style.opacity = '1';
    });
}

function updateVideoIndicators() {
    document.querySelectorAll('.carousel-dot').forEach((ind, i) => {
        ind.classList.toggle('active', i === currentVideoSlide);
    });
}

function updateVideoControlButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (totalVideoSlides <= 1) { 
        if (prevBtn) prevBtn.style.display = 'none'; 
        if (nextBtn) nextBtn.style.display = 'none'; 
        return; 
    }
    
    if (prevBtn) { 
        prevBtn.style.display = 'block'; 
        prevBtn.disabled = currentVideoSlide === 0;
    }
    
    if (nextBtn) { 
        nextBtn.style.display = 'block'; 
        nextBtn.disabled = currentVideoSlide === totalVideoSlides - 1;
    }
}

// =======================
// Auto-slide para vídeos
// =======================
function startVideoAutoSlide() { 
    if (totalVideoSlides <= 1 || isUserInteracting) return;
    stopVideoAutoSlide();
    videoAutoSlideInterval = setInterval(() => {
        if (!isUserInteracting) {
            nextVideoSlide();
        }
    }, 6000);
}

function stopVideoAutoSlide() { 
    if (videoAutoSlideInterval) { 
        clearInterval(videoAutoSlideInterval); 
        videoAutoSlideInterval = null; 
    } 
}

function resetVideoAutoSlide() { 
    stopVideoAutoSlide(); 
    if (!isUserInteracting) {
        setTimeout(() => {
            startVideoAutoSlide();
        }, 1000);
    }
}

function initVideoAutoSlidePause() {
    const container = document.querySelector('.video-carousel');
    if (!container) return;
    
    container.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        stopVideoAutoSlide();
    });
    
    container.addEventListener('mouseleave', () => {
        isUserInteracting = false;
        startVideoAutoSlide();
    });
}

// =======================
// IMAGE CAROUSEL FOR RESULTS SECTION
// =======================
const imageProjects = [
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1dVURcBp2eHaJXAUqDxU069o_w-eemMBS&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=15aHIEjk9xCkbEOyubccBr6LHFz8daIzS&sz=w1000", 
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1cVidd5E2YtF6EM1h8WowJbJukpzpbneR&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1ticYkC4LMHyDIlc7Q2pY7sWM41RrHRgb&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1d6r90Ib_tATdNxx3TMZDu9-7orKibO0Z&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1hGqODW9B8C3mO9LIRm5WS6qnjtz33U0A&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=19XxnWhHzb-_GMrn1tgSRgs5zqx41uVHX&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1C6Vn8JnjHRiQG-lLY5MFoeSVYbkKpbUv&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1AN7yuK5k-m5Nm7AR_oDAsOzFg6edH1Jw&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=18ec-EPXghliK9rPIlBiC1Ch6HsOCY3dV&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1Yutz1YiJIdfACQXh0fNO39AssthK2eFd&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1BWk3dnWJdPnqCmt5uLCuW9rm0Om119AM&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1XO0LNtT0OANPqx2ONBlRA_MAKKkhdgtk&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1hG_q0NKzWATQSGWx8waUkl_fyZhoNwI3&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1EILe8qYSzf1X5hgITnxNgS1ESYi1_4tX&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1EK4N2NAo8dBZuq__2axnE6uhsqsXDPe-&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=14yCEQ4pGPPtbjklVUJKUuwJUomic_1rY&sz=w1000",
        description: ""
    },
    { 
        title: "", 
        image: "https://drive.google.com/thumbnail?id=1-lYzH8zwcmeRwzyItvLrWHg3bp9wX8Jq&sz=w1000",
        description: ""
    }
];

let currentImageSlide = 0;
let totalImageSlides = imageProjects.length;
let imageAutoSlideInterval = null;
let isImageUserInteracting = false;

// Initialize Image Carousel
function initImageCarousel() {
    renderImageSlides();
    setupImageControls();
    updateImageCarousel();
    updateImageIndicators();
    updateImageControlButtons();
    startImageAutoSlide();
    initImageAutoSlidePause();
}

// Render Image Slides
function renderImageSlides() {
    const carousel = document.getElementById('imageCarouselTrack');
    const indicatorsContainer = document.getElementById('imageCarouselDots');
    if (!carousel || !indicatorsContainer) return;

    carousel.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    imageProjects.forEach((project, index) => {
        // Slide
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.style.position = 'relative';

        // Image Container
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-wrapper';

        // Loading State
        const loading = document.createElement('div');
        loading.className = 'image-loading';
        imageContainer.appendChild(loading);

        // Image Element
        const img = document.createElement('img');
        img.src = project.image;
        img.alt = project.title;
        img.className = 'carousel-image';
        img.onload = () => loading.remove();
        img.onerror = () => {
            loading.remove();
            imageContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #000; color: white; border-radius: 24px; padding: 20px; text-align: center;">
                    <p style="margin-bottom: 10px; font-size: 1.1rem;">Image not available</p>
                    <small style="opacity: 0.8;">Check Google Drive link</small>
                </div>
            `;
        };

        imageContainer.appendChild(img);
        slide.appendChild(imageContainer);

        // Content
        const content = document.createElement('div');
        content.className = 'carousel-content';
        
        const title = document.createElement('h4');
        title.textContent = project.title;
        
        const description = document.createElement('p');
        description.textContent = project.description;

        content.appendChild(title);
        content.appendChild(description);
        slide.appendChild(content);

        carousel.appendChild(slide);

        // Indicator
        const indicator = document.createElement('button');
        indicator.className = 'carousel-dot';
        indicator.addEventListener('click', () => { 
            isImageUserInteracting = true;
            goToImageSlide(index); 
            resetImageAutoSlide();
            setTimeout(() => { isImageUserInteracting = false; }, 3000);
        });
        indicatorsContainer.appendChild(indicator);
    });
}

// Setup Image Controls
function setupImageControls() {
    const prevBtn = document.getElementById('imagePrevBtn');
    const nextBtn = document.getElementById('imageNextBtn');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { 
            isImageUserInteracting = true;
            previousImageSlide(); 
            resetImageAutoSlide();
            setTimeout(() => { isImageUserInteracting = false; }, 3000);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { 
            isImageUserInteracting = true;
            nextImageSlide(); 
            resetImageAutoSlide();
            setTimeout(() => { isImageUserInteracting = false; }, 3000);
        });
    }

    const carousel = document.getElementById('imageCarouselTrack');
    if (!carousel) return;

    let startX = 0;
    let isDragging = false;

    // Touch events
    carousel.addEventListener('touchstart', e => { 
        startX = e.touches[0].clientX; 
        isDragging = true;
        isImageUserInteracting = true;
        stopImageAutoSlide();
    }, { passive: true });
    
    carousel.addEventListener('touchmove', e => { 
        if (isDragging && Math.abs(e.touches[0].clientX - startX) > 10) {
            e.preventDefault(); 
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', e => {
        handleImageSwipe(e.changedTouches[0].clientX);
        setTimeout(() => { isImageUserInteracting = false; }, 3000);
    });

    // Mouse events
    carousel.addEventListener('mousedown', e => { 
        startX = e.clientX; 
        isDragging = true;
        isImageUserInteracting = true;
        stopImageAutoSlide();
    });
    
    carousel.addEventListener('mousemove', e => { 
        if (isDragging) e.preventDefault(); 
    });
    
    carousel.addEventListener('mouseup', e => {
        handleImageSwipe(e.clientX);
        setTimeout(() => { isImageUserInteracting = false; }, 3000);
    });
    
    carousel.addEventListener('mouseleave', () => { 
        isDragging = false; 
    });

    function handleImageSwipe(endX) {
        if (!isDragging) return;
        isDragging = false;
        const diffX = startX - endX;
        if (Math.abs(diffX) > 50) {
            diffX > 0 ? nextImageSlide() : previousImageSlide();
            resetImageAutoSlide();
        }
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        const carouselElement = document.querySelector('.results-image .image-carousel');
        if (!isElementInViewport(carouselElement)) return;
        
        if (e.key === 'ArrowLeft') { 
            isImageUserInteracting = true;
            previousImageSlide(); 
            resetImageAutoSlide();
            setTimeout(() => { isImageUserInteracting = false; }, 3000);
        }
        if (e.key === 'ArrowRight') { 
            isImageUserInteracting = true;
            nextImageSlide(); 
            resetImageAutoSlide();
            setTimeout(() => { isImageUserInteracting = false; }, 3000);
        }
    });
}

// Image Carousel Navigation
function goToImageSlide(index) { 
    currentImageSlide = index; 
    updateImageCarousel(); 
    updateImageIndicators(); 
    updateImageControlButtons(); 
}

function nextImageSlide() { 
    if (currentImageSlide < totalImageSlides - 1) {
        currentImageSlide = currentImageSlide + 1; // Avança normalmente
    } else {
        currentImageSlide = 0; // Volta para o primeiro slide quando chega no último
    }
    updateImageCarousel(); 
    updateImageIndicators(); 
    updateImageControlButtons(); 
}

function previousImageSlide() { 
    currentImageSlide = (currentImageSlide - 1 + totalImageSlides) % totalImageSlides; 
    updateImageCarousel(); 
    updateImageIndicators(); 
    updateImageControlButtons(); 
}

// Update Image Carousel Visuals
function updateImageCarousel() {
    const slides = document.querySelectorAll('#imageCarouselTrack .carousel-slide');
    if (slides.length === 0) return;

    const slideWidth = 100;
    const translateX = -currentImageSlide * slideWidth;
    
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${translateX}%)`;
        slide.style.transition = 'transform 0.6s ease-in-out';
        slide.style.opacity = '1';
    });
}

function updateImageIndicators() {
    document.querySelectorAll('#imageCarouselDots .carousel-dot').forEach((ind, i) => {
        ind.classList.toggle('active', i === currentImageSlide);
    });
}

function updateImageControlButtons() {
    const prevBtn = document.getElementById('imagePrevBtn');
    const nextBtn = document.getElementById('imageNextBtn');
    
    if (totalImageSlides <= 1) { 
        if (prevBtn) prevBtn.style.display = 'none'; 
        if (nextBtn) nextBtn.style.display = 'none'; 
        return; 
    }
    
    if (prevBtn) { 
        prevBtn.style.display = 'block'; 
        prevBtn.disabled = currentImageSlide === 0;
    }
    
    if (nextBtn) { 
        nextBtn.style.display = 'block'; 
        nextBtn.disabled = currentImageSlide === totalImageSlides - 1;
    }
}

// Image Auto-slide
function startImageAutoSlide() { 
    if (totalImageSlides <= 1 || isImageUserInteracting) return;
    stopImageAutoSlide();
    imageAutoSlideInterval = setInterval(() => {
        if (!isImageUserInteracting) {
            nextImageSlide();
        }
    }, 5000);
}

function stopImageAutoSlide() { 
    if (imageAutoSlideInterval) { 
        clearInterval(imageAutoSlideInterval); 
        imageAutoSlideInterval = null; 
    } 
}

function resetImageAutoSlide() { 
    stopImageAutoSlide(); 
    if (!isImageUserInteracting) {
        setTimeout(() => {
            startImageAutoSlide();
        }, 1000);
    }
}

function initImageAutoSlidePause() {
    const container = document.querySelector('.results-image .image-carousel');
    if (!container) return;
    
    container.addEventListener('mouseenter', () => {
        isImageUserInteracting = true;
        stopImageAutoSlide();
    });
    
    container.addEventListener('mouseleave', () => {
        isImageUserInteracting = false;
        startImageAutoSlide();
    });
}

// =======================
// Utilities
// =======================
function isElementInViewport(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// =======================
// Resize
// =======================
function updateVideoCarouselSize() { 
    updateVideoCarousel(); 
}

// =======================
// Performance
// =======================
function optimizeVideoCarouselPerformance() {
    document.querySelectorAll('.carousel-slide').forEach(slide => {
        slide.style.willChange = 'transform';
        slide.style.backfaceVisibility = 'hidden';
    });
}

// ========== GEMINI AI CHAT INTEGRATION ==========
const chatButton = document.getElementById('chatButton');
const chatContainer = document.getElementById('chatContainer');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');

// Open/close chat
chatButton?.addEventListener('click', () => {
    chatContainer?.classList.add('open');
    setTimeout(() => chatInput?.focus(), 300);
});
closeChat?.addEventListener('click', () => chatContainer?.classList.remove('open'));

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', isUser ? 'user' : 'bot');
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = text;
    messageDiv.appendChild(messageContent);
    
    const messageTime = document.createElement('div');
    messageTime.classList.add('message-time');
    messageTime.textContent = 'Agora';
    messageDiv.appendChild(messageTime);
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot', 'typing-indicator');
    typingDiv.id = 'typing-indicator';
    const dots = document.createElement('div');
    dots.classList.add('message-content');
    dots.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
    typingDiv.appendChild(dots);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    typingIndicator?.remove();
}

// Call backend Gemini API
async function getGeminiResponse(userMessage) {
    try {
        const res = await fetch('/api/genius', {  // ← CHAMA /api/genius
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });
        const data = await res.json();
        return data.text;
    } catch (err) {
        return 'Desculpe, ocorreu um erro. Tente novamente.';
    }
}

// Handle user message
async function handleUserMessage() {
    const message = chatInput.value.trim();
    if (!message) return;
    addMessage(message, true);
    chatInput.value = '';
    showTypingIndicator();
    const response = await getGeminiResponse(message);
    removeTypingIndicator();
    addMessage(response, false);
}

// Event listeners
sendMessage?.addEventListener('click', handleUserMessage);
chatInput?.addEventListener('keypress', e => { if (e.key === 'Enter') handleUserMessage(); });
chatContainer?.addEventListener('click', () => chatInput?.focus());

// ========== VIDEO PLAYER ==========
const videoPlayer = document.querySelector('.custom-video-player');
if (videoPlayer) {
    videoPlayer.addEventListener('click', () => videoPlayer.paused ? videoPlayer.play() : videoPlayer.pause());
    videoPlayer.addEventListener('play', () => videoPlayer.setAttribute('data-playing', 'true'));
    videoPlayer.addEventListener('pause', () => videoPlayer.setAttribute('data-playing', 'false'));
}

// ========== INITIAL LOAD ANIMATIONS ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🟢 FitGenious JavaScript inicializado');
    setTimeout(() => document.querySelector('.hero-content')?.classList.add('visible'), 300);

    document.querySelectorAll('.shape').forEach((s,i) => s.style.animationDelay = `${i*2}s`);
    document.querySelectorAll('.floating-element').forEach((el,i) => el.style.animationDelay = `${i*1.5}s`);
    
    // Initialize both carousels
    initVideoCarousel();
    initImageCarousel(); // Novo carrossel de imagens
});

// ========== PERFORMANCE SCROLL OPTIMIZATION ==========
let ticking = false;
function updateOnScroll() { ticking = false; }
window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateOnScroll); ticking = true; }
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// ========== BUTTON LOADING STATE ==========
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            const textEl = this.querySelector('.btn-text');
            if (!textEl) return;
            const originalText = textEl.textContent;
            textEl.textContent = 'Processando...';
            this.style.opacity = '0.7';
            this.disabled = true;
            setTimeout(() => {
                textEl.textContent = originalText;
                this.style.opacity = '1';
                this.disabled = false;
                alert('Simulação de redirecionamento para reserva/WhatsApp!');
            }, 2000);
        }
    });
});

// ========== SERVICE CARDS INTERACTION ==========
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-10px) scale(1.02)'; });
    card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) scale(1)'; });
});

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && chatContainer?.classList.contains('open')) chatContainer.classList.remove('open');
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); chatContainer?.classList.add('open'); chatInput?.focus(); }
});

// ========== TEST GEMINI ==========
window.testGemini = async function() {
    console.log('🧪 Testando Gemini API...');
    const response = await getGeminiResponse("Quais serviços o FitGenious oferece?");
    console.log('🧪 Resposta do teste:', response);
};
setTimeout(() => { console.log('🧪 Iniciando teste automático do Gemini...'); window.testGemini(); }, 2000);

