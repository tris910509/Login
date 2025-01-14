// Simulasi data pengguna yang login
const currentUser = {
  id: 'USR001',  // ID unik pengguna
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

// Fungsi untuk memuat menu sesuai ID pengguna
const loadMenuByUserID = (userID) => {
  const navbarList = document.getElementById('navbarList');
  navbarList.innerHTML = ''; // Reset menu sebelumnya

  // Cek apakah ID pengguna memiliki menu akses
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
    // Jika tidak ada akses, tampilkan pesan
    navbarList.innerHTML = '<li><p>Tidak ada menu tersedia untuk Anda.</p></li>';
  }
};

// Muat menu berdasarkan ID pengguna yang login
loadMenuByUserID(currentUser.id);
