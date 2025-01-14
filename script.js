// Simulasi data pengguna yang login
const currentUser = {
  id: 'USR001',
  name: 'John Doe',
  role: 'Admin'
};

// Menu akses per pengguna
const menuAccess = {
  USR001: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' },
    { name: 'User Management', icon: 'fas fa-users', link: '#users' },
    { name: 'Transaksi', icon: 'fas fa-money-check-alt', link: '#transaksi' },
    { name: 'Laporan', icon: 'fas fa-file-alt', link: '#laporan' }
  ],
  USR002: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' },
    { name: 'Transaksi', icon: 'fas fa-money-check-alt', link: '#transaksi' }
  ],
  USR003: [
    { name: 'Home', icon: 'fas fa-home', link: '#home' }
  ]
};

// Data untuk kartu
const dashboardData = {
  Admin: {
    profile: { name: 'John Doe', role: 'Admin', email: 'admin@example.com' },
    pelanggan: 120,
    transaksi: 300,
    chartData: [10, 20, 30, 40]
  },
  Kasir: {
    profile: { name: 'Jane Smith', role: 'Kasir', email: 'kasir@example.com' },
    pelanggan: 50,
    transaksi: 150,
    chartData: [5, 15, 25, 35]
  },
  Other: {
    profile: { name: 'Tom Brown', role: 'Other', email: 'other@example.com' },
    pelanggan: 0,
    transaksi: 0,
    chartData: [0, 0, 0, 0]
  }
};

// Fungsi untuk memuat menu
const loadMenuByUserID = (userID) => {
  const navbarList = document.getElementById('navbarList');
  navbarList.innerHTML = ''; // Reset menu sebelumnya

  if (menuAccess[userID]) {
    const menus = menuAccess[userID];
    menus.forEach(menu => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${menu.link}">
          <i class="${menu.icon}"></i> ${menu.name}
        </a>
      `;
      navbarList.appendChild(li);
    });
  } else {
    navbarList.innerHTML = '<li><p>Tidak ada menu tersedia untuk Anda.</p></li>';
  }
};

// Fungsi untuk memuat kartu di dashboard
const loadDashboardCards = (role) => {
  const dashboardCards = document.getElementById('dashboardCards');
  dashboardCards.innerHTML = ''; // Reset card sebelumnya

  const data = dashboardData[role];

  // Card Profil
  const profileCard = `
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Profil</h5>
          <p>Nama: ${data.profile.name}</p>
          <p>Peran: ${data.profile.role}</p>
          <p>Email: ${data.profile.email}</p>
        </div>
      </div>
    </div>
  `;

  // Card Pelanggan
  const pelangganCard = `
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Pelanggan</h5>
          <p>Total Pelanggan: ${data.pelanggan}</p>
        </div>
      </div>
    </div>
  `;

  // Card Transaksi
  const transaksiCard = `
    <div class="col-md-6">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Laporan Transaksi</h5>
          <p>Total Transaksi: ${data.transaksi}</p>
        </div>
      </div>
    </div>
  `;

  // Card Chart
  const chartCard = `
    <div class="col-md-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Statistik</h5>
          <canvas id="chart"></canvas>
        </div>
      </div>
    </div>
  `;

  dashboardCards.innerHTML = profileCard + pelangganCard + transaksiCard + chartCard;

  // Render chart
  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr'],
      datasets: [{
        label: 'Data',
        data: data.chartData,
        backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545']
      }]
    }
  });
};

// Inisialisasi
loadMenuByUserID(currentUser.id);
loadDashboardCards(currentUser.role);
