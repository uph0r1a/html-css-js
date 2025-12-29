const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

const allTask = [];

document.getElementById("btn").addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task === "") return;

    allTask.push(task);
    taskInput.value = "";
    renderTasks();
});

const renderTasks = () => {
    taskList.innerHTML = "";

    allTask.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task;

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            const newTask = prompt("Edit your task:", task);
            if (newTask !== null && newTask.trim() !== "") {
                allTask[index] = newTask.trim();
                renderTasks();
            }
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            allTask.splice(index, 1);
            renderTasks();
        });

        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}
