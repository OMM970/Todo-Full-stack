const API_URL = "/api/v1/todos";

let editingTodoId = null;
let composerPriority = null; // priority during creation

const todoInput = document.getElementById("todoInput");
const todoDesc = document.getElementById("todoDesc");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const todoList = document.getElementById("todoList");

/* =======================
   PAGE LOAD (AUTH FIRST)
======================= */
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");

    if (!token) {
        redirectToLogin();
        return;
    }

    loadTodos();
});

document.addEventListener("click", closeAllMenus);

/* =======================
   LOAD TODOS
======================= */
function loadTodos() {
    authFetch(API_URL)
        .then(res => res.json())
        .then(todos => {
            todoList.innerHTML = "";

            if (!todos || todos.length === 0) {
                todoList.innerHTML = "<li>No tasks available</li>";
                return;
            }

            todos.forEach(todo => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <div class="todo-left">
                        <span class="todo-title">${todo.Taskname}</span>
                        <span class="todo-desc">${todo.Taskdescription || ""}</span>
                    </div>

                    <div class="todo-right">

                        <span class="status-chip ${todo.status.toLowerCase()}"
                              onclick="toggleMenu(this, event)">
                            ${formatStatus(todo.status)}
                        </span>

                        <div class="status-menu">
                            <div onclick="changeStatus(${todo.id}, 'TODO', event)">⏳ To Do</div>
                            <div onclick="changeStatus(${todo.id}, 'HALFWAY', event)">🔄 In Progress</div>
                            <div onclick="changeStatus(${todo.id}, 'COMPLETED', event)">✅ Completed</div>
                        </div>

                        <span class="priority-chip ${todo.priority ? '' : 'none'}"
                              onclick="toggleMenu(this, event)">
                            <span class="flag ${todo.priority?.toLowerCase() || ''}">⚑</span>
                            ${todo.priority || 'Priority'}
                        </span>

                        <div class="priority-menu">
                            <div onclick="changePriority(${todo.id}, 'HIGH', event)">
                                <span class="flag high">⚑</span> High
                            </div>
                            <div onclick="changePriority(${todo.id}, 'MEDIUM', event)">
                                <span class="flag medium">⚑</span> Medium
                            </div>
                            <div onclick="changePriority(${todo.id}, 'LOW', event)">
                                <span class="flag low">⚑</span> Low
                            </div>
                            <div onclick="changePriority(${todo.id}, null, event)">
                                ✖ Clear
                            </div>
                        </div>

                        <div class="todo-actions">
                            <button onclick="editTodo(${todo.id}, '${todo.Taskname}', '${todo.Taskdescription || ""}')">✏️</button>
                            <button onclick="deleteTodo(${todo.id})">❌</button>
                        </div>
                    </div>
                `;

                todoList.appendChild(li);
            });
        });
}

/* =======================
   ADD TODO
======================= */
function addTodo() {
    const task = todoInput.value.trim();
    const description = todoDesc.value.trim();

    if (!task) return alert("Enter task");

    authFetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            Taskname: task,
            Taskdescription: description,
            priority: composerPriority
        })
    }).then(() => {
        resetForm();
        loadTodos();
    });
}

/* =======================
   EDIT TODO
======================= */
function editTodo(id, task, description) {
    editingTodoId = id;
    todoInput.value = task;
    todoDesc.value = description;
    addBtn.innerText = "Update";
    cancelBtn.style.display = "inline-block";
}

/* =======================
   UPDATE TODO
======================= */
function updateTodo() {
    authFetch(`${API_URL}/update/${editingTodoId}`, {
        method: "PUT",
        body: JSON.stringify({
            Taskname: todoInput.value.trim(),
            Taskdescription: todoDesc.value.trim()
        })
    }).then(() => {
        resetForm();
        loadTodos();
    });
}

/* =======================
   DELETE TODO
======================= */
function deleteTodo(id) {
    authFetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadTodos());
}

/* =======================
   STATUS UPDATE
======================= */
function changeStatus(todoId, status, event) {
    event.stopPropagation();

    authFetch(`${API_URL}/update/status/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ status })
    }).then(() => loadTodos());
}

/* =======================
   PRIORITY UPDATE
======================= */
function changePriority(todoId, priority, event) {
    event.stopPropagation();

    authFetch(`${API_URL}/update/priority/${todoId}`, {
        method: "PUT",
        body: JSON.stringify({ priority })
    }).then(() => loadTodos());
}

/* =======================
   MENU TOGGLE
======================= */
function toggleMenu(el, event) {
    event.stopPropagation();
    closeAllMenus();
    el.nextElementSibling.style.display = "block";
}

function closeAllMenus() {
    document.querySelectorAll(".status-menu, .priority-menu")
        .forEach(m => m.style.display = "none");

    const composerMenu = document.getElementById("composerPriorityMenu");
    if (composerMenu) composerMenu.style.display = "none";
}

/* =======================
   COMPOSER PRIORITY
======================= */
function toggleComposerPriority(event) {
    event.stopPropagation();
    closeAllMenus();
    document.getElementById("composerPriorityMenu").style.display = "block";
}

function setComposerPriority(priority) {
    composerPriority = priority;

    const label = document.getElementById("composerPriorityLabel");

    if (!priority) label.innerHTML = "⚑ Priority";
    else if (priority === "HIGH") label.innerHTML = '<span class="flag high">⚑</span> High';
    else if (priority === "MEDIUM") label.innerHTML = '<span class="flag medium">⚑</span> Medium';
    else if (priority === "LOW") label.innerHTML = '<span class="flag low">⚑</span> Low';

    closeAllMenus();
}

/* =======================
   RESET FORM
======================= */
function resetForm() {
    editingTodoId = null;
    todoInput.value = "";
    todoDesc.value = "";
    composerPriority = null;
    const label = document.getElementById("composerPriorityLabel");
    if (label) label.innerHTML = "⚑ Priority";
    addBtn.innerText = "Add task";
    cancelBtn.style.display = "none";
}

/* =======================
   STATUS LABEL
======================= */
function formatStatus(status) {
    if (status === "TODO") return "⏳ To Do";
    if (status === "HALFWAY") return "🔄 In Progress";
    if (status === "COMPLETED") return "✅ Completed";
    return status;
}

function saveTodo() {
    if (editingTodoId === null) {
        addTodo();
    } else {
        updateTodo();
    }
}
