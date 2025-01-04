// Helpers for LocalStorage
function loadFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveToLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function showAlert(message, type, target = "loginAlert") {
    const alertBox = document.createElement("div");
    alertBox.className = `alert alert-${type} mt-3`;
    alertBox.innerText = message;
    const targetElement = document.getElementById(target);
    targetElement.innerHTML = ""; // Clear previous alerts
    targetElement.appendChild(alertBox);
    setTimeout(() => alertBox.remove(), 3000);
}

// Login System
const defaultUsers = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "kasir", password: "kasir123", role: "kasir" },
    { username: "operator", password: "operator123", role: "operator" },
];
if (!localStorage.getItem("users")) {
    saveToLocalStorage("users", defaultUsers);
}

document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const users = loadFromLocalStorage("users");
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

// Dashboard
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

// Admin Functions
function manageUsers() {
    const users = loadFromLocalStorage("users");
    renderUserManagement(users);

    document.getElementById("addUserForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("newUsername").value.trim();
        const password = document.getElementById("newPassword").value;
        const role = document.getElementById("newRole").value;

        if (users.some((u) => u.username === username)) {
            showAlert("Username sudah ada!", "danger", "dashboardContent");
            return;
        }

        users.push({ username, password, role });
        saveToLocalStorage("users", users);
        renderUserManagement(users);
        showAlert("Pengguna berhasil ditambahkan!", "success", "dashboardContent");
    });
}

function renderUserManagement(users) {
    const userRows = users
        .map(
            (user, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Hapus</button>
                </td>
            </tr>`
        )
        .join("");

    document.getElementById("dashboardContent").innerHTML = `
        <h2>Manajemen Pengguna</h2>
        <form id="addUserForm" class="mb-3">
            <div class="input-group">
                <input type="text" id="newUsername" class="form-control" placeholder="Username" required>
                <input type="password" id="newPassword" class="form-control" placeholder="Password" required>
                <select id="newRole" class="form-select">
                    <option value="admin">Admin</option>
                    <option value="kasir">Kasir</option>
                    <option value="operator">Operator</option>
                </select>
                <button type="submit" class="btn btn-primary">Tambah</button>
            </div>
        </form>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>${userRows}</tbody>
        </table>
    `;
}

function editUser(index) {
    const users = loadFromLocalStorage("users");
    const user = users[index];
    const newUsername = prompt("Masukkan username baru:", user.username);
    const newRole = prompt("Masukkan role baru (admin/kasir/operator):", user.role);

    if (newUsername && newRole) {
        users[index] = { ...user, username: newUsername, role: newRole };
        saveToLocalStorage("users", users);
        manageUsers();
        showAlert("Pengguna berhasil diperbarui!", "success", "dashboardContent");
    }
}

function deleteUser(index) {
    const users = loadFromLocalStorage("users");
    if (confirm("Yakin ingin menghapus pengguna ini?")) {
        users.splice(index, 1);
        saveToLocalStorage("users", users);
        manageUsers();
        showAlert("Pengguna berhasil dihapus!", "success", "dashboardContent");
    }
}
