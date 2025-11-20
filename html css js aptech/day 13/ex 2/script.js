const form = document.getElementById("form");
const list = document.getElementById("list");
const inputEl = document.getElementById("value");
const addBtn = document.getElementById("button");

let todos = [];
let editingId = null;

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = todo.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Sửa";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
      inputEl.value = todo.text;
      addBtn.textContent = "Cập nhật";
      editingId = todo.id;
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Xóa";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputEl.value.trim();
  if (!value) return;

  if (editingId !== null) {
    const todo = todos.find((t) => t.id === editingId);
    if (todo) todo.text = value;
    addBtn.textContent = "Thêm";
    editingId = null;
  } else {
    todos.push({ id: Date.now(), text: value });
  }

  inputEl.value = "";
  renderTodos();
});
