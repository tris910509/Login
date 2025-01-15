document.addEventListener('DOMContentLoaded', function () {
    const navbarContainer = document.getElementById('navbarContainer');
    const addUserBtn = document.getElementById('addUserBtn');
    const usersTable = document.getElementById('usersTable').getElementsByTagName('tbody')[0];
    const addUserForm = document.getElementById('addUserForm');
    const addUserModal = new bootstrap.Modal(document.getElementById('addUserModal'));

    const userData = JSON.parse(localStorage.getItem('loggedIn'));
    if (!userData) {
        Swal.fire('Akses Ditolak', 'Silakan login terlebih dahulu.', 'error').then(() => {
            window.location.href = 'index.html';
        });
    } else {
        const { username, role } = userData;

        // Generate Navbar
        const navbar = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Dashboard</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav" id="menuList"></ul>
                        <button id="logoutButton" class="btn btn-danger ms-auto">Logout</button>
                    </div>
                </div>
            </nav>
        `;
        navbarContainer.innerHTML = navbar;

        // Ensure only Admin can see the user management
        if (role !== 'Admin') {
            Swal.fire('Akses Ditolak', 'Hanya Admin yang dapat mengelola pengguna.', 'error').then(() => {
                window.location.href = 'dashboard.html';
            });
        }

        // Add User Button
        addUserBtn.addEventListener('click', () => {
            addUserModal.show();
        });

        // Add User Form Submission
        addUserForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const role = document.getElementById('role').value;
            const password = document.getElementById('password').value;

            // Hash the password using SHA-256
            const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64);

            const newUser = {
                username,
                role,
                password: hashedPassword,
                status: 'on' // Default status is on
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            Swal.fire('Berhasil', 'Pengguna berhasil ditambahkan!', 'success').then(() => {
                addUserModal.hide();
                loadUsers(); // Reload users table
            });
        });

        // Load Users into Table
        function loadUsers() {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            usersTable.innerHTML = ''; // Clear table

            users.forEach((user, index) => {
                const row = usersTable.insertRow();
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${user.username}</td>
                    <td>${user.role}</td>
                    <td>
                        <button class="btn btn-${user.status === 'on' ? 'success' : 'danger'} btn-sm" onclick="toggleStatus(${index})">
                            <i class="fas fa-toggle-${user.status === 'on' ? 'on' : 'off'}"></i> ${user.status === 'on' ? 'Aktif' : 'Nonaktif'}
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editUser(${index})"><i class="fas fa-edit"></i> Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})"><i class="fas fa-trash"></i> Hapus</button>
                    </td>
                `;
            });
        }

        // Toggle Status
        window.toggleStatus = function (index) {
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users[index];
            user.status = user.status === 'on' ? 'off' : 'on';
            localStorage.setItem('users', JSON.stringify(users));
            loadUsers(); // Reload users table
        };

        // Edit User
        window.editUser = function (index) {
            const users = JSON.parse(localStorage.getItem('users'));
            const user = users[index];
            document.getElementById('username').value = user.username;
            document.getElementById('role').value = user.role;
            document.getElementById('password').value = ''; // Don't prefill password
            addUserModal.show();
        };

        // Delete User
        window.deleteUser = function (index) {
            const users = JSON.parse(localStorage.getItem('users'));
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            Swal.fire('Berhasil', 'Pengguna berhasil dihapus!', 'success').then(() => {
                loadUsers(); // Reload users table
            });
        };

        // Load users on page load
        loadUsers();
    }

    // Logout
    document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedIn');
        Swal.fire('Logout Berhasil', 'Anda telah keluar!', 'success').then(() => {
            window.location.href = 'index.html';
        });
    });
});
