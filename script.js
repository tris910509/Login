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
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userList = users.map((user, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.role}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Hapus</button>
            </td>
        </tr>
    `).join("");

    document.getElementById("dashboardContent").innerHTML = `
        <h1>Kelola Pengguna</h1>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Aksi</th>
                </tr>
            </thead>
            <tbody>${userList}</tbody>
        </table>
    `;
}

function editUser(index) {
    alert(`Edit pengguna pada indeks ${index}.`);
}

function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    manageUsers();
    showAlert("Pengguna berhasil dihapus!", "success");
}



//Kasir dapat menambahkan dan melihat daftar transaksi
function manageTransactions() {
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const transactionList = transactions.map((trx, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${trx.item}</td>
            <td>${trx.amount}</td>
            <td>${trx.date}</td>
        </tr>
    `).join("");

    document.getElementById("dashboardContent").innerHTML = `
        <h1>Kelola Transaksi</h1>
        <form id="transactionForm">
            <div class="mb-3">
                <label for="item" class="form-label">Nama Barang</label>
                <input type="text" id="item" class="form-control" required>
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label">Jumlah</label>
                <input type="number" id="amount" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-primary">Tambah Transaksi</button>
        </form>
        <table class="table table-striped mt-3">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nama Barang</th>
                    <th>Jumlah</th>
                    <th>Tanggal</th>
                </tr>
            </thead>
            <tbody>${transactionList}</tbody>
        </table>
    `;

    document.getElementById("transactionForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const item = document.getElementById("item").value;
        const amount = document.getElementById("amount").value;
        const date = new Date().toLocaleDateString();

        transactions.push({ item, amount, date });
        localStorage.setItem("transactions", JSON.stringify(transactions));
        manageTransactions();
        showAlert("Transaksi berhasil ditambahkan!", "success");
    });
}




