const API_URL = "/api/v1/todos";

// Load todos when page loads
document.addEventListener("DOMContentLoaded", loadTodos);

// GET ALL TODOS
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
        <button onclick="deleteTodo(${todo.id})">❌</button>
    `;
                list.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error loading todos:", error);
        });
}

// ADD TODO
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
            input.value = "";
            loadTodos();
        })
        .catch(error => {
            console.error("Error adding todo:", error);
        });
}

// DELETE TODO
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
