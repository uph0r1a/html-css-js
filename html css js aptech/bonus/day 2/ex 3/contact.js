function goBack() {
    window.location.href = "index.html";
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let error = document.getElementById("error");

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
        error.innerText = "All fields must be filled out.";
    } else if (!emailPattern.test(email)) {
        error.innerText = "Please enter a valid email.";
    } else {
        error.style.color = "green";
        error.innerText = "Form submitted successfully!";
    }
});
