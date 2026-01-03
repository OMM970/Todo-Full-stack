function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
        redirectToLogin();
        return Promise.reject("No token");
    }

    return fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
            ...(options.headers || {})
        }
    }).then(response => {
        if (response.status === 401 || response.status === 403) {
            localStorage.removeItem("token");
            redirectToLogin();
            throw new Error("Session expired");
        }
        return response;
    });
}

function redirectToLogin() {
    window.location.href = "/login.html";
}
