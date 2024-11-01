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

    // ----------------------------------------
    // Populate skills section via JSON
    // ----------------------------------------
    fetch("../Data/Skills.json")
    .then((response) => {return response.json()})
    .then((skills) => {loadSkills(skills)})
    .catch((err) => {console.log("Error in fetching Skills: " + err)});

    // ----------------------------------------
    // Contact Me Section
    // ----------------------------------------
    // Initialize public key
    // emailjs.init({
    //     publicKey: p_fvjnrxm1vOznGyv,
    // });
    emailjs.init('p_fvjnrxm1vOznGyv');

    // Set a listener to send an email upon Send Message click
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        emailjs.sendForm('service_nqxul58', 'template_0evuwu8', this)
            .then(() => {
                // Ensure error text is hidden
                document.getElementById('contact-error-text').style.display = 'none';
                console.log('Message sent successfully!');
                // Call a helper to show the toast to say sent successfully
                showToast('Message sent successfully!');
                document.getElementById('contact-form').reset();
            }, (error) => {
                console.log('Message failed to send with error: ', error);
                // Call a helper to update error text
                updateError('The message was unable to be sent. Please try again later or use my contact information on the right!');
            });
    });
});

function loadSkills(skills) {
    const techSkillsContainer = document.getElementById('tech-skills-container');
    const generalSkillsContainer = document.getElementById('general-skills-container');

    // Ensure both are cleared
    techSkillsContainer.innerHTML = "";
    generalSkillsContainer.innerHTML = "";

    // Add technical skills via a helper
    loadSkillsHelper(skills.Technical, techSkillsContainer);

    // Add general skills via a helper
    loadSkillsHelper(skills.General, generalSkillsContainer);
}

function loadSkillsHelper(skills, container) {
    for (let i = 0; i < skills.length; i++) {
        // Get all attributes
        let name = skills[i].Name;
        let image = skills[i].Image;

        // Construct the new HTML element
        let newSkill = document.createElement("div");
        newSkill.classList.add("skill-card");
        newSkill.innerHTML = `
            <img class="skill-image" src=${image} alt=${name}>
            <p>${name}</p>
            `;
        
        // Add the new element to the container
        container.appendChild(newSkill);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
           toast.style.display = 'none';
           toast.style.opacity = 0.9; 
        }, 500);
    }, 3000);
}

function updateError(message) {
    const errorText = document.getElementById('contact-error-text');
    errorText.innerText = message;
    errorText.style.display = 'block';
}