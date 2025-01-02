import { ReservationFormData } from '../types/const';
const BASE_URL = 'http://localhost:3000/reservations';

export const getDateBooks = async (date: string) => {
    const response = await fetch(`${BASE_URL}/find?date=${date}`, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include'
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
    const data = await response.json()
    return data.data
}

export const postBook = async (book: ReservationFormData) => {
    const formattedBook = {
        ...book,
        startHour: new Date(`${book.date}T${book.startHour}:00`),
        endHour: book.endHour
            ? new Date(`${book.date}T${book.endHour}:00`)
            : null
    }
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formattedBook)
    })

    if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message)
    }
    const data = await response.json()
    return data
}

export const getAllReserv = async () => {
    const response = await fetch(`${BASE_URL}/all`, {
        method: 'GET',
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

export const deleteReserv = async (id: string) => {
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

export const patchReserv = async (id: string, status: string) => {
    const body = {
        status: status
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
    return data
}