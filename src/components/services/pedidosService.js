const API_URL = 'http://127.0.0.1:8000/api/pedidos';

export async function getPedidos() {
    const response = await fetch(API_URL, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

export async function getPedido(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return response.json();
}

// export async function createPedido(pedido) {
//     const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//         },
//         body: JSON.stringify(pedido)
//     });
//     return await response.json();
// }

export async function createPedido(pedido) {
    const response = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            mesa_id: pedido.mesa_id,
            user_id: pedido.user_id,
            estado: pedido.estado,
            dishes: pedido.dishes
        })
    });

    if (!response.ok) {
        const errorText = await response.text(); // Obtén el texto de la respuesta
        throw new Error(`Error en la solicitud: ${errorText}`);
    }

    return await response.json();
}


export async function updatePedido(id, pedido) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(pedido)
    });
    return response.json();
}

export async function deletePedido(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
}

export async function actualizarEstadoPedido(id, estado) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ estado })
    });
    return response.json();
}
// services/pedidosService.js
export async function getAllPedidos() {
    const response = await fetch(`${API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    if (!response.ok) {
        throw new Error('Error al obtener los pedidos');
    }
    return await response.json();
}
