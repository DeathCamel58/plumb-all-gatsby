document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Use grecaptcha.ready to ensure reCAPTCHA is loaded
    grecaptcha.ready(function() {
        // Request reCAPTCHA v3 verification
        grecaptcha.execute("6LduBK0UAAAAAGHy00BaEEo_I-I78xmEhGL6xBpW", { action: 'submit' }).then(function(token) {
            // Add the reCAPTCHA token to your form data
            const formData = new FormData(document.getElementById("contactForm"));
            formData.append("g-recaptcha-response", token);

            // Send the form data to your server for processing (AJAX or form submission)
            // Example: You can use fetch to send the data to your server
            fetch("https://workers.plumb-all.com/contactForm", {
                method: "POST",
                body: formData,
            })
                .then(response => response.json())
                .catch(error => {
                    console.error("Error:", error);
                });
            document.getElementById("formCover").classList.remove("invisible");
        });
    });
});
