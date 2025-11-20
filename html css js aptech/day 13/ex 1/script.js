const form = document.getElementById("form");
const list = document.getElementById("list");
const inputEl = document.getElementById("value");
let todos = [];
let count = 1;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = inputEl.value.trim();
  if (!inputValue) return;

  todos.push({
    id: count,
    text: inputValue,
  });

  const li = document.createElement("li");
  li.textContent = inputValue;
  list.appendChild(li);

  inputEl.value = "";
  count++;
});
