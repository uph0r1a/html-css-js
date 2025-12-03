const scrollBtn = document.createElement("button");
scrollBtn.id = "scrollTop";
scrollBtn.textContent = "↑";
document.body.appendChild(scrollBtn);

window.addEventListener("scroll", () => {
  scrollBtn.style.display =
    document.documentElement.scrollTop > 100 ? "block" : "none";
});

scrollBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberme = document.getElementById("rememberme");

let accounts = JSON.parse(localStorage.getItem("Account")) || [];

if (accounts.length === 0) {
  const adminAccount = {
    id: Date.now(),
    accountName: "",
    accountEmail: "admin@example.com",
    accountRole: "Admin",
    accountRegisteredDate: "",
    password: "123456",
  };

  accounts.push(adminAccount);
  localStorage.setItem("Account", JSON.stringify(accounts));
}

const remembered = JSON.parse(localStorage.getItem("Remember account"));

if (remembered) {
  emailInput.value = remembered.email;
  passwordInput.value = remembered.password;
  rememberme.checked = true;
}

if (sessionStorage.getItem("isLogin") === "true") {
  window.location.href = "dashboard.html";
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailPattern.test(email)) {
    alert("Invalid email format");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  const account = accounts.find(
    (acc) => acc.accountEmail === email && acc.password === password
  );

  if (!account) {
    alert("Invalid email or password");
    return;
  }

  if (rememberme.checked) {
    localStorage.setItem(
      "Remember account",
      JSON.stringify({ email, password })
    );
  } else {
    localStorage.removeItem("Remember account");
  }

  sessionStorage.setItem("isLogin", "true");
  window.location.href = "dashboard.html";
});
