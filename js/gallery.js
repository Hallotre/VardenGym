// ===================================
// VARDEN GYM - GALLERY LIGHTBOX
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    let currentIndex = 0;
    const images = [];

    // Collect all gallery images
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push({
                src: img.src,
                alt: img.alt
            });

            // Click event to open lightbox
            item.addEventListener('click', function() {
                currentIndex = index;
                openLightbox();
            });
        }
    });

    // Open lightbox
    function openLightbox() {
        if (images.length > 0) {
            lightbox.classList.add('active');
            updateLightboxImage();
            document.body.style.overflow = 'hidden';
        }
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Update lightbox image
    function updateLightboxImage() {
        if (images[currentIndex]) {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
        }
    }

    // Navigate to next image
    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
    }

    // Navigate to previous image
    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
    }

    // Event listeners
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', function(e) {
            e.stopPropagation();
            nextImage();
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', function(e) {
            e.stopPropagation();
            prevImage();
        });
    }

    // Close lightbox when clicking on background
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            }
        }
    });

    // Prevent scrolling when lightbox is open
    lightbox.addEventListener('wheel', function(e) {
        if (lightbox.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    lightbox.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            nextImage();
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            prevImage();
        }
    }
});
