function isValidEmail(email) {
    // Basic email validation regex (you can use a more robust one)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showAlert(message) {
    const alertBox = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    alertBox.style.display = "block";

    const closeButton = alertBox.querySelector(".close-button");
    closeButton.addEventListener("click", () => {
        alertBox.style.display = "none";
    });

        // Close the alert if the user clicks outside the content area
    alertBox.addEventListener("click", (event) => {
        if (event.target === alertBox) {
            alertBox.style.display = "none";
        }
    });
}

// Basic form validation
function form_validation() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            // Perform form validation here (e.g., check for empty fields)
            let isValid = true; // Assume valid initially

            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === "") {
                alert("Name is required.");
                isValid = false;
            }

            const emailInput = document.getElementById('email');
            if (emailInput.value.trim() === "") {
                alert("Email is required.");
                isValid = false;
            } else if (!isValidEmail(emailInput.value)) { // Basic email validation
                alert("Invalid email format.");
                isValid = false;
            }

            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === "") {
                alert("Message is required.");
                isValid = false;
            }
            if (isValid) {
                // If validation passes, you would typically send the form data to a server here.
                // For this example, we'll just display a success message:
                showAlert("Message sent!");
                form.reset();
            }
        });
    }
}



form_validation();