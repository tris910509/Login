// Local Storage Helpers
function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showAlert(message, type) {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.innerText = message;
    document.getElementById("loginAlert")?.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// Login System
const users = loadFromLocalStorage("users");
if (!users.some((user) => user.role === "admin")) {
    saveToLocalStorage("users", [
        { username: "admin", password: "1234", role: "admin" },
        ...users,
    ]);
}

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const user = users.find(
        (user) => user.username === username && user.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        location.href = "dashboard.html";
    } else {
        showAlert("Username atau Password salah!", "danger");
    }
});

function logout() {
    localStorage.removeItem("currentUser");
    location.href = "index.html";
}

// Dashboard Content
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("userRole").innerText = `Role: ${currentUser.role}`;
        loadDashboardContent(currentUser.role);
    } else {
        logout();
    }
});

function loadDashboardContent(role) {
    if (role === "admin") {
        manageUsers();
    } else if (role === "kasir") {
        manageTransactions();
    } else if (role === "operator") {
        viewLogs();
    }
}

// CRUD Functions (Admin Example)
function manageUsers() {
    const users = loadFromLocalStorage("users");
    renderUserManagement(users);

    document.getElementById("addUserForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value;
        const role = document.getElementById("newRole").value;

        if (users.some((u) => u.username === username)) {
            showAlert("Username sudah ada!", "danger");
            return;
        }

        users.push({ username, password, role });
        saveToLocalStorage("users", users);
        renderUserManagement(users);
        logActivity(`Admin menambahkan pengguna: ${username}`);
    });
}

function renderUserManagement(users) {
    // Pagination & Table Render Logic Here
}

// Log Activity
function logActivity(action) {
    const logs = loadFromLocalStorage("logs");
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    logs.push({
        action,
        user: currentUser.username,
        role: currentUser.role,
        date: new Date().toLocaleString(),
    });
    saveToLocalStorage("logs", logs);
}

// Backup & Restore Data
function backupData() {
    const data = {
        users: loadFromLocalStorage("users"),
        transactions: loadFromLocalStorage("transactions"),
        logs: loadFromLocalStorage("logs"),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "backup.json";
    link.click();
}

function restoreData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        Object.keys(data).forEach((key) => saveToLocalStorage(key, data[key]));
        location.reload();
    };
    reader.readAsText(file);
}
