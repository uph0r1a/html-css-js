document.getElementById("addBtn").addEventListener("click", () => {
  const input = document.getElementById("task_input");
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const done = document.createElement("button");
  done.textContent = "Complete";
  done.addEventListener("click", () => {
    span.classList.toggle("completed");
  });

  const del = document.createElement("button");
  del.textContent = "Delete";
  del.addEventListener("click", () => {
    li.remove();
  });

  li.append(span, done, del);
  document.getElementById("list").appendChild(li);

  input.value = "";
});
