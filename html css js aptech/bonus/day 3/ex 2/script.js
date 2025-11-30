let users = []; // Array to store user objects
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const tbody = document.getElementById("tbody");

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (name === "" || email === "") {
    alert("Name and email must not be empty");
    return;
  }
  if (!emailPattern.test(email)) {
    alert("Invalid email");
    return;
  }

  users.push({ name, email });

  renderTable();

  nameInput.value = "";
  emailInput.value = "";
});

function renderTable() {
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    user.id = index + 1;

    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = user.id;

    const tdName = document.createElement("td");
    tdName.textContent = user.name;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;

    const tdAction = document.createElement("td");
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", () => {
      users = users.filter((u) => u !== user);
      renderTable();
    });
    tdAction.appendChild(delBtn);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAction);

    tbody.appendChild(tr);
  });
}