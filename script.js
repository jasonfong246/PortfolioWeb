//-------------------------------------------------
// CONTACT BUTTON
//-------------------------------------------------
document.getElementById('contactBtn')?.addEventListener('click', () => {
    alert('Thanks for reaching out! I will get back to you soon.');
});

//-------------------------------------------------
// OPEN PROJECT MODALS (normal modals)
//-------------------------------------------------
const projectCards = document.querySelectorAll('.project-card');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const modalId = card.getAttribute('data-modal');
        document.getElementById(modalId).style.display = "block";
    });
});

// Close modals
closes.forEach(close => {
    close.addEventListener('click', () => {
        close.parentElement.parentElement.style.display = 'none';
    });
});

// Close when clicking outside
window.addEventListener('click', event => {
    modals.forEach(modal => {
        if (event.target === modal) modal.style.display = 'none';
    });
});

// ABOUT IMAGE CAROUSEL
const aboutCarousel = document.getElementById("about-carousel");

if (aboutCarousel) {
    const images = aboutCarousel.dataset.images.split(",").map(i => i.trim());
    let index = 0;
    const img = aboutCarousel.querySelector(".carousel-img");
    const prev = aboutCarousel.querySelector(".prev");
    const next = aboutCarousel.querySelector(".next");

    function showImage() {
        img.src = images[index];
    }

    // Initialize first image
    showImage();

    next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        showImage();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        showImage();
    });
}


//-------------------------------------------------
// EXPERIENCE MODALS (use "data-modal" on cards)
//-------------------------------------------------
const experienceCards = document.querySelectorAll(".experience-card");

experienceCards.forEach(card => {
    card.addEventListener("click", () => {
        const modalId = card.dataset.modal;
        document.getElementById(modalId).style.display = "block";
    });
});

//-------------------------------------------------
// UNIVERSAL CAROUSEL — ONLY RUN ON MODALS WITH data-images
//-------------------------------------------------
document.querySelectorAll(".modal[data-images]").forEach(modal => {
    const images = modal.dataset.images.split(",").map(i => i.trim());
    let index = 0;

    const img = modal.querySelector(".carousel-img");
    const prev = modal.querySelector(".prev");
    const next = modal.querySelector(".next");

    function showImage() {
        img.src = images[index];
    }

    next.addEventListener("click", () => {
        index = (index + 1) % images.length;
        showImage();
    });

    prev.addEventListener("click", () => {
        index = (index - 1 + images.length) % images.length;
        showImage();
    });

    document.querySelectorAll("[data-modal]").forEach(card => {
        card.addEventListener("click", () => {
            if (card.dataset.modal === modal.id) {
                index = 0;
                showImage();
            }
        });
    });
});

//-------------------------------------------------
// TYPEWRITER EFFECT
//-------------------------------------------------
const aboutParagraphs = document.querySelectorAll("#about-text p");

// Store full text and clear initially
aboutParagraphs.forEach(p => {
    p.dataset.fulltext = p.innerText;
    p.innerHTML = "";
});

let intervals = []; // store all running intervals

function typeWriter(element, speed = 15) {
    const text = element.dataset.fulltext;
    let i = 0;

    const interval = setInterval(() => {
        element.innerHTML = text.substring(0, i);
        i++;
        if (i > text.length) clearInterval(interval);
    }, speed);

    intervals.push(interval); // save interval so we can cancel later
}

function clearAllIntervals() {
    intervals.forEach(id => clearInterval(id));
    intervals = [];
}

function playAboutAnimation() {
    let delay = 0;
    aboutParagraphs.forEach(p => {
        setTimeout(() => typeWriter(p), delay);
        delay += p.dataset.fulltext.length * 15 + 300;
    });
}

// Play first time on page load
document.addEventListener("DOMContentLoaded", playAboutAnimation);

// Restart animation when clicking "About" navbar link
document.querySelector('a[href="#about"]').addEventListener("click", () => {
    clearAllIntervals(); // cancel any running animations
    aboutParagraphs.forEach(p => p.innerHTML = ""); // reset text
    setTimeout(playAboutAnimation, 300); // start new animation
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll('.slide-section');
    const navLinks = document.querySelectorAll('nav a');

    // ----- Intersection Observer for scroll animations -----
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove active when out of view to allow re-animation
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => observer.observe(section));

    // ----- Nav click smooth scroll + animation reset -----
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const section = document.getElementById(targetId);

            // Remove and force reflow to restart animation
            section.classList.remove('active');
            void section.offsetWidth;
            section.classList.add('active');

            // Scroll smoothly
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});
