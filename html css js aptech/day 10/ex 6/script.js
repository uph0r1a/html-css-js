const addBtn = document.getElementById("add");
const showBtn = document.getElementById("show");
const formContainer = document.getElementById("form-container");
const tableContainer = document.getElementById("table-container");

let userList = [];
let count = 1;

function showAddForm(editUser = null) {
  formContainer.innerHTML = `
        <form class="register-form">
            <h2>Thông tin nhân viên</h2>
            <label>Họ tên:</label>
            <input type="text" id="name" required value="${
              editUser ? editUser.name : ""
            }">
            
            <label>Tuổi:</label>
            <input type="number" id="age" min="18" max="65" required value="${
              editUser ? editUser.age : ""
            }">
            
            <label>Giới tính:</label>
            <input type="radio" name="gender" value="Nam" ${
              editUser && editUser.gender === "Nam" ? "checked" : ""
            }> Nam
            <input type="radio" name="gender" value="Nữ" ${
              editUser && editUser.gender === "Nữ" ? "checked" : ""
            }> Nữ
            
            <label>Vị trí:</label>
            <select id="position" required>
                <option value="Kế toán" ${
                  editUser && editUser.position === "Kế toán" ? "selected" : ""
                }>Kế toán</option>
                <option value="Lập trình viên" ${
                  editUser && editUser.position === "Lập trình viên"
                    ? "selected"
                    : ""
                }>Lập trình viên</option>
                <option value="Quản lý" ${
                  editUser && editUser.position === "Quản lý" ? "selected" : ""
                }>Quản lý</option>
            </select>
            
            <label>Ghi chú:</label>
            <textarea id="note" maxlength="300">${
              editUser ? editUser.note : ""
            }</textarea>
            
            <button id="submit">${
              editUser ? "Cập nhật nhân viên" : "Thêm nhân viên"
            }</button>
            <input type="reset" value="Nhập lại">
        </form>
    `;
  tableContainer.innerHTML = "";

  document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const genderInput = document.querySelector('input[name="gender"]:checked');
    const gender = genderInput ? genderInput.value : "";
    const position = document.getElementById("position").value;
    const note = document.getElementById("note").value.trim();

    if (!name || !age || !gender || !position) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (editUser) {
      editUser.name = name;
      editUser.age = age;
      editUser.gender = gender;
      editUser.position = position;
      editUser.note = note;
      alert("Cập nhật thành công!");
    } else {
      userList.push({ id: count++, name, age, gender, position, note });
      alert("Thêm nhân viên thành công!");
    }
    formContainer.innerHTML = "";
    showTable();
  });
}

function showTable() {
  if (userList.length === 0) {
    tableContainer.innerHTML = "<p>Chưa có nhân viên nào.</p>";
    return;
  }

  let tableHTML = `<table>
        <thead>
            <tr>
                <th>STT</th>
                <th>Mã NV</th>
                <th>Họ tên</th>
                <th>Tuổi</th>
                <th>Giới tính</th>
                <th>Vị trí</th>
                <th>Ghi chú</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>`;

  userList.forEach((u, index) => {
    tableHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${u.id}</td>
                <td>${u.name}</td>
                <td>${u.age}</td>
                <td>${u.gender}</td>
                <td>${u.position}</td>
                <td>${u.note}</td>
                <td>
                    <button class="edit" data-id="${u.id}">Sửa</button>
                    <button class="delete" data-id="${u.id}">Xóa</button>
                </td>
            </tr>
        `;
  });

  tableHTML += `</tbody></table>`;
  tableContainer.innerHTML = tableHTML;

  document.querySelectorAll(".edit").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      const editUser = userList.find((u) => u.id === id);
      if (editUser) showAddForm(editUser);
    });
  });

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = parseInt(btn.dataset.id);
      if (confirm("Bạn có chắc muốn xoá nhân viên này?")) {
        userList = userList.filter((u) => u.id !== id);
        showTable();
      }
    });
  });
}

addBtn.addEventListener("click", () => showAddForm());
showBtn.addEventListener("click", () => showTable());
