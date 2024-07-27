const userRole = (() => {
    let role = null;
    const subscribers = [];

    const set = (newRole) => {
        role = newRole;
        // console.log('Role Set:', role); // Depuración
        subscribers.forEach(callback => callback(role));
    };

    const subscribe = (callback) => {
        subscribers.push(callback);
        callback(role);
        return () => {
            const index = subscribers.indexOf(callback);
            if (index !== -1) subscribers.splice(index, 1);
        };
    };

    return {
        set,
        subscribe,
        get: () => role
    };
})();

const roleMapping = {
    1: 'mesero',
    2: 'cocina',
    3: 'administrador'
};

export async function login(email, password) {
    const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log('Login Response:', data);

    if (response.ok) {
        localStorage.setItem('token', data.token);
        userRole.set(data.role); // Establecer el rol directamente
        return data.role;
    } else {
        throw new Error(data.message || 'Error during login');
    }
}

export async function fetchUserRole() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch('http://127.0.0.1:8000/api/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    localStorage.setItem('id', data.id)
    // console.log('API Response:', data);

    if (response.ok) {
        const role = roleMapping[data.role_id];
        console.log('Fetched Role:', role); // Depuración
        userRole.set(role);
        return role;
    } else {
        logout();
        throw new Error(data.message || 'Error fetching user role');
    }
}

export function logout() {
    localStorage.removeItem('token');
    userRole.set(null);
    window.location.href = '/';
}

export function getRole() {
    const role = userRole.get();
    //console.log('Get Role:', role); // Depuración
    return role;
}

export function subscribeRole(callback) {
    return userRole.subscribe(callback);
}

export async function protectRoute(requiredRole) {
    const currentRole = getRole();
    if (!currentRole) {
        try {
            const role = await fetchUserRole();
            if (role !== requiredRole) {
                window.location.href = '/';
            }
        } catch (err) {
            window.location.href = '/';
        }
    } else if (currentRole !== requiredRole) {
        window.location.href = '/';
    }
}

export async function redirectToRolePage() {
    try {
        const role = await fetchUserRole();
        if (role === 'administrador') {
            window.location.href = '/administrador';
        } else if (role === 'mesero') {
            window.location.href = '/mesero';
        } else if (role === 'cocina') {
            window.location.href = '/cocina';
        }
    } catch (err) {
        console.error('Error redirecting based on role:', err);
        // window.location.href = '/';
    }
}

export async function createUser(name, email, password, role_id) {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }

    const response = await fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, password, role_id })
    });

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message || 'Error creating user');
    }
}

// services/authService.js

export function fetchUser() {
    return localStorage.getItem('id')
}
