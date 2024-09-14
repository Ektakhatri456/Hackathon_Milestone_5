//Get references to the form and display area 
var form = document.getElementById("resume-form");
var resumeDisplayElement = document.getElementById("resume-display");
var shareableLink = document.getElementById("shareable-link");
var shareableLinkElement = document.getElementById("link");
var pdf = document.getElementById("PDF");
//Form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // this prevents the page from reloading.
    console.log('Form Submitted');
    //Collect input values.
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var work_experience = document.getElementById('work-experience').value;
    var skills = document.getElementById('skills').value;
    //Sved form data in loacl storage with username as key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        work_experience: work_experience,
        skills: skills
    };
    localStorage.setItem(username, JSON.stringify(resumeData));
    //Generate the Resume content dynamically
    var resume_HTML = "\n        <h2><b>Unique and Shareable Resume</b><h2>\n        <h3>Personal Information</h3>\n        <p><b>Name: </b><span contenteditable=\"true\">".concat(name, "</span></p>\n        <p><b>Email: </b><span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone: </b><span contenteditable=\"true\">").concat(phone, "</span></p>\n\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n\n        <h3>Work-Experience</h3>\n        <p contenteditable=\"true\">").concat(work_experience, "</p>\n\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n        ");
    //Display generated resume
    resumeDisplayElement.innerHTML = resume_HTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLink.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
pdf.addEventListener('click', function () {
    window.print(); // This will open the print dialog box and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', function () {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if (username) {
        // Autofill form if data is found in localStorage
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value =
                username;
            document.getElementById('name').value =
                resumeData.name;
            document.getElementById('email').value =
                resumeData.email;
            document.getElementById('phone').value =
                resumeData.phone;
            document.getElementById('education').value =
                resumeData.education;
            document.getElementById('work-experience').value
                = resumeData.work_experience;
            document.getElementById('skills').value =
                resumeData.skills;
        }
    }
});
