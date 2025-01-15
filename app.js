document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');
    const menuList = document.getElementById('menuList');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const statsContainer = document.getElementById('statsContainer');

    
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let username = document.getElementById('username').value;
        let password = document.getElementById('password').value;

        // Simulasi autentikasi pengguna
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = 'dashboard.html'; // Redirect ke halaman Dashboard
        } else {
            Swal.fire('Error', 'Username atau password salah!', 'error');
        }
    });


    // Dummy Data
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

    const statsData = {
        Admin: [
            { title: 'Total Users', count: 120, icon: 'fas fa-users', color: 'bg-primary' },
            { title: 'Total Transaksi', count: 340, icon: 'fas fa-shopping-cart', color: 'bg-success' },
            { title: 'Total Pendapatan', count: 'Rp 15,000,000', icon: 'fas fa-wallet', color: 'bg-warning' },
        ],
        Kasir: [
            { title: 'Transaksi Hari Ini', count: 30, icon: 'fas fa-shopping-cart', color: 'bg-success' },
            { title: 'Pendapatan Hari Ini', count: 'Rp 500,000', icon: 'fas fa-wallet', color: 'bg-warning' },
        ],
        Pelanggan: [
            { title: 'Total Pembelian', count: 5, icon: 'fas fa-shopping-bag', color: 'bg-info' },
        ],
    };

    // Load Data Based on Role
    const userData = JSON.parse(localStorage.getItem('loggedIn'));
    if (!userData) {
        Swal.fire('Akses Ditolak', 'Silakan login terlebih dahulu.', 'error').then(() => {
            window.location.href = 'index.html';
        });
    } else {
        const { username, role } = userData;
        welcomeMessage.innerText = `Selamat Datang, ${username} (${role})`;

        // Generate Menu
        const menuItems = roleAccess[role] || [];
        menuItems.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `<a class="nav-link" href="${item.url}"><i class="${item.icon}"></i> ${item.name}</a>`;
            menuList.appendChild(li);
        });

        // Generate Statistics
        const stats = statsData[role] || [];
        stats.forEach(stat => {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card text-white ${stat.color} mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${stat.title}</h5>
                        <p class="card-text">${stat.count}</p>
                        <i class="${stat.icon} fa-3x"></i>
                    </div>
                </div>
            `;
            statsContainer.appendChild(col);
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            localStorage.removeItem('loggedIn');
            Swal.fire('Logout Berhasil', 'Anda telah keluar!', 'success').then(() => {
                window.location.href = 'index.html';
            });
        });
    }

    // Charts
    const salesChart = document.getElementById('salesChart');
    const customerChart = document.getElementById('customerChart');
    if (salesChart && customerChart) {
        const ctx1 = salesChart.getContext('2d');
        new Chart(ctx1, {
            type: 'bar',
            data: {
                labels: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni'],
                datasets: [{
                    label: 'Pendapatan (Rp)',
                    data: [1200000, 1500000, 1800000, 2000000, 2500000, 3000000],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
        });

        const ctx2 = customerChart.getContext('2d');
        new Chart(ctx2, {
            type: 'doughnut',
            data: {
                labels: ['Pelanggan Baru', 'Pelanggan Lama'],
                datasets: [{
                    data: [40, 60],
                    backgroundColor: ['rgba(75, 192, 192, 0.7)', 'rgba(255, 99, 132, 0.7)'],
                    borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                }]
            },
        });
    }
});
