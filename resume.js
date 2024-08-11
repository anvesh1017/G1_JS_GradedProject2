let applicants = [];
let filteredApplicants = [];
let currentIndex = 0;

fetch('./Data.json')
    .then(response => response.json())
    .then(data => {
        applicants = data.resume;  
        console.log("resumes data:", applicants);
        displayApplicant(applicants, currentIndex);
    });

function displayApplicant(applicants, index) {
    if (applicants.length > 0) {
        const applicant = applicants[index];
       document.getElementById('applicant-details').innerHTML = makeHtmlForApplicant(applicant); 

        // Hide buttons as necessary
        document.getElementById('prevBtn').style.visibility = index === 0 ? 'hidden' : 'visible';
        document.getElementById('nextBtn').style.visibility = index === applicants.length - 1 ? 'hidden' : 'visible';
    } else {
        document.getElementById('error-message').innerText = 'No applicants found';
    }
}

function nextApplicant() {
    const  resumes = (filteredApplicants.length > 0) ? filteredApplicants : applicants;
    if (currentIndex < resumes.length - 1) {
        currentIndex++;
        displayApplicant(resumes, currentIndex);
    }
}

function prevApplicant() {
    const  resumes = (filteredApplicants.length > 0) ? filteredApplicants : applicants;
    if (currentIndex > 0) {
        currentIndex--;
        displayApplicant(resumes, currentIndex);
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function filterByJob() {
    const filter = document.getElementById('jobFilter').value.toLowerCase();
    filteredApplicants = applicants.filter(applicant => applicant.basics.AppliedFor.toLowerCase().includes(filter));

    if (filteredApplicants.length > 0) {
        currentIndex = 0;
        displayApplicant(filteredApplicants, currentIndex);
        document.querySelector('.error-message-div').style.display = 'none';
        document.getElementById('applicant-details').style.display = "block";
    } else {
        document.querySelector('.error-message-div').style.display = 'flex';
        document.getElementById('applicant-details').style.display = "none";
    }
}

const inputElement = document.getElementById('jobFilter');
inputElement.addEventListener('keyup', debounce(filterByJob, 300));

function makeHtmlForApplicant (applicant) {

    let skills = applicant.skills.keywords.map((skill) => `<p>${skill}</p>`).join('');
    console.log("skills:", skills);
    let hobbies = applicant.interests.hobbies.map((hobby) => `<p>${hobby}</p>`).join('');
    return (
        `<div class="applicant-header">
                <div class="name-div">
                    <h3>${applicant.basics.name}</h3>
                    <p>Applied For ${applicant.basics.AppliedFor} </p>
                </div>
                <div class="image-div">
                    <img src="./user.png" />
                </div>
            </div>
            <div class="applicant-details">
                <div class="personal-info-div">
                    <h3>Personal Information</h3>
                    <p>${applicant.basics.phone}</p>
                    <p>${applicant.basics.email}</p>
                    <a href="${applicant.basics.profiles.url}" target="_blank">${applicant.basics.profiles.network}</a>
                    <h3>Technical Skills</h3>
                    ${skills}
                    <h3>Hobbies</h3>
                    ${hobbies}
                </div>
                <div class="professional-info-div">
                    <h3>Work Experience in previous company</h3>
                    <div class="explanation-div">
                        <p><b>Company Name:</b> </p>
                        <p><b>Position:</b> </p>
                        <p><b>Start Date:</b> </p>
                        <p><b>End Date:</b> </p>  
                        <p><b>Summary:</b> </p>   
                    </div>
                    <h3>Projects</h3>
                    <div class="explanation-div">
                        <p><b>Company Name:</b> </p>
                    </div>
                    <h3>Education</h3>
                    <div class="explanation-div">
                        <ul>
                            <li> <p><b>Company Name:</b> </p></li>
                        </ul>
                    </div>
                    <h3>Internship</h3>
                    <div class="explanation-div">
                        <p><b>Company Name:</b> </p>
                        <p><b>Position:</b> </p>
                        <p><b>Start Date:</b> </p>
                        <p><b>End Date:</b> </p>  
                        <p><b>Summary:</b> </p>   
                    </div>
                    <h3>Achievements</h3>
                    <div class="explanation-div">
                        <ul>
                            <li> <p>Summary </p></li>
                        </ul> 
                    </div>
                </div>

            </div>`
    );

}
