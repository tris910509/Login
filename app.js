document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const navbarLinks = document.getElementById('navbar-links');

    // Login Form Handling
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const role = document.getElementById('role').value;

            // Simple validation (check if username & password match)
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('role', role);
                Swal.fire('Login Berhasil', 'Selamat datang di aplikasi!', 'success').then(() => {
                    window.location.href = 'dashboard.html';
                });
            } else {
                Swal.fire('Error', 'Username atau password salah!', 'error');
            }
        });
    }

    // Logout Handling
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('role');
            Swal.fire('Logout Berhasil', 'Anda telah keluar!', 'success').then(() => {
                window.location.href = 'index.html';
            });
        });
    }

    // Protect Pages & Handle Navigation Based on Role
    if (!localStorage.getItem('loggedIn')) {
        Swal.fire('Akses Ditolak', 'Silakan login terlebih dahulu.', 'error').then(() => {
            window.location.href = 'index.html';
        });
    }

    if (navbarLinks) {
        const role = localStorage.getItem('role');
        const links = [];

        // Display Links Based on Role
        if (role === 'admin') {
            links.push({ href: 'users.html', icon: 'fas fa-users', text: 'Users' });
            links.push({ href: 'pelanggan.html', icon: 'fas fa-user-tag', text: 'Pelanggan' });
            links.push({ href: 'supplier.html', icon: 'fas fa-truck', text: 'Supplier' });
            links.push({ href: 'kategori.html', icon: 'fas fa-tags', text: 'Kategori' });
            links.push({ href: 'item.html', icon: 'fas fa-box', text: 'Item' });
            links.push({ href: 'produk.html', icon: 'fas fa-cube', text: 'Produk' });
            links.push({ href: 'transaksi.html', icon: 'fas fa-shopping-cart', text: 'Transaksi' });
            links.push({ href: 'konfirmasi.html', icon: 'fas fa-check-circle', text: 'Konfirmasi Pembayaran' });
            links.push({ href: 'laporan.html', icon: 'fas fa-chart-line', text: 'Laporan' });
        } else if (role === 'user') {
            links.push({ href: 'laporan.html', icon: 'fas fa-chart-line', text: 'Laporan' });
        }

        // Generate Links
        navbarLinks.innerHTML = '';
        links.forEach(link => {
            navbarLinks.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link" href="${link.href}"><i class="${link.icon}"></i> ${link.text}</a>
                </li>
            `;
        });
    }
});
