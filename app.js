// Get references to the form and display area
var form = document.getElementById('resumeForm');
var resumeDisplayElement = document.getElementById('resume-display');
var profilePicInput = document.getElementById('profilePic');
var profilePicPreview = document.getElementById('profilePicPreview');
var shareableLinkContainer = document.getElementById('shareable-link-container');
var shareableLinkElement = document.getElementById('shareable-link');
var downloadPdfButton = document.getElementById('download-pdf');
var profilePicBase64 = ''; // Variable to hold base64 string of profile picture
// Display selected profile picture in preview
profilePicInput.addEventListener('change', function (event) {
    var _a;
    var file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            profilePicBase64 = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            profilePicPreview.src = profilePicBase64;
            profilePicPreview.style.display = 'block'; // Show preview
        };
        reader.readAsDataURL(file);
    }
});
// Handle form submission
form.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page reload
    // Collect input values
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var education = document.getElementById('education').value;
    var experience = document.getElementById('experience').value;
    var skills = document.getElementById('skills').value;
    // Save form data in localStorage with the username as the key
    var resumeData = {
        name: name,
        email: email,
        phone: phone,
        education: education,
        experience: experience,
        skills: skills,
        profilePicBase64: profilePicBase64 // Save profile picture base64
    };
    localStorage.setItem(username, JSON.stringify(resumeData)); // Save the data
    // Generate the resume content dynamically
    var resumeHTML = "\n        <h2>Shareable Resume</h2>\n        <img src=\"".concat(profilePicBase64, "\" alt=\"Profile Picture\" style=\"max-width: 150px; border-radius: 50%;\">\n        <h3>Personal Information</h3>\n        <p><b>Full Name:</b> <span contenteditable=\"true\">").concat(name, "</span></p>\n        <p><b>Email:</b> <span contenteditable=\"true\">").concat(email, "</span></p>\n        <p><b>Phone:</b> <span contenteditable=\"true\">").concat(phone, "</span></p>\n        <h3>Education</h3>\n        <p contenteditable=\"true\">").concat(education, "</p>\n        <h3>Experience</h3>\n        <p contenteditable=\"true\">").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p contenteditable=\"true\">").concat(skills, "</p>\n    ");
    // Display the generated resume
    resumeDisplayElement.innerHTML = resumeHTML;
    // Generate a shareable URL with the username only
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username));
    // Display the shareable link
    shareableLinkContainer.style.display = 'block';
    shareableLinkElement.href = shareableURL;
    shareableLinkElement.textContent = shareableURL;
});
// Handle PDF download
downloadPdfButton.addEventListener('click', function () {
    window.print(); // This will open the print dialog and allow the user to save as PDF
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
            document.getElementById('username').value = username;
            document.getElementById('name').value = resumeData.name;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('phone').value = resumeData.phone;
            document.getElementById('education').value = resumeData.education;
            document.getElementById('experience').value = resumeData.experience;
            document.getElementById('skills').value = resumeData.skills;
            if (resumeData.profilePicBase64) {
                profilePicPreview.src = resumeData.profilePicBase64;
                profilePicPreview.style.display = 'block';
            }
        }
    }
});
