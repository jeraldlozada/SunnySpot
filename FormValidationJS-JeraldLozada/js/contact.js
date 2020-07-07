"use strict";

// Get reference to the form
const conForm = document.getElementById("contact-form");

// Check that the form exists before you use it
if (conForm) {

    // Disable HTML5 validation - "novalidate" is a boolean attribute
    conForm.setAttribute("novalidate", "");

    // Add an event listener for the form's submit event (NOTE: not the click event of the submit button!)
    conForm.addEventListener("submit", (event) => {
    
        // Error message list
        let errorMessages = [];

        // Get reference to the error area
        const errorArea = document.getElementById("error-area");

        // Clear previous error messages
        errorArea.innerHTML = "";

        // Get references to the form fields
        let firstNameValue = conForm.elements["firstName"].value.trim();
        let lastNameValue = conForm.elements["lastName"].value.trim();
        let emailValue = conForm.elements["email"].value.trim();
        let phoneValue = conForm.elements["phone"].value.trim();
        let mobileValue = conForm.elements["mobile"].value.trim();
        let commentValue = conForm.elements["comment"].value.trim();

        // Check all required fields
        if (firstNameValue === "" || lastNameValue === "" || emailValue === "" || (phoneValue === "" && mobileValue === "") || commentValue === "") {

            // Stop form from submitting (cancel the submit event)
            event.preventDefault();

            // Display error message
            errorArea.innerHTML += `<p>Enter all required fields (first & last name, email address, either a phone or mobile number and a comment).</p>`;

            // Stop checking validation (stop the function)
            return;

        }

        // Check first name
        if (firstNameValue.length < 2) {

            // Add error message to the list
            errorMessages.push("First name must be 2 or more characters.");

        }

        // Check last name
        if (lastNameValue.length < 2) {
            errorMessages.push("Last name must be 2 or more characters.");
        }
        // Define a regular expression (regex) for a phone number
        const phoneRegex = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){8,15}$/;

        // Test phone number against the regex pattern
        if (phoneValue !== "" && !phoneRegex.test(phoneValue)) {
            errorMessages.push("Phone number has to have 8 to 15 characters");
        }

        // Define a regular expression (regex) for a mobile number
        const mobileRegex = /^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9])?( ?-?[0-9]){10,12}$/;

        // Test mobile number against the regex pattern
        if (mobileValue !== "" && !mobileRegex.test(mobileValue)) {
            errorMessages.push("Mobile number has to have 10 to 12 characters");
        }

        // Define a regular expression (regex) for a valid email address
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // Test email against the regex pattern
        if (!emailRegex.test(emailValue)) {
            errorMessages.push("Email does not appear to be valid.");
        }

        // Test if an option is selected for the age
        if(conForm.querySelector('input[name="age"]:checked') == null) {
            errorMessages.push("Select an option for your age");
        }

        //  Test if an option is selected for the gender
        if(conForm.querySelector('input[name="gender"]:checked') == null) {
            errorMessages.push("Select an option for your gender");
        }

        // Test to see if the comment has at least 10 characters
        if (commentValue.length < 10) {
            errorMessages.push("Comment should be at least 10 characters");
        }

        if (errorMessages.length > 0) {
            
            // Stop form from submitting (cancel the submit event)
            event.preventDefault();

            // Display all error messages
            errorArea.innerHTML += `<ul><li>${errorMessages.join("</li><li>")}</li></ul>`;

        }


    });

}