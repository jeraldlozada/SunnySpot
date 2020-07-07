"use strict";

// Get reference to the form
const logForm = document.getElementById("login-form");

if (logForm) {

    // Disable HTML5 validation - "novalidate" is a boolean attribute
    logForm.setAttribute("novalidate", "");

    // Add an event listener for the form's submit event (NOTE: not the click event of the submit button!)
    logForm.addEventListener("submit", (event) => {
    
        // Error message list
        let errorMessages = [];

        // Get reference to the error area
        const errorArea = document.getElementById("error-area");

        // Clear previous error messages
        errorArea.innerHTML = "";

        // Get references to the form fields
        let username = logForm.elements["txtUserName"].value.trim();
        let password = logForm.elements["txtPassword"].value.trim();
        
        // Check all required fields
        if (username === "" || password === "") {

            // Stop form from submitting (cancel the submit event)
            event.preventDefault();

            // Display error message
            errorArea.innerHTML += `<p>Enter both username and password.</p>`;

            // Stop checking validation (stop the function)
            return;

        }

        // Regular expression for username that only contains alphanumerir characters, underscore and dot.
        // Underscore and dot can start or end and they can't be next to each other or used multiple times in a row
        // Characters are between 5 to 30. Added some other stuff just for the fun of it :)

        const usernameRegex = /^(?=[a-zA-Z0-9._]{5,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        if (!usernameRegex.test(username)) {
            errorMessages.push("Username must be between 5 and 30 characters");
        }

        // Regular expression for password with at least 8 characters, at least 1 letter, 1 number and 1 special character.
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            errorMessages.push("Password must have at least 8 characters, at least 1 letter, 1 digit and 1 special character");
        }

        if (errorMessages.length > 0) {
            
            // Stop form from submitting (cancel the submit event)
            event.preventDefault();

            // Display all error messages
            errorArea.innerHTML += `<ul><li>${errorMessages.join("</li><li>")}</li></ul>`;

        }


    });

}