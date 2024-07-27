const API_URL = 'http://127.0.0.1:8000/api/mesas';

export async function getMesas() {
    const response = await fetch(API_URL,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export async function getMesa(id) {
    const response = await fetch(`${API_URL}/${id}`,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}

export async function createMesa(mesa) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(mesa),
    });
    return response.json();
}

export async function updateMesa(id, mesa) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(mesa)
    });
    return response.json();
}

export async function deleteMesa(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
