const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

let taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = null;

const removeSpecialChars = (val) => val.trim().replace(/[^A-Za-z0-9\-\s]/g, "");

const saveToLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify(taskData));
};

const resetForm = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  addOrUpdateTaskBtn.innerText = "Add Task";
  currentTask = null;
  taskForm.classList.add("hidden");
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(({ id, title, date, description }) => {
    const taskDiv = document.createElement("div");
    taskDiv.className = "task";
    taskDiv.id = id;
    taskDiv.innerHTML = `
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Date:</strong> ${
              date ? new Date(date).toLocaleDateString() : "N/A"
            }</p>
            <p><strong>Description:</strong> ${description}</p>
            <button type="button" class="btn edit-btn">Edit</button>
            <button type="button" class="btn delete-btn">Delete</button>
        `;
    tasksContainer.appendChild(taskDiv);
  });
};

const addOrUpdateTask = () => {
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }

  const taskObj = {
    id: currentTask
      ? currentTask.id
      : `${removeSpecialChars(titleInput.value)
          .toLowerCase()
          .split(" ")
          .join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  };

  if (currentTask) {
    taskData = taskData.map((task) =>
      task.id === currentTask.id ? taskObj : task
    );
  } else {
    taskData.unshift(taskObj);
  }

  saveToLocalStorage();
  updateTaskContainer();
  resetForm();
};

const deleteTask = (taskId) => {
  taskData = taskData.filter((task) => task.id !== taskId);
  saveToLocalStorage();
  updateTaskContainer();
};

const editTask = (taskId) => {
  const task = taskData.find((t) => t.id === taskId);
  if (!task) return;

  currentTask = task;
  titleInput.value = task.title;
  dateInput.value = task.date;
  descriptionInput.value = task.description;
  addOrUpdateTaskBtn.innerText = "Update Task";
  taskForm.classList.remove("hidden");
};

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.remove("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const unsavedChanges =
    titleInput.value || dateInput.value || descriptionInput.value;
  const changedValues =
    !currentTask ||
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;

  if (unsavedChanges && changedValues) {
    confirmCloseDialog.showModal();
  } else {
    resetForm();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  resetForm();
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addOrUpdateTask();
});

tasksContainer.addEventListener("click", (e) => {
  const taskDiv = e.target.closest(".task");
  if (!taskDiv) return;

  if (e.target.classList.contains("edit-btn")) {
    editTask(taskDiv.id);
  } else if (e.target.classList.contains("delete-btn")) {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask(taskDiv.id);
    }
  }
});

if (taskData.length) updateTaskContainer();
