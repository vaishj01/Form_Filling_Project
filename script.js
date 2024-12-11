// Selecting form elements
const form = document.getElementById("insurance-form");
const inputs = document.querySelectorAll("input, select, textarea");
const submitButton = document.querySelector("#submit-button");

// Function to validate the form
function validateForm() {
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim() && input.hasAttribute("required")) {
            input.classList.add("error");
            isValid = false;
        } else {
            input.classList.remove("error");
        }
    });

    return isValid;
}

// Adding real-time validation for inputs
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        if (input.value.trim()) {
            input.classList.remove("error");
        }
    });
});

// Function to process form submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Validate the form
    if (validateForm()) {
        const formData = new FormData(form);

        // Extract form data for submission or further processing
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log("Form Submitted:", data);
        alert("Form Submitted Successfully!");

        // Optionally, clear the form after submission
        form.reset();
    } else {
        alert("Please fill out all required fields.");
    }
});

// Voice input integration (Whisper model simulation)
const voiceInputButton = document.querySelector("#voice-input");
const outputField = document.querySelector("#voice-output");

voiceInputButton.addEventListener("click", () => {
    alert("Voice input functionality triggered!");
    // Simulating a placeholder action for Whisper integration
    // Replace this with actual Whisper model API/SDK integration
    const simulatedSpeechText = "John Doe, 1234567890, Health Insurance";
    outputField.value = simulatedSpeechText;
    alert("Voice input received: " + simulatedSpeechText);
});

// Add additional logic for dynamic form behaviors (if any)
