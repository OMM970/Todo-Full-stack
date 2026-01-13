/* =======================
   CONFIG
======================= */
const API_URL = "/api/v1/todos";

/* =======================
   STATE
======================= */
let editingTodoId = null;
let composerPriority = null;
let currentView = "INBOX"; // INBOX | COMPLETED

/* =======================
   ELEMENTS
======================= */
const todoInput = document.getElementById("todoInput");
const todoDesc = document.getElementById("todoDesc");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const todoList = document.getElementById("todoList");
const pageTitle = document.getElementById("pageTitle");

const navInbox = document.getElementById("navInbox");
const navCompleted = document.getElementById("navCompleted");

/* =======================
   INIT
======================= */
document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    if (!token) {
        redirectToLogin();
        return;
    }
    loadInbox();
});

document.addEventListener("click", closeAllMenus);

/* =======================
   VIEW LOADERS
======================= */
function loadInbox() {
    currentView = "INBOX";
    pageTitle.innerText = "Todo List";
    setActiveNav(navInbox);

    document.querySelector(".container")
        .classList.remove("completed-view");

    loadTodosByUrl(API_URL);
}

function loadCompleted() {
    currentView = "COMPLETED";
    pageTitle.innerText = "Completed Tasks";
    setActiveNav(navCompleted);

    document.querySelector(".container")
        .classList.add("completed-view");

    loadTodosByUrl(`${API_URL}/completed`);
}

/* =======================
   FETCH + RENDER
======================= */
function loadTodosByUrl(url) {
    authFetch(url)
        .then(res => res.json())
        .then(todos => {
            todoList.innerHTML = "";

            if (!todos || todos.length === 0) {
                todoList.innerHTML = "<li>No tasks available</li>";
                return;
            }

            todos.forEach(renderTodo);
        });
}

function renderTodo(todo) {
    const li = document.createElement("li");

    li.innerHTML = `
        <div class="todo-left">
            <span class="todo-title">${escapeHtml(todo.Taskname)}</span>
            <span class="todo-desc">${escapeHtml(todo.Taskdescription || "")}</span>
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

            <div class="todo-actions">
                ${currentView === "COMPLETED" ? "" : `
                    <button onclick="editTodo(${todo.id}, '${escapeJs(todo.Taskname)}', '${escapeJs(todo.Taskdescription || "")}')">✏️</button>
                `}
                <button onclick="deleteTodo(${todo.id})">❌</button>
            </div>
        </div>
    `;

    todoList.appendChild(li);
}

/* =======================
   ADD / UPDATE
======================= */
function saveTodo() {
    editingTodoId === null ? addTodo() : updateTodo();
}

function addTodo() {
    const task = todoInput.value.trim();
    if (!task) return alert("Enter task");

    authFetch(API_URL, {
        method: "POST",
        body: JSON.stringify({
            Taskname: task,
            Taskdescription: todoDesc.value.trim(),
            priority: composerPriority
        })
    }).then(() => {
        resetForm();
        reloadCurrentView();
    });
}

function editTodo(id, task, description) {
    editingTodoId = id;
    todoInput.value = task;
    todoDesc.value = description;
    addBtn.innerText = "Update";
    cancelBtn.style.display = "inline-block";
}

function updateTodo() {
    authFetch(`${API_URL}/update/${editingTodoId}`, {
        method: "PUT",
        body: JSON.stringify({
            Taskname: todoInput.value.trim(),
            Taskdescription: todoDesc.value.trim()
        })
    }).then(() => {
        resetForm();
        reloadCurrentView();
    });
}

/* =======================
   DELETE
======================= */
function deleteTodo(id) {
    if (!confirm("Delete this task?")) return;
    authFetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => reloadCurrentView());
}

/* =======================
   STATUS
======================= */
function changeStatus(id, status, event) {
    event.stopPropagation();
    authFetch(`${API_URL}/update/status/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status })
    }).then(() => reloadCurrentView());
}

/* =======================
   MENUS
======================= */
function toggleMenu(el, event) {
    event.stopPropagation();
    closeAllMenus();
    const menu = el.nextElementSibling;
    if (menu) menu.style.display = "block";
}

function closeAllMenus() {
    document.querySelectorAll(".status-menu, .priority-menu")
        .forEach(m => m.style.display = "none");
}

/* =======================
   RESET
======================= */
function resetForm() {
    editingTodoId = null;
    todoInput.value = "";
    todoDesc.value = "";
    composerPriority = null;
    addBtn.innerText = "Add task";
    cancelBtn.style.display = "none";
}

/* =======================
   UTIL
======================= */
function formatStatus(s) {
    if (s === "TODO") return "⏳ To Do";
    if (s === "HALFWAY") return "🔄 In Progress";
    if (s === "COMPLETED") return "✅ Completed";
    return s;
}

function escapeHtml(str) {
    return str.replace(/[&<>"']/g, m =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[m])
    );
}

function escapeJs(str) {
    return str.replace(/'/g, "\\'");
}

function setActiveNav(activeBtn) {
    document.querySelectorAll(".nav-item")
        .forEach(b => b.classList.remove("active"));
    activeBtn.classList.add("active");
}

/* =======================
   SIDEBAR EVENTS
======================= */
navInbox.addEventListener("click", loadInbox);
navCompleted.addEventListener("click", loadCompleted);
