let user = [];
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const tbody = document.getElementById("tbody");
let count = 1;

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
  } else {
    user.push({
      id: count,
      name,
      email,
    });

    renderTable();
    nameInput.value = "";
    emailInput.value = "";
    count++;
  }
});

function renderTable() {
  tbody.innerHTML = "";

  user.filter((u, index) => {
    u.id = index + 1;

    const tr = document.createElement("tr");

    const tdid = document.createElement("td");
    tdid.textContent = u.id;

    const tdname = document.createElement("td");
    tdname.textContent = u.name;

    const tdemail = document.createElement("td");
    tdemail.textContent = u.email;

    const tddel = document.createElement("td");
    const del = document.createElement("del");
    del.textContent = "Delete";
    tddel.appendChild(del);

    del.addEventListener("click", () => {
      user = user.filter((item) => item !== p);
      renderTable();
    });

    tr.appendChild(tdid);
    tr.appendChild(tdname);
    tr.appendChild(tdemail);
    tr.appendChild(tddel);

    tbody.appendChild(tr);
  });

  count = user.length + 1;
}
