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
    // Populate experiences section via JSON
    // ----------------------------------------
    fetch("../Data/Experiences.json")
    .then((response) => {return response.json()})
    .then((experiences) => {loadExperiences(experiences)})
    .catch((err) => {console.log("Error in fetching Experiences: " + err)});

    // ----------------------------------------
    // Populate education section via JSON
    // ----------------------------------------
    fetch("../Data/Education.json")
    .then((response) => {return response.json()})
    .then((education) => {loadEducation(education)})
    .catch((err) => {console.log("Error in fetching Education: " + err)});

    // ----------------------------------------
    // Contact Me Section
    // ----------------------------------------
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

function loadExperiences(experiences) {
    const experiencesContainer = document.getElementById('experience-container');

    // Ensure it is cleared
    experiencesContainer.innerHTML = "";

    // Add experiences
    const experiencesArr = experiences.Experiences;
    for (let i = 0; i < experiencesArr.length; i++) {
        // Get all attributes
        let company = experiencesArr[i].Company;
        let title = experiencesArr[i].Title;
        let date = experiencesArr[i].Date;
        let image = experiencesArr[i].Image;
        let accomplishments = experiencesArr[i].Accomplishments.join(', ');
        let languages = experiencesArr[i].Languages.join(', ');
        let tools = experiencesArr[i].Tools.join(', ');
        let softSkills = experiencesArr[i].Soft_Skills.join(', ');

        // Construct the new HTML elements
        let newExperience = document.createElement("div");
        newExperience.classList.add("experience-card");
        newExperience.onclick = function() {
            toggleDetails(newExperience);
        };
        newExperience.innerHTML = `
            <div class="experience-date-container">
                <p class="experience-date">${date}</p>
            </div>
            <div class="experience-info">
                <img class="experience-logo" src=${image} alt=${company}>
                <div class="experience-summary">
                    <h3>${company}</h3>
                    <p>${title}</p>
                </div>
                <span class="toggle-icon">▼</span>
            </div>
            `;

        let newExperienceDetails = document.createElement("div");
        newExperienceDetails.classList.add("experience-details");
        newExperienceDetails.innerHTML = `
            <p><b>Accomplishments:</b> ${accomplishments}</p>
            <p><b>Languages:</b> ${languages}</p>
            <p><b>Tools:</b> ${tools}</p>
            <p><b>Soft Skills:</b> ${softSkills}</p>
            `;

        // Add the new elements to the container
        experiencesContainer.appendChild(newExperience);
        experiencesContainer.appendChild(newExperienceDetails);
    }
}

function loadEducation(education) {
    const educationContainer = document.getElementById('education-container');

    // Ensure it is cleared
    educationContainer.innerHTML = "";

    // Add education
    const educationArr = education.Education;
    for (let i = 0; i < educationArr.length; i++) {
        // Get all attributes
        let name = educationArr[i].Name;
        let major = educationArr[i].Major;
        let gpa = educationArr[i].GPA;
        let date = educationArr[i].Date;
        let minor = educationArr[i].Minor;
        let image = educationArr[i].Image;
        let accomplishments = educationArr[i].Accomplishments.join(', ');
        let relCoursework = educationArr[i].Relevant_Coursework.join(', ');
        let languages = educationArr[i].Languages.join(', ');
        let tools = educationArr[i].Tools.join(', ');
        let softSkills = educationArr[i].Soft_Skills.join(', ');

        // Construct the new HTML elements
        let newEducation = document.createElement("div");
        newEducation.classList.add("education-card");
        newEducation.onclick = function() {
            toggleDetails(newEducation);
        };
        newEducation.innerHTML = `
            <div class="education-date-container">
                <p class="education-date">${date}</p>
            </div>
            <div class="education-info">
                <img class="education-logo" src=${image} alt=${name}>
                <div class="education-summary">
                    <h3>${name}</h3>
                    <p>${major}</p>
                    <p>GPA: ${gpa}</p>
                </div>
                <span class="toggle-icon">▼</span>
            </div>
            `;
        
        let newEducationDetails = document.createElement("div");
        newEducationDetails.classList.add("education-details");
        newEducationDetails.innerHTML = `
            <p><b>Minor:</b> ${minor}</p>
            <p><b>Accomplishments:</b> ${accomplishments}</p>
            <p><b>Relevant Coursework:</b> ${relCoursework}</p>
            <p><b>Languages:</b> ${languages}</p>
            <p><b>Tools:</b> ${tools}</p>
            <p><b>Soft Skills:</b> ${softSkills}</p>
            `;

        // Add the new elements to the container
        educationContainer.appendChild(newEducation);
        educationContainer.appendChild(newEducationDetails);
    }
}

function toggleDetails(card) {
    const details = card.nextElementSibling;
    const toggleIcon = card.querySelector('.toggle-icon');

    // Toggle display
    if (details.style.display === 'none' || details.style.display === '') {
        details.style.display = "block";
        details.offsetHeight;
        details.style.opacity = '1';
        details.style.height = details.scrollHeight + 'px';
        details.style.padding = "15px 15px 0 15px";

        toggleIcon.style.transform = "rotate(180deg)";
    } else {
        details.style.opacity = '0';
        details.style.height = '0';
        details.style.padding = "0 15px 0 15px";

        setTimeout(() => {
            details.style.display = 'none';
        }, 500);

        toggleIcon.style.transform = "rotate(0deg)";
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