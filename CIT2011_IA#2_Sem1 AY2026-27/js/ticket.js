
/* ==========================================
   CODING CONF 2026 - TICKET GENERATION
========================================== */

// Retrieve registration information
const savedRegistration = localStorage.getItem("codingConfRegistration");

// Redirect visitors who have not registered
if (!savedRegistration) {

    window.location.replace("index.html");

} else {

    // Convert saved information into a JavaScript object
    const registrationData = JSON.parse(savedRegistration);

    // Get ticket elements
    const confirmationHeading = document.getElementById("confirmationHeading");
    const ticketName = document.getElementById("ticketName");
    const ticketGithub = document.getElementById("ticketGithub");
    const ticketAvatar = document.getElementById("ticketAvatar");
    const ticketNumber = document.getElementById("ticketNumber");

    // Generate a unique-looking ticket number if missing
    // or if the default placeholder is still present
    if (
        !registrationData.ticketNumber ||
        registrationData.ticketNumber === "#00000" ||
        registrationData.ticketNumber === "#01609"
    ) {

        const randomNumber = Math.floor(10000 + Math.random() * 90000);

        registrationData.ticketNumber = "#" + randomNumber;

        // Save the updated registration information
        localStorage.setItem(
            "codingConfRegistration",
            JSON.stringify(registrationData)
        );
    }

    // Display attendee's name
    confirmationHeading.textContent =
        `Congrats, ${registrationData.fullName}! Your ticket is ready.`;

    ticketName.textContent = registrationData.fullName;

    // Display ticket number
    ticketNumber.textContent = registrationData.ticketNumber;

    // Display GitHub username and profile link
    ticketGithub.textContent = registrationData.github;

    const githubUsername = registrationData.github.substring(1);

    ticketGithub.href =
        `https://github.com/${encodeURIComponent(githubUsername)}`;

    // Display uploaded avatar
    ticketAvatar.src = registrationData.avatar;

}
