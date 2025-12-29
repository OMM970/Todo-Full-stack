const API_URL = "/api/v1/todos";

let editingTodoId = null;

const todoInput = document.getElementById("todoInput");
const todoDesc = document.getElementById("todoDesc");
const addBtn = document.getElementById("addBtn");
const cancelBtn = document.getElementById("cancelBtn");
const todoList = document.getElementById("todoList");

document.addEventListener("DOMContentLoaded", loadTodos);

document.addEventListener("click", () => {
    document.querySelectorAll(".status-menu").forEach(menu => {
        menu.style.display = "none";
    });
});

function loadTodos() {
    fetch(API_URL)
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

function saveTodo() {
    editingTodoId ? updateTodo() : addTodo();
}

function addTodo() {
    const task = todoInput.value.trim();
    const description = todoDesc.value.trim();

    if (!task) return alert("Enter task");

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Taskname: task,
            Taskdescription: description
        })
    }).then(() => {
        resetForm();
        loadTodos();
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
    fetch(`${API_URL}/update/${editingTodoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            Taskname: todoInput.value.trim(),
            Taskdescription: todoDesc.value.trim()
        })
    }).then(() => {
        resetForm();
        loadTodos();
    });
}

function deleteTodo(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => loadTodos());
}

function changeStatus(todoId, status, event) {
    event.stopPropagation();

    fetch(`${API_URL}/update/status/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
    }).then(() => loadTodos());
}

function toggleMenu(el, event) {
    event.stopPropagation();

    const menu = el.closest(".todo-right").querySelector(".status-menu");

    document.querySelectorAll(".status-menu").forEach(m => {
        if (m !== menu) m.style.display = "none";
    });

    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function resetForm() {
    editingTodoId = null;
    todoInput.value = "";
    todoDesc.value = "";
    addBtn.innerText = "Add task";
    cancelBtn.style.display = "none";
}

function formatStatus(status) {
    if (status === "TODO") return "⏳ To Do";
    if (status === "HALFWAY") return "🔄 In Progress";
    if (status === "COMPLETED") return "✅ Completed";
    return status;
}
