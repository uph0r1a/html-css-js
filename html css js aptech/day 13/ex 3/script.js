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
    if (todo.completed) li.classList.add("completed");

    const span = document.createElement("span");
    span.textContent = todo.text;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Sửa";
    editBtn.className = "edit-btn";
    editBtn.disabled = todo.completed;
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

    const finishBtn = document.createElement("button");
    finishBtn.textContent = "Hoàn thành";
    finishBtn.className = "finish-btn";
    finishBtn.disabled = todo.completed;
    finishBtn.addEventListener("click", () => {
      todo.completed = true;
      renderTodos();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    li.appendChild(finishBtn);
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
    editingId = null;
    addBtn.textContent = "Thêm";
  } else {
    todos.push({ id: Date.now(), text: value, completed: false });
  }

  inputEl.value = "";
  renderTodos();
});
