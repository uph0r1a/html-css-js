const { use } = require("react");

const login = document.getElementById("login");
const email_input = document.getElementById("email");
const password_input = document.getElementById("password");
const btn = document.getElementById("btn");

const account = [
  { email: "admin@gmail.com", password: "123456", role: "admin" },
];

login.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = email_input.value.trim();
  const password = password_input.value.trim();

  const user = account.find(
    (acc) => acc.email === email && acc.password === password
  );

  if (!user) {
    alert("Wrong email or password");
    return;
  }

  sessionStorage.setItem("currentUser",JSON.stringify(user));

  window.location.href = "dashboard.html";
});
