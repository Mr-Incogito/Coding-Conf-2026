
// ==========================================
// CODING CONF 2026 - FORM VALIDATION
// ==========================================

// Get the registration form
const registrationForm = document.getElementById("registrationForm");

// Get all form input elements
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const github = document.getElementById("github");
const avatar = document.getElementById("avatar");

// Display an error message
function showError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Clear an error message
function clearError(elementId) {
    document.getElementById(elementId).textContent = "";
}

// Convert uploaded image into a Data URL
function convertImageToDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function () {
            resolve(reader.result);
        };

        reader.onerror = function () {
            reject(new Error("Unable to read the uploaded image."));
        };

        reader.readAsDataURL(file);
    });
}

// Validate the registration form
function validateForm() {
    let isValid = true;

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const githubValue = github.value.trim();
    const avatarFile = avatar.files[0];

    // Clear previous error messages
    clearError("nameError");
    clearError("emailError");
    clearError("githubError");
    clearError("avatarError");

    // Full Name Validation
    if (nameValue === "") {
        showError("nameError", "Please enter your full name.");
        isValid = false;
    }

    // Email Validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(emailValue)) {
        showError("emailError", "Please enter a valid email address.");
        isValid = false;
    }

    // GitHub Username Validation
    const githubPattern = /^@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,38})$/;

    if (!githubPattern.test(githubValue)) {
        showError("githubError", "Username must begin with @ and contain a valid username.");
        isValid = false;
    }

    // Avatar Upload Validation
    if (!avatarFile) {
        showError("avatarError", "Please upload an avatar image.");
        isValid = false;
    } else {
        const allowedTypes = ["image/jpeg", "image/png"];

        if (!allowedTypes.includes(avatarFile.type)) {
            showError("avatarError", "Only JPG and PNG images are allowed.");
            isValid = false;
        }

        if (avatarFile.size >= 500 * 1024) {
            showError("avatarError", "Image must be smaller than 500KB.");
            isValid = false;
        }
    }

    return isValid;
}

// Intercept form submission
registrationForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    // Stop if validation fails
    if (!validateForm()) {
        return;
    }

    const avatarFile = avatar.files[0];

    try {
        // Convert avatar to a format that can be stored
        const avatarData = await convertImageToDataURL(avatarFile);

        // Create registration information
        const registrationData = {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            github: github.value.trim(),
            avatar: avatarData
        };

        // Save registration information
        localStorage.setItem(
            "codingConfRegistration",
            JSON.stringify(registrationData)
        );

        // Navigate to the ticket page
        window.location.href = "ticket.html";

    } catch (error) {
        showError("avatarError", "There was a problem uploading your image.");
    }

});
