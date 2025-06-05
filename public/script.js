let token = "";

async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  const res = await fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  alert(data.message);
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  token = data.token;
  alert(data.message);
}

async function createTask() {
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-desc").value;
  const status = document.getElementById("task-status").value;

  const res = await fetch("/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status }),
  });

  const data = await res.json();
  alert(data.message);
  fetchTasks();
}

function showEditForm(task) {
  document.getElementById("edit-task-id").value = task._id;
  document.getElementById("edit-task-title").value = task.title;
  document.getElementById("edit-task-desc").value = task.description;
  document.getElementById("edit-task-status").value = task.status;

  document.getElementById("edit-form-container").style.display = "block";
}

async function submitEdit() {
  const id = document.getElementById("edit-task-id").value;
  const title = document.getElementById("edit-task-title").value;
  const description = document.getElementById("edit-task-desc").value;
  const status = document.getElementById("edit-task-status").value;

  const res = await fetch(`/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, status }),
  });

  const data = await res.json();
  alert(data.message);
  cancelEdit();
  fetchTasks();
}

function cancelEdit() {
  document.getElementById("edit-form-container").style.display = "none";
}

async function deleteTask(id) {
  const confirmed = confirm("Are you sure?");
  if (!confirmed) return;
  const res = await fetch(`/tasks/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  alert(data.message);
  fetchTasks();
}

async function fetchTasks() {
  const res = await fetch("/tasks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const tasks = await res.json();
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const div = document.createElement("div");
    div.className = "task-item";
    div.innerHTML = `
      <strong>${task.title}</strong><br>
      ${task.description}<br>
      <em>Status: ${task.status}</em>
    `;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => showEditForm(task);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(task._id);

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    div.appendChild(actions);
    list.appendChild(div);
  });
}
