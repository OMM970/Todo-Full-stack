    const LOGIN_URL = "/api/v1/auth/login";

    async function login(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const errorEl = document.getElementById("error");

        errorEl.innerText = "";

        if (!email || !password) {
            errorEl.innerText = "Email and password are required";
            return;
        }

        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error("Invalid email or password");
            }

            const data = await response.json();

            // ✅ Save JWT token
            localStorage.setItem("token", data.token);

            // ✅ Redirect to todo/dashboard page
            window.location.href = "/dashboard.html";

        } catch (err) {
            errorEl.innerText = err.message || "Login failed";
        }


    }

    function togglePassword() {
        const passwordInput = document.getElementById("password");
        const eyeIcon = document.querySelector("#toggleEye i");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            eyeIcon.classList.remove("bx-eye");
            eyeIcon.classList.add("bx-eye-slash");
        } else {
            passwordInput.type = "password";
            eyeIcon.classList.remove("bx-eye-slash");
            eyeIcon.classList.add("bx-eye");
        }
    }


