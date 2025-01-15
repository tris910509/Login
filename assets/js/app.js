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
