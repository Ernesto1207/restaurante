const apiUrl = 'http://127.0.0.1:8000/api';

export async function getDishes() {
    const response = await fetch(`${apiUrl}/dishes`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}

export async function getDish(id) {
    const response = await fetch(`${apiUrl}/dishes/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await response.json();
}

export async function createDish(dish) {
    const response = await fetch(`${apiUrl}/dishes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dish)
    });
    return await response.json();
}

export async function updateDish(id, dish) {
    const response = await fetch(`${apiUrl}/dishes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(dish)
    });
    return await response.json();
}

export async function deleteDish(id) {
    await fetch(`${apiUrl}/dishes/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}
