// Portfolio Website JavaScript
// Handles interactive features and navigation

(function() {
    'use strict';

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeMobileMenu();
        initializeScrollEffects();
        initializeSmoothScroll();
        initializeActiveNavLink();
    });

    // Mobile Menu Toggle
    function initializeMobileMenu() {
        var menuToggle = document.getElementById('menuToggle');
        var navMenu = document.getElementById('navMenu');
        var navLinks = navMenu.querySelectorAll('a');

        if (!menuToggle || !navMenu) {
            return;
        }

        menuToggle.addEventListener('click', function() {
            var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            var isClickInsideNav = navMenu.contains(event.target);
            var isClickOnToggle = menuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Scroll Effects for Navbar
    function initializeScrollEffects() {
        var navbar = document.querySelector('.navbar');
        var lastScroll = 0;

        if (!navbar) {
            return;
        }

        window.addEventListener('scroll', function() {
            var currentScroll = window.pageYOffset;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Smooth Scroll for Anchor Links
    function initializeSmoothScroll() {
        var anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function(link) {
            link.addEventListener('click', function(event) {
                var href = link.getAttribute('href');
                
                // Skip if it's just "#" or doesn't point to an element
                if (href === '#') {
                    return;
                }

                var targetId = href.substring(1);
                var targetElement = document.getElementById(targetId);

                if (!targetElement) {
                    return;
                }

                event.preventDefault();

                var headerOffset = 80;
                var elementPosition = targetElement.getBoundingClientRect().top;
                var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update URL without jumping
                history.pushState(null, null, href);
            });
        });
    }

    // Active Navigation Link Based on Scroll Position
    function initializeActiveNavLink() {
        var sections = document.querySelectorAll('section');
        var navLinks = document.querySelectorAll('.nav-menu a');

        if (navLinks.length === 0) {
            return;
        }

        window.addEventListener('scroll', function() {
            var currentPosition = window.pageYOffset + 100;

            sections.forEach(function(section) {
                var sectionTop = section.offsetTop;
                var sectionHeight = section.offsetHeight;
                var sectionId = section.getAttribute('id');

                if (currentPosition >= sectionTop && currentPosition < sectionTop + sectionHeight) {
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                        var href = link.getAttribute('href');
                        if (href === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { passive: true });
    }

    // Add animation classes when elements come into view
    function initializeScrollAnimations() {
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe elements that should animate
        var animatedElements = document.querySelectorAll('.experience-card, .referee-card, .skill-item, .timeline-item');
        animatedElements.forEach(function(element) {
            observer.observe(element);
        });
    }

    // Call this if you want scroll animations
    // initializeScrollAnimations();

})();

// Utility function for email protection (optional)
function protectEmail(email) {
    var atIndex = email.indexOf('@');
    var name = email.substring(0, atIndex);
    var domain = email.substring(atIndex + 1);
    
    return name + ' [at] ' + domain;
}

// Form validation helper (for future contact form)
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}