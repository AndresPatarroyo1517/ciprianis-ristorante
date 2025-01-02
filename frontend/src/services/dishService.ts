const BASE_URL = 'http://localhost:3000/dishes';

export const getAllDishes = async () => {
    const response = await fetch(`${BASE_URL}/all`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
    })

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message)
    }
    const data = await response.json()
    return data;
}

export const getDish = async (query: string) => {
    const response = await fetch(`${BASE_URL}/find?q=${encodeURIComponent(query)}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
    const data = await response.json()
    return data;
}

export const getDishCategory = async (category: string) => {
    const response = await fetch(`${BASE_URL}/category/${category}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' }
    })

    if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
    }
    const data = await response.json();
    return data;
}

export const createDish = async (name: string, description: string, price: number, image: string, category: string, ingredients: string[]) => {
    const body = {
        name: name,
        description: description,
        category: category,
        price: price,
        ingredients: ingredients,
        image: image
    }
    const response = await fetch(BASE_URL, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
    const data = await response.json()
    return data
}

export const patchDish = async (id: string, name: string, description: string, price: number, image: string, category: string, ingredients: string[]) => {
    const body = {
        name: name,
        description: description,
        category: category,
        price: price,
        ingredients: ingredients,
        image: image
    }
    const response = await fetch(`${BASE_URL}/patch/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
    const data = await response.json()
    return data;
}

export const deleteDish = async (id: string) => {
    const response = await fetch(`${BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
    const data = await response.json()
    return data
}