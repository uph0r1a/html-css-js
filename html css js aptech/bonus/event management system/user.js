const scrollBtn = document.getElementById("scrollTop");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});
scrollBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

const accountNameInput = document.getElementById("name");
const accountEmailInput = document.getElementById("email");
const accountRoleInput = document.getElementById("role");
const accountRegisteredDateInput = document.getElementById("registeredDate");
const addBtn = document.getElementById("add");
const tbody = document.getElementById("tbody");

const roleSearch = document.getElementById("roleSearch");
const emailSearch = document.getElementById("emailSearch");

function checkLogin() {
  if (sessionStorage.getItem("isLogin") !== "true") {
    window.location.href = "login.html";
  }
}
checkLogin();
setInterval(checkLogin, 500);

document
  .getElementById("dashBoard")
  .addEventListener("click", () => (window.location.href = "dashboard.html"));

document.getElementById("logout").addEventListener("click", () => {
  sessionStorage.setItem("isLogin", "false");
  window.location.href = "login.html";
});

let accounts = JSON.parse(localStorage.getItem("Account") || "[]").map((a) => ({
  id: a.id || Date.now(),
  accountName: a.accountName || a.name || "Unknown",
  accountEmail: a.accountEmail || a.email || "",
  accountRole: a.accountRole || a.role || "User",
  accountRegisteredDate: a.accountRegisteredDate || a.registeredDate || "",
  password: a.password || "123456",
}));

localStorage.setItem("Account", JSON.stringify(accounts));

let editId = null;

function renderAccounts(list = accounts) {
  tbody.innerHTML = "";

  list.forEach((a) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${a.id}</td>
      <td>${a.accountName}</td>
      <td>${a.accountEmail}</td>
      <td>${a.accountRole}</td>
      <td>${a.accountRegisteredDate}</td>
      <td>
        <button class="change">Change</button>
        <button class="delete">Delete</button>
      </td>
    `;

    tr.querySelector(".change").addEventListener("click", () => {
      editId = a.id;
      accountNameInput.value = a.accountName;
      accountEmailInput.value = a.accountEmail;
      accountRoleInput.value = a.accountRole;
      accountRegisteredDateInput.value = a.accountRegisteredDate;

      addBtn.textContent = "Confirm";
    });

    tr.querySelector(".delete").addEventListener("click", () => {
      if (!confirm("Delete this account?")) return;

      accounts = accounts.filter((x) => x.id !== a.id);
      localStorage.setItem("Account", JSON.stringify(accounts));
      renderAccounts();
    });

    tbody.appendChild(tr);
  });
}

renderAccounts();

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const accountName = accountNameInput.value.trim();
  const accountEmail = accountEmailInput.value.trim();
  const accountRole = accountRoleInput.value.trim();
  const accountRegisteredDate = accountRegisteredDateInput.value.trim();

  if (!accountName || !accountEmail || !accountRole || !accountRegisteredDate)
    return alert("All fields are required");

  if (editId) {
    accounts = accounts.map((a) =>
      a.id === editId
        ? {
            ...a,
            accountName,
            accountEmail,
            accountRole,
            accountRegisteredDate,
          }
        : a
    );

    addBtn.textContent = "Add";
    editId = null;
  } else {
    accounts.push({
      id: Date.now(),
      accountName,
      accountEmail,
      accountRole,
      accountRegisteredDate,
      password: "123456",
    });
  }

  localStorage.setItem("Account", JSON.stringify(accounts));
  renderAccounts();
  e.target.reset();
});

document.getElementById("search").addEventListener("submit", (e) => {
  e.preventDefault();

  const r = roleSearch.value;
  const email = emailSearch.value.trim().toLowerCase();

  let filtered = accounts;

  if (r !== "All") filtered = filtered.filter((a) => a.accountRole === r);
  if (email)
    filtered = filtered.filter((a) =>
      a.accountEmail.toLowerCase().includes(email)
    );

  renderAccounts(filtered);
});
