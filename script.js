document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            icon.style.color = 'var(--primary-color)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                icon.style.color = 'var(--white)';
            }
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                icon.style.color = 'var(--white)';
            }
        });
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 5. Contact Form Submission (Prevent default for placeholder)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just show an alert for the placeholder functionality
            alert('Thank you for getting in touch! We will contact you soon.');
            contactForm.reset();
        });
    }

    // 6. 3D Carousel Logic
    const spinContainer = document.getElementById('spin-container');
    const dragContainer = document.getElementById('drag-container');
    if (spinContainer && dragContainer) {
        const aImg = spinContainer.getElementsByTagName('img');
        const aEle = [...aImg];
        const pEle = spinContainer.getElementsByTagName('p')[0];
        if (pEle) aEle.push(pEle);

        const radius = 340;
        const autoRotate = true;
        const rotateSpeed = -60;
        const imgWidth = 140;
        const imgHeight = 200;

        spinContainer.style.width = imgWidth + "px";
        spinContainer.style.height = imgHeight + "px";

        setTimeout(() => {
            for (let i = 0; i < aEle.length; i++) {
                aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
                aEle[i].style.transition = "transform 1s";
                aEle[i].style.transitionDelay = (aEle.length - i) * 0.1 + "s";
            }
        }, 1000);

        let sX, sY, nX, nY, desX = 0,
            desY = 0,
            tX = 0,
            tY = 10;

        if (autoRotate) {
            const animationName = (rotateSpeed > 0) ? 'spin' : 'spinRevert';
            spinContainer.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
        }

        document.onpointerdown = function(e) {
            clearInterval(dragContainer.timer);
            e = e || window.event;
            sX = e.clientX;
            sY = e.clientY;

            document.onpointermove = function(e) {
                e = e || window.event;
                nX = e.clientX;
                nY = e.clientY;
                desX = nX - sX;
                desY = nY - sY;
                tX += desX * 0.1;
                tY += desY * 0.1;
                playSpin(false);
                applyTransform(dragContainer);
                sX = nX;
                sY = nY;
            };

            document.onpointerup = function(e) {
                dragContainer.timer = setInterval(function() {
                    desX *= 0.95;
                    desY *= 0.95;
                    tX += desX * 0.1;
                    tY += desY * 0.1;
                    applyTransform(dragContainer);
                    playSpin(false);
                    if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                        clearInterval(dragContainer.timer);
                        playSpin(true);
                    }
                }, 17);
                document.onpointermove = document.onpointerup = null;
            };
            return false;
        };

        function applyTransform(obj) {
            if (tY > 180) tY = 180;
            if (tY < 0) tY = 0;
            obj.style.transform = "rotateX(" + (-tY) + "deg) rotateY(" + (tX) + "deg)";
        }

        function playSpin(yes) {
            spinContainer.style.animationPlayState = (yes ? 'running' : 'paused');
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            icon.style.color = 'var(--primary-color)';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                icon.style.color = 'var(--white)';
            }
        }
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            if (window.scrollY <= 50) {
                icon.style.color = 'var(--white)';
            }
        });
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Scroll Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 5. Contact Form Submission (Prevent default for placeholder)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Just show an alert for the placeholder functionality
            alert('Thank you for getting in touch! We will contact you soon.');
            contactForm.reset();
        });
    }

    // 6. Menu Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    if (tabBtns.length > 0 && menuCategories.length > 0) {
        // Initialize: show only the first category
        menuCategories.forEach((cat, index) => {
            if (index === 0) {
                cat.classList.add('active-category');
            } else {
                cat.classList.remove('active-category');
            }
        });

        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and categories
                tabBtns.forEach(b => b.classList.remove('active'));
                menuCategories.forEach(c => c.classList.remove('active-category'));

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding category
                if (menuCategories[index]) {
                    menuCategories[index].classList.add('active-category');
                }
            });
        });
    }
});