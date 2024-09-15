// Get references to the form and display area
const form = document.getElementById('resumeForm') as HTMLFormElement;
const resumeDisplayElement = document.getElementById('resume-display') as HTMLDivElement;

const profilePicInput = document.getElementById('profilePic') as HTMLInputElement;
const profilePicPreview = document.getElementById('profilePicPreview') as HTMLImageElement;

const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLDivElement;
const shareableLinkElement = document.getElementById('shareable-link') as HTMLAnchorElement;
const downloadPdfButton = document.getElementById('download-pdf') as HTMLButtonElement;

let profilePicBase64: string = ''; // Variable to hold base64 string of profile picture

// Display selected profile picture in preview
profilePicInput.addEventListener('change', (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            profilePicBase64 = e.target?.result as string;
            profilePicPreview.src = profilePicBase64;
            profilePicPreview.style.display = 'block'; // Show preview
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission
form.addEventListener('submit', (event: Event) => {
    event.preventDefault(); // prevent page reload

    // Collect input values
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const phone = (document.getElementById('phone') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLTextAreaElement).value;
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

    // Save form data in localStorage with the username as the key
    const resumeData = {
        name,
        email,
        phone,
        education,
        experience,
        skills,
        profilePicBase64 // Save profile picture base64
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Save the data

    // Generate the resume content dynamically
    const resumeHTML = `
        <h2>Shareable Resume</h2>
        <img src="${profilePicBase64}" alt="Profile Picture" style="max-width: 150px; border-radius: 50%;">
        <h3>Personal Information</h3>
        <p><b>Full Name:</b> <span contenteditable="true">${name}</span></p>
        <p><b>Email:</b> <span contenteditable="true">${email}</span></p>
        <p><b>Phone:</b> <span contenteditable="true">${phone}</span></p>
        <h3>Education</h3>
        <p contenteditable="true">${education}</p>
        <h3>Experience</h3>
        <p contenteditable="true">${experience}</p>
        <h3>Skills</h3>
        <p contenteditable="true">${skills}</p>
    `;

    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;

    // Generate a shareable URL with the username only
    const shareableURL = `${window.location.origin}?username=${encodeURIComponent(username)}`;

    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});

// Handle PDF download
downloadPdfButton.addEventListener('click', () => {
    window.print(); // This will open the print dialog and allow the user to save as PDF
});

// Prefill the form based on the username in the URL
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        // Autofill form if data is found in localStorage
        const savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            const resumeData = JSON.parse(savedResumeData);
            (document.getElementById('username') as HTMLInputElement).value = username;
            (document.getElementById('name') as HTMLInputElement).value = resumeData.name;
            (document.getElementById('email') as HTMLInputElement).value = resumeData.email;
            (document.getElementById('phone') as HTMLInputElement).value = resumeData.phone;
            (document.getElementById('education') as HTMLTextAreaElement).value = resumeData.education;
            (document.getElementById('experience') as HTMLTextAreaElement).value = resumeData.experience;
            (document.getElementById('skills') as HTMLTextAreaElement).value = resumeData.skills;

            if (resumeData.profilePicBase64) {
                profilePicPreview.src = resumeData.profilePicBase64;
                profilePicPreview.style.display = 'block';
            }
        }
    }
});
