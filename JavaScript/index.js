window.addEventListener("DOMContentLoaded", (event) => {
    // Add smooth scrolling to each link and offset by 1/3 of the page
    document.querySelectorAll('embedded-link').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const targetID = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetID);
    
            // Set offset position to 1/3 down the page
            const offsetPos = targetSection.offsetTop - (window.innerHeight / 3);
    
            window.scrollTo({
                top: offsetPos,
                behavior: 'smooth'
            });
        });
    });
});