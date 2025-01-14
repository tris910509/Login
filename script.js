// Data Pengguna
const currentUser = {
  id: 'USR001',
  name: 'John Doe',
  role: 'Admin' // Role dapat diubah untuk pengujian: Admin, Kasir, Other
};

// Hak akses menu berdasarkan ID pengguna
const menuAccess = {
  USR001: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' },
    { name: 'User Management', icon: 'fas fa-users', link: '#users' },
    { name: 'Pelanggan', icon: 'fas fa-user-friends', link: '#pelanggan' },
    { name: 'Supplier', icon: 'fas fa-truck', link: '#supplier' },
    { name: 'Kategori', icon: 'fas fa-tags', link: '#kategori' },
    { name: 'Item', icon: 'fas fa-box', link: '#item' },
    { name: 'Produk', icon: 'fas fa-cube', link: '#produk' },
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

// Konten untuk setiap menu
const menuContent = {
  home: `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Welcome</h5>
        <p>Selamat datang di dashboard!</p>
      </div>
    </div>
  `,
  users: `
    <h3>Manajemen User</h3>
    <form id="userForm">
      <div class="form-group">
        <label for="userName">Nama User</label>
        <input type="text" id="userName" class="form-control" placeholder="Masukkan nama user">
      </div>
      <div class="form-group">
        <label for="userRole">Peran</label>
        <select id="userRole" class="form-control">
          <option>Admin</option>
          <option>Kasir</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-group">
        <label for="userEmail">Email</label>
        <input type="email" id="userEmail" class="form-control" placeholder="Masukkan email user">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  pelanggan: `
    <h3>Data Pelanggan</h3>
    <form id="pelangganForm">
      <div class="form-group">
        <label for="pelangganName">Nama Pelanggan</label>
        <input type="text" id="pelangganName" class="form-control" placeholder="Masukkan nama pelanggan">
      </div>
      <div class="form-group">
        <label for="pelangganContact">Kontak</label>
        <input type="text" id="pelangganContact" class="form-control" placeholder="Masukkan kontak">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  supplier: `
    <h3>Data Supplier</h3>
    <form id="supplierForm">
      <div class="form-group">
        <label for="supplierName">Nama Supplier</label>
        <input type="text" id="supplierName" class="form-control" placeholder="Masukkan nama supplier">
      </div>
      <div class="form-group">
        <label for="supplierContact">Kontak</label>
        <input type="text" id="supplierContact" class="form-control" placeholder="Masukkan kontak">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  kategori: `
    <h3>Kategori Produk</h3>
    <form id="kategoriForm">
      <div class="form-group">
        <label for="kategoriName">Nama Kategori</label>
        <input type="text" id="kategoriName" class="form-control" placeholder="Masukkan kategori">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  item: `
    <h3>Data Item</h3>
    <form id="itemForm">
      <div class="form-group">
        <label for="itemName">Nama Item</label>
        <input type="text" id="itemName" class="form-control" placeholder="Masukkan nama item">
      </div>
      <div class="form-group">
        <label for="itemStock">Stok</label>
        <input type="number" id="itemStock" class="form-control" placeholder="Masukkan stok">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  produk: `
    <h3>Data Produk</h3>
    <form id="produkForm">
      <div class="form-group">
        <label for="produkName">Nama Produk</label>
        <input type="text" id="produkName" class="form-control" placeholder="Masukkan nama produk">
      </div>
      <div class="form-group">
        <label for="produkPrice">Harga</label>
        <input type="number" id="produkPrice" class="form-control" placeholder="Masukkan harga">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  transaksi: `
    <h3>Data Transaksi</h3>
    <form id="transaksiForm">
      <div class="form-group">
        <label for="transaksiID">ID Transaksi</label>
        <input type="text" id="transaksiID" class="form-control" placeholder="Masukkan ID transaksi">
      </div>
      <div class="form-group">
        <label for="transaksiTotal">Total</label>
        <input type="number" id="transaksiTotal" class="form-control" placeholder="Masukkan total transaksi">
      </div>
      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  `,
  laporan: `
    <h3>Laporan</h3>
    <p>Fitur laporan akan menampilkan ringkasan data transaksi.</p>
  `
};

// Konten untuk halaman Home
menuContent.home = `
  <div class="row">
    <!-- Profil -->
    <div class="col-md-4">
      <div class="card">
        <div class="card-body text-center">
          <i class="fas fa-user-circle fa-4x mb-3"></i>
          <h5 class="card-title">${currentUser.name}</h5>
          <p class="card-text">Peran: ${currentUser.role}</p>
        </div>
      </div>
    </div>

    <!-- Statistik -->
    <div class="col-md-8">
      <div class="row">
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Pelanggan</h5>
              <p class="card-text" id="statPelanggan">0</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Supplier</h5>
              <p class="card-text" id="statSupplier">0</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Kategori</h5>
              <p class="card-text" id="statKategori">0</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">Produk</h5>
              <p class="card-text" id="statProduk">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Chart Laporan -->
  <div class="row mt-4">
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Laporan Transaksi</h5>
          <canvas id="chartLaporan"></canvas>
        </div>
      </div>
    </div>
  </div>
`;

// Data Dummy untuk Statistik
const dummyStats = {
  pelanggan: 120,
  supplier: 50,
  kategori: 20,
  produk: 150,
  laporan: [12, 15, 20, 25, 30, 50, 70] // Data transaksi bulanan
};

// Fungsi untuk memperbarui statistik
const updateStats = () => {
  document.getElementById('statPelanggan').innerText = dummyStats.pelanggan;
  document.getElementById('statSupplier').innerText = dummyStats.supplier;
  document.getElementById('statKategori').innerText = dummyStats.kategori;
  document.getElementById('statProduk').innerText = dummyStats.produk;
};

// Fungsi untuk membuat chart laporan transaksi
const loadChartLaporan = () => {
  const ctx = document.getElementById('chartLaporan').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [{
        label: 'Jumlah Transaksi',
        data: dummyStats.laporan,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        }
      }
    }
  });
};

// Panggil fungsi pada saat halaman Home dimuat
document.addEventListener('DOMContentLoaded', () => {
  if (currentUser.role === 'Admin' || currentUser.role === 'Kasir') {
    updateStats();
    loadChartLaporan();
  }
});


// Fungsi untuk memuat menu
const loadMenuByUserID = (userID) => {
  const navbarList = document.getElementById('navbarList');
  navbarList.innerHTML = '';

  if (menuAccess[userID]) {
    menuAccess[userID].forEach(menu => {
      const li = document.createElement('li');
      li.classList.add('nav-item');
      li.innerHTML = `
        <a href="#" class="nav-link" data-menu="${menu.link.replace('#', '')}">
          <i class="${menu.icon}"></i> ${menu.name}
        </a>
      `;
      navbarList.appendChild(li);
    });

    // Event Listener untuk setiap menu
    document.querySelectorAll('#navbarList .nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const menu = e.target.dataset.menu;
        loadContent(menu);
      });
    });
  }
};

// Fungsi untuk memuat konten
const loadContent = (menu) => {
  const pageTitle = document.getElementById('pageTitle');
  const pageContent = document.getElementById('pageContent');

  pageTitle.innerText = menu.charAt(0).toUpperCase() + menu.slice(1);
  pageContent.innerHTML = menuContent[menu] || `<p>Menu ${menu} tidak ditemukan.</p>`;
};

// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  loadMenuByUserID(currentUser.id);
  loadContent('home'); // Default ke halaman Home
});
