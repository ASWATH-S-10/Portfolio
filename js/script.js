const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            });
        }
    });

    document.querySelector('header').classList.toggle('sticky', window.scrollY > 100);
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading, .section-subtitle', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
ScrollReveal().reveal('.language-card', { origin: 'bottom', interval: 200 });
ScrollReveal().reveal('.education-card', { origin: 'left', distance: '60px' });
ScrollReveal().reveal('.research-wrapper', { origin: 'bottom', distance: '60px', duration: 2500 });
ScrollReveal().reveal('.domain-card', { origin: 'bottom', interval: 150, delay: 400 });
ScrollReveal().reveal('.footer-quote', { origin: 'bottom', delay: 300 });

new Typed('.multiple-text', {
    strings: ['Web Developer', 'AI Developer', 'Entrepreneur'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

const readMoreBtn = document.getElementById('read-more-btn');
const moreText = document.getElementById('more-content');

readMoreBtn.onclick = (e) => {
    e.preventDefault();
    const isOpen = moreText.style.display === 'inline';
    moreText.style.display = isOpen ? 'none' : 'inline';
    readMoreBtn.textContent = isOpen ? 'Read More' : 'Read Less';
};

document.querySelectorAll('.services-box .read-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const moreContent = button.parentElement.querySelector('.more-content');
        const isOpen = moreContent.style.display === 'inline';
        moreContent.style.display = isOpen ? 'none' : 'inline';
        button.textContent = isOpen ? 'Read More' : 'Read Less';
    });
});

/* Language ring & counter animation */
const RING_CIRCUMFERENCE = 326.73;

function animateCounter(element, target, duration = 2000) {
    const start = performance.now();
    const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(target * eased);
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

function animateLanguageCard(card) {
    if (card.classList.contains('animated')) return;

    const percent = parseInt(card.dataset.percent, 10);
    const ring = card.querySelector('.ring-progress');
    const barFill = card.querySelector('.language-bar-fill');
    const counter = card.querySelector('.counter');

    card.style.setProperty('--progress', percent);
    card.style.setProperty('--bar-width', `${barFill.dataset.width}%`);
    card.classList.add('animated');

    ring.style.strokeDashoffset = RING_CIRCUMFERENCE - (RING_CIRCUMFERENCE * percent) / 100;
    animateCounter(counter, percent);
}

const languageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateLanguageCard(entry.target);
            languageObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.4 });

document.querySelectorAll('.language-card').forEach(card => {
    languageObserver.observe(card);
});
