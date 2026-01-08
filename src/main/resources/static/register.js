const REGISTER_URL = "/api/v1/auth/register";

async function register(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const errorEl = document.getElementById("error");

    errorEl.innerText = "";

    if (!username || !email || !password || !confirmPassword) {
        errorEl.innerText = "All fields are required";
        return;
    }

    if (password !== confirmPassword) {
        errorEl.innerText = "Passwords do not match";
        return;
    }

    try {
        const response = await fetch(REGISTER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password,confirmPassword })
        });

        if (!response.ok) {
            throw new Error("Registration failed. Email may already exist.");
        }

        alert("Registration successful! Please login.");
        window.location.href = "/login.html";

    } catch (err) {
        errorEl.innerText = err.message || "Registration failed";
    }
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    const icon = btn.querySelector("i");

    const show = input.type === "password";
    input.type = show ? "text" : "password";

    icon.classList.toggle("bx-eye", !show);
    icon.classList.toggle("bx-eye-slash", show);
}
