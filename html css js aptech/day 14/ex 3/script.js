const form = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInputs = document.getElementsByName("gender");
const positionSelect = document.getElementById("position");
const noteInput = document.getElementById("note");
const submitBtn = document.getElementById("submitBtn");
const employeeList = document.getElementById("employeeList");

let employees = [];
let editId = null;

function renderEmployees() {
  employeeList.innerHTML = "";
  employees.forEach((emp, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${emp.id}</td>
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.gender}</td>
      <td>${emp.position}</td>
      <td>${emp.note}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editEmployee('${
          emp.id
        }')">Sửa</button>
        <button class="action-btn delete-btn" onclick="deleteEmployee('${
          emp.id
        }')">Xóa</button>
      </td>
    `;
    employeeList.appendChild(tr);
  });
}

function getSelectedGender() {
  for (const input of genderInputs) {
    if (input.checked) return input.value;
  }
  return "";
}

function resetForm() {
  form.reset();
  editId = null;
  submitBtn.textContent = "Thêm";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const age = Number(ageInput.value);
  const gender = getSelectedGender();
  const position = positionSelect.value;
  const note = noteInput.value.trim();

  if (!name || !age || !gender || !position) return;

  if (editId) {
    employees = employees.map((emp) =>
      emp.id === editId ? { ...emp, name, age, gender, position, note } : emp
    );
  } else {
    employees.push({
      id: Date.now().toString(),
      name,
      age,
      gender,
      position,
      note,
    });
  }

  resetForm();
  renderEmployees();
});

function editEmployee(id) {
  const emp = employees.find((emp) => emp.id === id);
  if (!emp) return;

  nameInput.value = emp.name;
  ageInput.value = emp.age;
  for (const input of genderInputs) {
    input.checked = input.value === emp.gender;
  }
  positionSelect.value = emp.position;
  noteInput.value = emp.note;

  editId = id;
  submitBtn.textContent = "Cập nhật";
}

function deleteEmployee(id) {
  if (confirm("Bạn có chắc muốn xóa nhân viên này?")) {
    employees = employees.filter((emp) => emp.id !== id);
    renderEmployees();
  }
}

renderEmployees();
