document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const menuList = document.getElementById('menuList');
    const welcomeMessage = document.getElementById('welcomeMessage');

    // Dummy Data for Role-Based Access
    const roleAccess = {
        Admin: [
            { name: 'Users', icon: 'fas fa-users', url: 'users.html' },
            { name: 'Pelanggan', icon: 'fas fa-user-tag', url: 'pelanggan.html' },
            { name: 'Supplier', icon: 'fas fa-truck', url: 'supplier.html' },
            { name: 'Kategori', icon: 'fas fa-tags', url: 'kategori.html' },
            { name: 'Item', icon: 'fas fa-box', url: 'item.html' },
            { name: 'Produk', icon: 'fas fa-cube', url: 'produk.html' },
            { name: 'Transaksi', icon: 'fas fa-shopping-cart', url: 'transaksi.html' },
            { name: 'Konfirmasi', icon: 'fas fa-check-circle', url: 'konfirmasi.html' },
            { name: 'Laporan', icon: 'fas fa-chart-line', url: 'laporan.html' },
        ],
        Kasir: [
            { name: 'Pelanggan', icon: 'fas fa-user-tag', url: 'pelanggan.html' },
            { name: 'Transaksi', icon: 'fas fa-shopping-cart', url: 'transaksi.html' },
            { name: 'Konfirmasi', icon: 'fas fa-check-circle', url: 'konfirmasi.html' },
        ],
        Pelanggan: [
            { name: 'Produk', icon: 'fas fa-cube', url: 'produk.html' },
            { name: 'Transaksi', icon: 'fas fa-shopping-cart', url: 'transaksi.html' },
        ],
    };

    // Login Functionality
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            if (username && password && role) {
                localStorage.setItem('loggedIn', JSON.stringify({ username, role }));
                Swal.fire('Login Berhasil', 'Selamat datang di aplikasi!', 'success').then(() => {
                    window.location.href = 'dashboard.html';
                });
            } else {
                Swal.fire('Error', 'Harap isi semua kolom!', 'error');
            }
        });
    }

    // Logout Functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedIn');
            Swal.fire('Logout Berhasil', 'Anda telah keluar!', 'success').then(() => {
                window.location.href = 'index.html';
            });
        });
    }

    // Dynamically Load Menu Based on Role
    if (menuList && welcomeMessage) {
        const userData = JSON.parse(localStorage.getItem('loggedIn'));
        if (!userData) {
            Swal.fire('Akses Ditolak', 'Silakan login terlebih dahulu.', 'error').then(() => {
                window.location.href = 'index.html';
            });
        } else {
            const { username, role } = userData;
            welcomeMessage.innerText = `Selamat Datang, ${username} (${role})`;

            const menuItems = roleAccess[role] || [];
            menuItems.forEach(item => {
                const li = document.createElement('li');
                li.className = 'nav-item';
                li.innerHTML = `<a class="nav-link" href="${item.url}"><i class="${item.icon}"></i> ${item.name}</a>`;
                menuList.appendChild(li);
            });
        }
    }
});
