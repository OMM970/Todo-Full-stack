const API_URL = "/api/v1/todos";

// holds id of todo being edited
let editingTodoId = null;

// Load todos when page loads
document.addEventListener("DOMContentLoaded", loadTodos);

// =======================
// GET ALL TODOS
// =======================
function loadTodos() {
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch todos");
            }
            return response.json();
        })
        .then(todos => {
            const list = document.getElementById("todoList");
            list.innerHTML = "";

            if (todos.length === 0) {
                list.innerHTML = "<li>No tasks available</li>";
                return;
            }

            todos.forEach(todo => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <div class="todo-left">
                        <span class="todo-title">${todo.Taskname}</span>
                        <span class="todo-desc">${todo.Taskdescription}</span>
                      
                        <select class="status-dropdown"
                                onchange="updateStatus(${todo.id}, this.value)">
                            <option value="TODO" ${todo.status === "TODO" ? "selected" : ""}>TODO</option>
                            <option value="HALFWAY" ${todo.status === "HALFWAY" ? "selected" : ""}>HALFWAY</option>
                            <option value="COMPLETED" ${todo.status === "COMPLETED" ? "selected" : ""}>COMPLETED</option>
                        </select>
                    </div>
                    <div class="todo-actions">
                        <button onclick="editTodo(${todo.id}, '${todo.Taskname}', '${todo.Taskdescription}')">✏️</button>
                        <button onclick="deleteTodo(${todo.id})">❌</button>
                    </div>
                `;

                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error loading todos:", error);
        });
}

// =======================
// ADD OR UPDATE SWITCH
// =======================
function saveTodo() {
    if (editingTodoId) {
        updateTodo();
    } else {
        addTodo();
    }
}

// =======================
// ADD TODO
// =======================
function addTodo() {
    const input = document.getElementById("todoInput");
    const desc = document.getElementById("todoDesc");

    const task = input.value.trim();
    const description = desc.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Taskname: task,
            Taskdescription: description
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to add todo");
            }
            resetForm();
            loadTodos();
        })
        .catch(error => {
            console.error("Error adding todo:", error);
        });
}

// =======================
// EDIT TODO (FILL FORM)
// =======================
function editTodo(id, task, description) {
    editingTodoId = id;

    document.getElementById("todoInput").value = task;
    document.getElementById("todoDesc").value = description;

    document.getElementById("addBtn").innerText = "Update";
    document.getElementById("cancelBtn").style.display = "inline-block";
}

// =======================
// UPDATE TODO
// =======================
function updateTodo() {
    const task = document.getElementById("todoInput").value.trim();
    const description = document.getElementById("todoDesc").value.trim();

    fetch(`${API_URL}/update/${editingTodoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            Taskname: task,
            Taskdescription: description
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update todo");
            }
            resetForm();
            loadTodos();
        })
        .catch(error => {
            console.error("Error updating todo:", error);
        });
}

// =======================
// DELETE TODO
// =======================
function deleteTodo(id) {
    fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete todo");
            }
            loadTodos();
        })
        .catch(error => {
            console.error("Error deleting todo:", error);
        });
}

function cancelUpdate() {
    resetForm();
}

// =======================
// RESET FORM
// =======================
function resetForm() {
    editingTodoId = null;
    document.getElementById("todoInput").value = "";
    document.getElementById("todoDesc").value = "";
    document.getElementById("addBtn").innerText = "Add";
    document.getElementById("cancelBtn").style.display = "none";
}
// =======================
// UPDATE STAUS
// =======================
function updateStatus(todoId, status) {
    fetch(`${API_URL}/update/status/${todoId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(status) // MUST be string only
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update status");
            }
            return response.json();
        })
        .then(data => {
            console.log("Status updated:", data);
        })
        .catch(error => {
            console.error("Error updating status:", error);
            alert("Status update failed");
        });
}
function toggleMenu(btn) {
    const menu = btn.nextElementSibling;
    document.querySelectorAll(".status-menu").forEach(m => {
        if (m !== menu) m.style.display = "none";
    });
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function changeStatus(todoId, status, el) {
    updateStatus(todoId, status);

    const card = el.closest(".todo-right");
    const chip = card.querySelector(".status-chip");

    chip.className = `status-chip ${status.toLowerCase()}`;
    chip.innerText = formatStatus(status);

    card.querySelector(".status-menu").style.display = "none";
}

function formatStatus(status) {
    if (status === "TODO") return "⏳ To Do";
    if (status === "HALFWAY") return "🔄 In Progress";
    if (status === "COMPLETED") return "✅ Completed";
    return status;
}

