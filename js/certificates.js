// Certificates Page JavaScript

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initializeGalleryFilter();
        initializeLightbox();
    });

    // Gallery Filter functionality
    function initializeGalleryFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const certificateCards = document.querySelectorAll('.certificate-card');

        // Make cards focusable for keyboard navigation
        certificateCards.forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', 'View certificate');

            // Keyboard activation
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.querySelector('.certificate-image').click();
                }
            });
        });

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter certificates
                certificateCards.forEach(card => {
                    const category = card.getAttribute('data-category');

                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // Lightbox functionality
    function initializeLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!lightbox || !lightboxImage) return;

        // Open lightbox when clicking certificate image
        const certificateImages = document.querySelectorAll('.certificate-image');
        certificateImages.forEach(img => {
            img.addEventListener('click', function() {
                const card = this.closest('.certificate-card');
                const fullImage = this.querySelector('img').src;
                const title = card.querySelector('h3').textContent;
                const institution = card.querySelector('.institution').textContent;
                const date = card.querySelector('.date').textContent;

                lightboxImage.src = fullImage;
                lightboxImage.alt = title;
                lightboxCaption.innerHTML = `<strong>${title}</strong><br>${institution} | ${date}`;

                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        // Close lightbox on button click
        closeBtn.addEventListener('click', closeLightbox);

        // Close lightbox on background click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    function closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

})();

// Add CSS animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
