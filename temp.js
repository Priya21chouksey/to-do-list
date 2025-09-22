const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load tasks from local storage : the task will remain even after refreshing the page 
window.onload = () => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => renderTask(task.text, task.completed));
};

// Add new task
addBtn.addEventListener("click", () => addTask());
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  renderTask(text, false);
  saveTask(text, false);
  taskInput.value = "";
}

// Render task
function renderTask(text, completed) {
  const li = document.createElement("li");
  if (completed) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = text;
  span.addEventListener("click", () => toggleComplete(span));

  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.addEventListener("click", () => deleteTask(delBtn));

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Save task
function saveTask(text, completed) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Toggle complete
function toggleComplete(el) {
  const li = el.parentElement;
  li.classList.toggle("completed");
  updateLocalStorage();
}

// Delete task
function deleteTask(button) {
  button.parentElement.remove();
  updateLocalStorage();
}

// Update local storage
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.querySelector("span").innerText,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
