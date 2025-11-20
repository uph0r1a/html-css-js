const userForm = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const submitBtn = document.getElementById("submitBtn");
const userTableBody = document.getElementById("userTableBody");

let users = [];
let editingId = null;

function renderTable() {
  userTableBody.innerHTML = "";
  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.age}</td>
            <td>${user.gender}</td>
            <td>
                <button class="edit-btn" data-id="${user.id}">Sửa</button>
                <button class="delete-btn" data-id="${user.id}">Xóa</button>
            </td>
        `;

    tr.querySelector(".edit-btn").addEventListener("click", () => {
      nameInput.value = user.name;
      emailInput.value = user.email;
      ageInput.value = user.age;
      genderInput.value = user.gender;
      submitBtn.textContent = "Cập nhật";
      editingId = user.id;
    });

    tr.querySelector(".delete-btn").addEventListener("click", () => {
      users = users.filter((u) => u.id !== user.id);
      renderTable();
    });

    userTableBody.appendChild(tr);
  });
}

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const age = parseInt(ageInput.value);
  const gender = genderInput.value;

  if (!name || !email || !age || !gender) return;

  if (editingId) {
    const user = users.find((u) => u.id === editingId);
    if (user) {
      user.name = name;
      user.email = email;
      user.age = age;
      user.gender = gender;
    }
    editingId = null;
    submitBtn.textContent = "Thêm";
  } else {
    users.push({ id: Date.now(), name, email, age, gender });
  }

  userForm.reset();
  renderTable();
});
