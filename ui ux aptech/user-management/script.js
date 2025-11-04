const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const genderSelect = document.getElementById("gender");
const userList = document.getElementById("userList");
const submitBtn = document.getElementById("submitBtn");

let users = [];
let editId = null;

// Render danh sách
function renderUsers() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.age}</td>
      <td>${user.gender}</td>
      <td>
        <button class="edit-btn" onclick="editUser('${user.id}')">Sửa</button>
        <button class="delete-btn" onclick="deleteUser('${user.id}')">Xóa</button>
      </td>
    `;
    userList.appendChild(tr);
  });
}

// Thêm hoặc cập nhật
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const age = ageInput.value.trim();
  const gender = genderSelect.value;

  if (!name || !email || !age || !gender) return;

  if (editId) {
    // cập nhật user có id tương ứng
    users = users.map((u) =>
      u.id === editId ? { ...u, name, email, age, gender } : u
    );
    editId = null;
    submitBtn.textContent = "Thêm";
  } else {
    // thêm user mới với id ngẫu nhiên
    users.push({
      id: Math.random().toString(36).slice(2),
      name,
      email,
      age,
      gender,
    });
  }

  form.reset();
  renderUsers();
});

// Sửa user
function editUser(id) {
  const user = users.find((u) => u.id === id);
  if (!user) return;

  nameInput.value = user.name;
  emailInput.value = user.email;
  ageInput.value = user.age;
  genderSelect.value = user.gender;

  editId = id;
  submitBtn.textContent = "Cập nhật";
}

// Xóa user
function deleteUser(id) {
  if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
    users = users.filter((u) => u.id !== id);
    renderUsers();
  }
}
