// Data pengguna statis
const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "kasir", password: "kasir123", role: "kasir" },
    { username: "operator", password: "operator123", role: "operator" }
];

// Fungsi login
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        showWelcomeMessage(user);
    } else {
        alert("Username atau password salah!");
    }
});

// Menampilkan pesan selamat datang
function showWelcomeMessage(user) {
    document.getElementById("loginForm").style.display = "none";
    const welcomeMessage = document.getElementById("welcomeMessage");
    welcomeMessage.style.display = "block";
    welcomeMessage.textContent = `Welcome, ${user.role.toUpperCase()} (${user.username})`;

    const restrictedContent = document.getElementById("restrictedContent");
    restrictedContent.style.display = "block";
}

// Navigasi ke halaman tertentu
function navigate(role) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.role === role) {
        alert(`Navigating to ${role} page...`);
        // Logika tambahan untuk halaman sesuai role
    } else {
        alert("Akses ditolak!");
    }
}

// Fungsi logout
function logout() {
    localStorage.removeItem("currentUser");
    location.reload();
}

// Periksa sesi pengguna
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        showWelcomeMessage(currentUser);
    }
});

//Tambahkan logika untuk navigasi ke halaman masing-masing:
function navigate(role) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.role === role) {
        if (role === "admin") {
            window.location.href = "admin.html";
        } else if (role === "kasir") {
            window.location.href = "kasir.html";
        } else if (role === "operator") {
            window.location.href = "operator.html";
        }
    } else {
        alert("Akses ditolak! Anda tidak memiliki hak untuk mengakses halaman ini.");
    }
}


// Dark/Light Mode Toggle
document.getElementById("toggleTheme").addEventListener("click", () => {
    document.body.classList.toggle("bg-dark");
    document.body.classList.toggle("text-light");

    // Simpan preferensi tema di localStorage
    const theme = document.body.classList.contains("bg-dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
});

// Terapkan tema saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("bg-dark", "text-light");
    }
});

// Tambahkan logika logout otomatis setelah 10 menit tidak aktif.

let timeout;

function resetTimeout() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        logout();
    }, 10 * 60 * 1000); // 10 menit
}

// Pantau aktivitas pengguna
document.addEventListener("mousemove", resetTimeout);
document.addEventListener("keypress", resetTimeout);

// Mulai timer saat halaman dimuat
resetTimeout();

//Script untuk Menampilkan Notifikasi

function showAlert(message, type = "success") {
    const alertMessage = document.getElementById("alertMessage");
    alertMessage.textContent = message;
    alertMessage.className = `alert alert-${type}`;
    alertMessage.style.display = "block";

    setTimeout(() => {
        alertMessage.style.display = "none";
    }, 3000);
}

// Contoh penggunaan:
// showAlert("Login berhasil!", "success");
// showAlert("Username atau password salah!", "danger");




//fungsi untuk admin mengelola pengguna di
function manageUsers() {
    const users = loadFromLocalStorage("users");
    renderUserManagement(users);

    // Form Tambah Pengguna
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
        logActivity(`Admin menambahkan pengguna: ${username}`);
        renderUserManagement(users);
        showAlert("Pengguna berhasil ditambahkan!", "success");
    });

    // Pencarian
    document.getElementById("searchUser").addEventListener("input", function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredUsers = users.filter((u) =>
            u.username.toLowerCase().includes(searchTerm) || u.role.toLowerCase().includes(searchTerm)
        );
        renderUserManagement(filteredUsers);
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
        <div class="mb-3">
            <input type="text" id="searchUser" class="form-control" placeholder="Cari pengguna...">
        </div>
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
        <button class="btn btn-success mb-3" onclick="exportToCSV('users', ${JSON.stringify(users)})">Export ke CSV</button>
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
        logActivity(`Admin mengedit pengguna: ${user.username}`);
        manageUsers();
        showAlert("Pengguna berhasil diperbarui!", "success");
    }
}

function deleteUser(index) {
    const users = loadFromLocalStorage("users");
    if (confirm("Yakin ingin menghapus pengguna ini?")) {
        const deletedUser = users.splice(index, 1);
        saveToLocalStorage("users", users);
        logActivity(`Admin menghapus pengguna: ${deletedUser[0].username}`);
        manageUsers();
        showAlert("Pengguna berhasil dihapus!", "success");
    }
}



//Kasir dapat menambahkan dan melihat daftar transaksi
function manageTransactions() {
    const transactions = loadFromLocalStorage("transactions");
    renderTransactionManagement(transactions);

    // Form Tambah Transaksi
    document.getElementById("addTransactionForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const item = document.getElementById("itemName").value.trim();
        const amount = parseInt(document.getElementById("itemAmount").value);
        const date = new Date().toLocaleDateString();

        transactions.push({ item, amount, date });
        saveToLocalStorage("transactions", transactions);
        logActivity(`Kasir menambahkan transaksi: ${item}`);
        renderTransactionManagement(transactions);
        showAlert("Transaksi berhasil ditambahkan!", "success");
    });

    // Pencarian
    document.getElementById("searchTransaction").addEventListener("input", function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const filteredTransactions = transactions.filter((trx) =>
            trx.item.toLowerCase().includes(searchTerm)
        );
        renderTransactionManagement(filteredTransactions);
    });
}

function renderTransactionManagement(transactions) {
    const transactionRows = transactions
        .map(
            (trx, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${trx.item}</td>
            <td>${trx.amount}</td>
            <td>${trx.date}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editTransaction(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTransaction(${index})">Hapus</button>
            </td>
        </tr>`
        )
        .join("");

    document.getElementById("dashboardContent").innerHTML = `
        <h2>Manajemen Transaksi</h2>
        <div class="mb-3">
            <input type="text" id="searchTransaction" class="form-control" placeholder="Cari transaksi...">
        </div>
        <form id="addTransactionForm" class="mb-3">
            <div class="input-group">
                <input type="text" id="itemName" class="form-control" placeholder="Nama Barang" required>
                <input type="number" id="itemAmount" class="form-control" placeholder="Jumlah" required>
                <button type="submit" class="btn btn-primary">Tambah</button>
            </div>
        </form>
        <button class="btn btn-success mb-3" onclick="exportToCSV('transactions', ${JSON.stringify(transactions)})">Export ke CSV</button>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>${transactionRows}</tbody>
        </table>
    `;
}


function exportToCSV(filename, data) {
    const csvContent = data.map((row) => Object.values(row).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
}



