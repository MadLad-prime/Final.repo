document.addEventListener("DOMContentLoaded", function() {

    // --- STICKY NAVIGATION ---
    const header = document.getElementById("mainHeader");
    const stickyPoint = header.offsetTop + 100; // Add a buffer

    function handleScroll() {
        if (window.pageYOffset > stickyPoint) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    window.addEventListener("scroll", handleScroll);

    // --- MOBILE NAVIGATION TOGGLE ---
    const navToggle = document.getElementById("navToggle");
    const mainNav = document.getElementById("mainNav");

    if (navToggle && mainNav) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            mainNav.classList.toggle("active");
        });

        // Close mobile nav when a link is clicked
        mainNav.querySelectorAll('.nav-link, .secondary-cta').forEach(link => {
            link.addEventListener('click', () => {
                if (mainNav.classList.contains('active')) {
                   navToggle.classList.remove("active");
                   mainNav.classList.remove("active");
                }
            });
        });
    }

    // --- SCROLL-IN ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const elementsToAnimate = document.querySelectorAll('.anim-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // --- Catalogue Modal Logic ---
    const openModalBtn = document.getElementById('open-catalogue-modal');
    const closeModalBtn = document.getElementById('close-catalogue-modal');
    const catalogueModal = document.getElementById('catalogue-modal');

    if (openModalBtn && closeModalBtn && catalogueModal) {
        const openModal = () => {
            catalogueModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };
        const closeModal = () => {
            catalogueModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        };
        openModalBtn.addEventListener('click', openModal);
        closeModalBtn.addEventListener('click', closeModal);
        catalogueModal.addEventListener('click', (e) => {
            if (e.target === catalogueModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && catalogueModal.classList.contains('active')) closeModal();
        });
    }

    // === START: NEW PROJECT LIGHTBOX LOGIC ===
    const lightbox = document.getElementById("project-lightbox");
    if (lightbox) {
        const closeBtn = document.getElementById("close-lightbox");
        const beforeImg = document.getElementById("before-image");
        const afterImg = document.getElementById("after-image");
        const beforeWrapper = lightbox.querySelector(".before-image");
        const showBeforeBtn = document.getElementById("show-before-btn");
        const showAfterBtn = document.getElementById("show-after-btn");

        const openLightbox = (card) => {
            // Populate data from the clicked card's data attributes
            beforeImg.src = card.dataset.before;
            afterImg.src = card.dataset.after;
            lightbox.querySelector("#lightbox-title").textContent = card.dataset.title;
            lightbox.querySelector("#project-description").textContent = card.dataset.description;
            lightbox.querySelector("#project-duration").textContent = card.dataset.duration;
            lightbox.querySelector("#project-materials").textContent = card.dataset.materials;
            lightbox.querySelector("#project-client").textContent = card.dataset.client;
            
            // Set initial state to show the "After" image
            beforeWrapper.style.width = "0%";
            showAfterBtn.classList.add("active");
            showBeforeBtn.classList.remove("active");

            lightbox.classList.add("active");
            document.body.style.overflow = "hidden"; // Prevent background scrolling
        };

        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
        };

        // Add click event to all project cards to open the lightbox
        document.querySelectorAll(".project-card").forEach(card => {
            card.addEventListener("click", () => openLightbox(card));
        });
        
        // Event listener for the "Show Before" button
        showBeforeBtn.addEventListener("click", () => {
            beforeWrapper.style.width = "100%";
            showBeforeBtn.classList.add("active");
            showAfterBtn.classList.remove("active");
        });

        // Event listener for the "Show After" button
        showAfterBtn.addEventListener("click", () => {
            beforeWrapper.style.width = "0%";
            showAfterBtn.classList.add("active");
            showBeforeBtn.classList.remove("active");
        });

        // Event listeners for closing the lightbox
        closeBtn.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) closeLightbox(); // Close if overlay is clicked
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox(); // Close with Escape key
        });
    }
    // === END: NEW PROJECT LIGHTBOX LOGIC ===
});