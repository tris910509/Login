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
