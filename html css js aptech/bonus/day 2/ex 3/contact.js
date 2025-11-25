document.getElementById("back-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let message = document.getElementById("message").value.trim();
  let error = document.getElementById("error");

  if (name === "" || email === "" || message === "") {
    error.innerText = "All fields must be filled out.";
  } else {
    error.style.color = "green";
    error.innerText = "Form submitted successfully!";
  }
});
