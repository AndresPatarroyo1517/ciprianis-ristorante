const CART_BASE_URL = 'http://localhost:3000/shoppingCart'

export const getAll = async () => {
    const response = await fetch(`${CART_BASE_URL}/all`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
    }
    const info = await response.json()
    return info.data;
}

export const addToCart = async (dishId: string, quantity: number) => {
    const body = {
        dish: dishId,
        quantity: quantity
    };
    const response = await fetch(CART_BASE_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    const data = await response.json();
    return data;
}

export const removeFromCart = async (dishId: string) => {
    const response = await fetch(`${CART_BASE_URL}/delete/${dishId}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    const data = await response.json();
    return data;
}

export const getMy = async () => {
    const response = await fetch(`${CART_BASE_URL}/my`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    });

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error);
    }
    const info = await response.json()
    return info.data;
}

export const updateCart = async (dishId: string, quantity:number) => { 
    const body = {
        quantity: quantity,
        status: 'Plato en camino'
    }
    const response = await fetch(`${CART_BASE_URL}/update/${dishId}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    const data = await response.json();
    return data
}

export const adminUpdateStatus = async (dishId: string) => { 
    const body = {
        status: 'Plato entregado'
    }
    const response = await fetch(`${CART_BASE_URL}/update/${dishId}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    const data = await response.json();
    return data
}