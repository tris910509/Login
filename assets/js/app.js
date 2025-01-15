//Fungsi JavaScript untuk Login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulasi login (gunakan localStorage untuk data user)
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        // Simpan user yang sedang login di localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = 'dashboard.html'; // Arahkan ke dashboard
    } else {
        Swal.fire('Login gagal', 'Username atau password salah!', 'error');
    }
});


// Menambahkan pengguna baru
document.getElementById('addUserForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username: newUsername, password: newPassword });

    localStorage.setItem('users', JSON.stringify(users));

    Swal.fire('Berhasil', 'Pengguna berhasil ditambahkan!', 'success');
    renderUsers(); // Menampilkan daftar pengguna
    $('#addUserModal').modal('hide'); // Menutup modal
});

// Render daftar pengguna
function renderUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = ""; // Kosongkan tabel

    users.forEach((user, index) => {
        const row = `
            <tr>
                <td>${user.username}</td>
                <td>${user.password}</td>
                <td><button class="btn btn-danger" onclick="deleteUser(${index})">Hapus</button></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Menghapus pengguna
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1);
    localStorage.setItem('users', JSON.stringify(users));
    renderUsers();
}

// Panggil fungsi renderUsers saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderUsers);

//elanggan 
// Menambahkan pelanggan baru
document.getElementById('addPelangganForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const namaPelanggan = document.getElementById('namaPelanggan').value;
    const jenisPelanggan = document.getElementById('jenisPelanggan').value;

    const pelanggan = JSON.parse(localStorage.getItem('pelanggan')) || [];
    pelanggan.push({ nama: namaPelanggan, jenis: jenisPelanggan });

    localStorage.setItem('pelanggan', JSON.stringify(pelanggan));

    Swal.fire('Berhasil', 'Pelanggan berhasil ditambahkan!', 'success');
    renderPelanggan(); // Menampilkan daftar pelanggan
    $('#addPelangganModal').modal('hide'); // Menutup modal
});

// Render daftar pelanggan
function renderPelanggan() {
    const pelanggan = JSON.parse(localStorage.getItem('pelanggan')) || [];
    const tableBody = document.querySelector("#pelangganTable tbody");
    tableBody.innerHTML = ""; // Kosongkan tabel

    pelanggan.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.nama}</td>
                <td>${item.jenis}</td>
                <td><button class="btn btn-danger" onclick="deletePelanggan(${index})">Hapus</button></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Menghapus pelanggan
function deletePelanggan(index) {
    const pelanggan = JSON.parse(localStorage.getItem('pelanggan')) || [];
    pelanggan.splice(index, 1);
    localStorage.setItem('pelanggan', JSON.stringify(pelanggan));
    renderPelanggan();
}

// Menambahkan pelanggan baru dengan validasi
document.getElementById('addPelangganForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const namaPelanggan = document.getElementById('namaPelanggan').value.trim();
    const jenisPelanggan = document.getElementById('jenisPelanggan').value;
    
    // Validasi input
    if (namaPelanggan === "") {
        Swal.fire('Error', 'Nama pelanggan tidak boleh kosong!', 'error');
        return;
    }

    if (jenisPelanggan === "") {
        Swal.fire('Error', 'Jenis pelanggan harus dipilih!', 'error');
        return;
    }

    // Simpan data ke localStorage
    const pelanggan = JSON.parse(localStorage.getItem('pelanggan')) || [];
    pelanggan.push({ nama: namaPelanggan, jenis: jenisPelanggan });

    localStorage.setItem('pelanggan', JSON.stringify(pelanggan));

    Swal.fire('Berhasil', 'Pelanggan berhasil ditambahkan!', 'success');
    renderPelanggan(); // Menampilkan daftar pelanggan
    $('#addPelangganModal').modal('hide'); // Menutup modal
});


// Panggil fungsi renderPelanggan saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderPelanggan);



//supplier
// Menambahkan supplier baru
document.getElementById('addSupplierForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const namaSupplier = document.getElementById('namaSupplier').value;
    const jenisSupplier = document.getElementById('jenisSupplier').value;

    const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    suppliers.push({ nama: namaSupplier, jenis: jenisSupplier });

    localStorage.setItem('suppliers', JSON.stringify(suppliers));

    Swal.fire('Berhasil', 'Supplier berhasil ditambahkan!', 'success');
    renderSuppliers(); // Menampilkan daftar supplier
    $('#addSupplierModal').modal('hide'); // Menutup modal
});

// Render daftar supplier
function renderSuppliers() {
    const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    const tableBody = document.querySelector("#supplierTable tbody");
    tableBody.innerHTML = ""; // Kosongkan tabel

    suppliers.forEach((item, index) => {
        const row = `
            <tr>
                <td>${item.nama}</td>
                <td>${item.jenis}</td>
                <td><button class="btn btn-danger" onclick="deleteSupplier(${index})">Hapus</button></td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Menghapus supplier
function deleteSupplier(index) {
    const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    suppliers.splice(index, 1);
    localStorage.setItem('suppliers', JSON.stringify(suppliers));
    renderSuppliers();
}


// Menambahkan supplier baru dengan validasi
document.getElementById('addSupplierForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const namaSupplier = document.getElementById('namaSupplier').value.trim();
    const jenisSupplier = document.getElementById('jenisSupplier').value;
    
    // Validasi input
    if (namaSupplier === "") {
        Swal.fire('Error', 'Nama supplier tidak boleh kosong!', 'error');
        return;
    }

    if (jenisSupplier === "") {
        Swal.fire('Error', 'Jenis supplier harus dipilih!', 'error');
        return;
    }

    // Simpan data ke localStorage
    const suppliers = JSON.parse(localStorage.getItem('suppliers')) || [];
    suppliers.push({ nama: namaSupplier, jenis: jenisSupplier });

    localStorage.setItem('suppliers', JSON.stringify(suppliers));

    Swal.fire('Berhasil', 'Supplier berhasil ditambahkan!', 'success');
    renderSuppliers(); // Menampilkan daftar supplier
    $('#addSupplierModal').modal('hide'); // Menutup modal
});

// Panggil fungsi renderSuppliers saat halaman dimuat
document.addEventListener('DOMContentLoaded', renderSuppliers);


// kategori



// Konfirmasi Pembayaran
function confirmPayment(transactionId) {
    Swal.fire({
        title: 'Konfirmasi Pembayaran',
        text: 'Apakah Anda yakin ingin membayar transaksi ini?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Bayar',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            // Update status pembayaran transaksi
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            const transaction = transactions.find(t => t.id === transactionId);
            if (transaction) {
                transaction.status = 'Paid';
                localStorage.setItem('transactions', JSON.stringify(transactions));
                Swal.fire('Pembayaran Berhasil', 'Pembayaran telah diproses.', 'success');
            }
        }
    });
}


