const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    if (username === "") {
        alert("Username must not be empty");
        return;
    }

    if (password.length < 6) {
        alert("Password must have at least 6 characters");
        return;
    }

    alert(`Welcome, ${username}!`);
})