const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const rememberme = document.getElementById("rememberme");

let adminAccount = {
  email: "admin@example.com",
  password: "123456",
};
localStorage.setItem("Account", JSON.stringify(adminAccount));

const account = JSON.parse(localStorage.getItem("Account"));
const rememberedAccount = JSON.parse(localStorage.getItem("Remember account"));

if (rememberedAccount) {
  setTimeout(() => {
    emailInput.value = rememberedAccount.email;
    passwordInput.value = rememberedAccount.password;
    rememberme.checked = true;
  }, 1000);
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
    alert("Password must be atleast 6 characters");
    return;
  }

  if (email !== account.email || password !== account.password) {
    alert("Invalid email or password");
  } else {
    if (rememberme.checked) {
      let rememberAccount = {
        email: email,
        password: password,
      };
      localStorage.setItem("Remember account", JSON.stringify(rememberAccount));
    }
    sessionStorage.setItem("isLogin", "true");
    window.location.href = "dashboard.html";
  }
});
