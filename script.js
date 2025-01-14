// Simulasi data pengguna yang login
const currentUser = {
  id: 'USR001',
  name: 'John Doe',
  role: 'Admin' // Role dapat diubah untuk pengujian (Admin, Kasir, Other)
};

// Hak akses menu berdasarkan ID pengguna
const menuAccess = {
  USR001: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' },
    { name: 'User Management', icon: 'fas fa-users', link: '#user' },
    { name: 'Pelanggan', icon: 'fas fa-user-friends', link: '#pelanggan' },
    { name: 'Supplier', icon: 'fas fa-truck', link: '#supplier' },
    { name: 'Kategori', icon: 'fas fa-tags', link: '#kategori' },
    { name: 'Item', icon: 'fas fa-box', link: '#item' },
    { name: 'Produk', icon: 'fas fa-cubes', link: '#produk' },
    { name: 'Transaksi', icon: 'fas fa-money-check-alt', link: '#transaksi' },
    { name: 'Laporan', icon: 'fas fa-file-alt', link: '#laporan' }
  ],
  USR002: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' },
    { name: 'Transaksi', icon: 'fas fa-money-check-alt', link: '#transaksi' },
    { name: 'Laporan', icon: 'fas fa-file-alt', link: '#laporan' }
  ],
  USR003: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' }
  ]
};

// Konten dummy untuk setiap halaman
const pageContent = {
  Home: '<p>Selamat datang di halaman Home.</p>',
  User: '<p>Kelola data pengguna di halaman ini.</p>',
  Pelanggan: '<p>Kelola data pelanggan di halaman ini.</p>',
  Supplier: '<p>Kelola data supplier di halaman ini.</p>',
  Kategori: '<p>Kelola kategori produk di halaman ini.</p>',
  Item: '<p>Kelola data item di halaman ini.</p>',
  Produk: '<p>Kelola data produk di halaman ini.</p>',
  Transaksi: '<p>Kelola transaksi di halaman ini.</p>',
  Laporan: '<p>Lihat laporan di halaman ini.</p>'
};

// Fungsi untuk memuat menu di sidebar
const loadMenuByUserID = (userID) => {
  const navbarList = document.getElementById('navbarList');
  navbarList.innerHTML = '';

  if (menuAccess[userID]) {
    const menus = menuAccess[userID];
    menus.forEach(menu => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${menu.link}" onclick="navigateTo('${menu.name}')">
          <i class="${menu.icon}"></i> ${menu.name}
        </a>
      `;
      navbarList.appendChild(li);
    });
  } else {
    navbarList.innerHTML = '<li><p>Tidak ada menu tersedia untuk Anda.</p></li>';
  }
};

// Fungsi untuk menavigasi ke halaman tertentu
const navigateTo = (page) => {
  const pageTitle = document.getElementById('pageTitle');
  const dashboardCards = document.getElementById('dashboardCards');

  pageTitle.textContent = page;
  dashboardCards.innerHTML = `
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          ${pageContent[page]}
        </div>
      </div>
    </div>
  `;
};

// Inisialisasi
loadMenuByUserID(currentUser.id);
navigateTo('Home'); // Default halaman pertama
