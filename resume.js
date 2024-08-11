let applicants = [];
let filteredApplicants = [];
let currentIndex = 0;

fetch("./Data.json")
  .then((response) => response.json())
  .then((data) => {
    applicants = data.resume;
    console.log("resumes data:", applicants);
    displayApplicant(applicants, currentIndex);
  });

function displayApplicant(applicants, index) {
  if (applicants.length > 0) {
    const applicant = applicants[index];
    document.getElementById("applicant-details").innerHTML =
      makeHtmlForApplicant(applicant);

    // Hide buttons as necessary
    document.getElementById("prevBtn").style.visibility =
      index === 0 ? "hidden" : "visible";
    document.getElementById("nextBtn").style.visibility =
      index === applicants.length - 1 ? "hidden" : "visible";
  } else {
    document.getElementById("error-message").innerText = "No applicants found";
  }
}

function nextApplicant() {
  const resumes =
    filteredApplicants.length > 0 ? filteredApplicants : applicants;
  if (currentIndex < resumes.length - 1) {
    currentIndex++;
    displayApplicant(resumes, currentIndex);
  }
}

function prevApplicant() {
  const resumes =
    filteredApplicants.length > 0 ? filteredApplicants : applicants;
  if (currentIndex > 0) {
    currentIndex--;
    displayApplicant(resumes, currentIndex);
  }
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function filterByJob() {
  const filter = document.getElementById("jobFilter").value.toLowerCase();
  filteredApplicants = applicants.filter((applicant) =>
    applicant.basics.AppliedFor.toLowerCase().includes(filter)
  );

  if (filteredApplicants.length > 0) {
    currentIndex = 0;
    displayApplicant(filteredApplicants, currentIndex);
    document.querySelector(".error-message-div").style.display = "none";
    document.getElementById("applicant-details").style.display = "block";
  } else {
    document.querySelector(".error-message-div").style.display = "flex";
    document.getElementById("applicant-details").style.display = "none";
  }
}

const inputElement = document.getElementById("jobFilter");
inputElement.addEventListener("keyup", debounce(filterByJob, 300));

function makeHtmlForApplicant(applicant) {
  let skills = applicant.skills.keywords
    .map((skill) => `<p>${skill}</p>`)
    .join("");
  let hobbies = applicant.interests.hobbies
    .map((hobby) => `<p>${hobby}</p>`)
    .join("");
  const allEductationDetails = applicant.education;

  let eductationDetails = [];

  for (let degree in allEductationDetails) {
    eductationDetails.push(`<li>
        <p><b>${degree}</b>: ${allEductationDetails[degree]["institute"]}, ${
      allEductationDetails[degree]?.["course"] ?? ""
    }  ${allEductationDetails[degree]?.["Start Date"] ?? ""} ${
      allEductationDetails[degree]?.["End Date"] ?? ""
    } ${allEductationDetails[degree]["cgpa"]}</p>
        </li>`);
  }

  eductationDetails = eductationDetails.join("");

  return `<div class="applicant-header">
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
                        <p><b>Company Name:</b> ${applicant.work["Company Name"]}</p>
                        <p><b>Position:</b> ${applicant.work.Position}</p>
                        <p><b>Start Date:</b> ${applicant.work["Start Date"]}</p>
                        <p><b>End Date:</b> ${applicant.work["End Date"]}</p>  
                        <p><b>Summary:</b> ${applicant.work.Summary}</p>   
                    </div>
                    <h3>Projects</h3>
                    <div class="explanation-div">
                        <p><b>${applicant.projects.name}:</b> ${applicant.projects.description} </p>
                    </div>
                    <h3>Education</h3>
                    <div class="explanation-div">
                        <ul>
                            ${eductationDetails}
                        </ul>
                    </div>
                    <h3>Internship</h3>
                    <div class="explanation-div">
                         <p><b>Company Name:</b> ${applicant.Internship["Company Name"]}</p>
                        <p><b>Position:</b> ${applicant.Internship.Position}</p>
                        <p><b>Start Date:</b> ${applicant.Internship["Start Date"]}</p>
                        <p><b>End Date:</b> ${applicant.Internship["End Date"]}</p>  
                        <p><b>Summary:</b> ${applicant.Internship.Summary}</p>     
                    </div>
                    <h3>Achievements</h3>
                    <div class="explanation-div">
                        <ul>
                            <li> <p>${applicant.achievements.Summary} </p></li>
                        </ul> 
                    </div>
                </div>

            </div>`;
}

// Restrict access if not logged in
if (sessionStorage.getItem("loginResume") !== "true") {
  window.location.href = "index.html";
}
