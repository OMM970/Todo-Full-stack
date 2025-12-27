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
