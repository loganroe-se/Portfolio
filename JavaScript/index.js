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
});

function loadSkills(skills) {
    console.log(skills);
    const techSkillsContainer = document.getElementById('tech-skills-container');
    const generalSkillsContainer = document.getElementById('general-skills-container');

    // Ensure both are cleared
    techSkillsContainer.innerHTML = "";
    generalSkillsContainer.innerHTML = "";

    // Add technical skills via a helper
    console.log('here');
    loadSkillsHelper(skills.Technical, techSkillsContainer);

    // Add general skills via a helper
    loadSkillsHelper(skills.General, generalSkillsContainer);
    console.log('here2');
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