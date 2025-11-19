const saveBtn = document.getElementById("saveBtn");
const clearBtn = document.getElementById("clearBtn");

saveBtn.addEventListener("click", () => {
  localStorage.setItem("name", "ten");
  alert("Đã lưu người dùng!");
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("name");
  alert("Đã xóa người dùng!");
});
