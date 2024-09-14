//Get references to the form and display area 

    const form = document.getElementById("resume-form") as HTMLFormElement;
    const resumeDisplayElement = document.getElementById("resume-display") as HTMLDivElement;
    const shareableLink = document.getElementById("shareable-link") as HTMLDivElement;
    const shareableLinkElement = document.getElementById("link") as HTMLAnchorElement;
    const pdf = document.getElementById("PDF") as HTMLButtonElement;

    //Form submission
    form.addEventListener('submit', (event: Event) => {
        event.preventDefault(); // this prevents the page from reloading.
        console.log('Form Submitted');

        //Collect input values.
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const work_experience = (document.getElementById('work-experience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
        
        //Sved form data in loacl storage with username as key
        const resumeData = {
            name,
            email,
            phone,
            education,
            work_experience,
            skills
        };
        localStorage.setItem(username, JSON.stringify(resumeData));


        //Generate the Resume content dynamically
        const resume_HTML = `
        <h2><b>Unique and Shareable Resume</b><h2>
        <h3>Personal Information</h3>
        <p><b>Name: </b><span contenteditable="true">${name}</span></p>
        <p><b>Email: </b><span contenteditable="true">${email}</span></p>
        <p><b>Phone: </b><span contenteditable="true">${phone}</span></p>

        <h3>Education</h3>
        <p contenteditable="true">${education}</p>

        <h3>Work-Experience</h3>
        <p contenteditable="true">${work_experience}</p>

        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
        `;

        //Display generated resume
            resumeDisplayElement.innerHTML = resume_HTML;

            // Generate a shareable URL with the username only
const shareableURL =
`${window.location.origin}?username=${encodeURIComponent(username)}`;
// Display the shareable link
shareableLink.style.display = 'block';
shareableLinkElement.href = shareableURL;
shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
pdf.addEventListener('click', () => {
window.print(); // This will open the print dialog box and allow the user to save as PDF
});
// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');

if(username){
    // Autofill form if data is found in localStorage
const savedResumeData = localStorage.getItem(username);
if (savedResumeData) {
const resumeData = JSON.parse(savedResumeData);
(document.getElementById('username') as HTMLInputElement).value =
username;
(document.getElementById('name') as HTMLInputElement).value =
resumeData.name;
(document.getElementById('email') as HTMLInputElement).value =
resumeData.email;
(document.getElementById('phone') as HTMLInputElement).value =
resumeData.phone;
(document.getElementById('education') as HTMLTextAreaElement).value =
resumeData.education;
(document.getElementById('work-experience') as HTMLTextAreaElement).value
= resumeData.work_experience;
(document.getElementById('skills') as HTMLTextAreaElement).value =
resumeData.skills;
}
}
});
       
