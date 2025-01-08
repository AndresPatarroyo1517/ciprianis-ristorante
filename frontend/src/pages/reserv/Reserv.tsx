import { useState, useEffect } from 'react'
import { getAllReserv } from '../../services/bookService'
import { User, Reservation } from '../../types/const'
import { useVerifyAdmin } from '../../hooks/useVerifyAdmin/useVerifyAdmin'
import { ReservCard } from '../../components/reservList/ReservCard'
import './Reserv.css'
import { Link } from 'react-router-dom'

export function ReservationList() {
    const [isHiding, setIsHiding] = useState(false);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [user, setUser] = useState<User | null>(null)
    const adminStatus = useVerifyAdmin() ?? false

    const fetchReservations = async () => {
        try {
            const reserv = await getAllReserv()
            console.log(reserv)
            setReservations(reserv)
            setLoading(false)
        } catch (e) {
            setError((e as Error).message)
            setLoading(false)
        }
    }

    const getUser = (): void => {
        try {
            const storedUser = sessionStorage.getItem('user') || localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser))
            }
        } catch (e) {
            console.error('Error al obtener el usuario', e)
            setError('Error al obtener el usuario')
        }
    }

    useEffect(() => {
        getUser()
        fetchReservations()
    }, [])

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setIsHiding(true)

                const removeErrorTimer = setTimeout(() => {
                    setIsHiding(false)
                    setError(null)
                }, 500)

                return () => clearTimeout(removeErrorTimer)
            }, 2000);

            return () => clearTimeout(timer)
        }
    }, [error])

    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="spinner"></div>
            </div>
        )
    }

    return (
        <div>
            {error && (
                <div className={`error-message ${isHiding ? "hide" : ""}`}>
                    <i className="fas fa-exclamation-circle"></i> {error}
                </div>
            )}
            <div className="reservation-list">
                <div className="list-header">
                    <h1>
                        <Link to='/' style={{ color: '#8c7355' }}><i className="fa-solid fa-arrow-left"></i></Link>
                        <i className="fas fa-utensils" style={{ color: '#8c7355' }}></i>
                        {adminStatus ? 'Gestión de Reservaciones' : 'Mis Reservaciones'}
                    </h1>
                </div>
                <div className="cards-container">
                    {user && reservations.length > 0 ? (
                        reservations.map((reserv) => (
                            <ReservCard
                                key={reserv._id}
                                user={user}
                                isAdmin={adminStatus}
                                reserv={reserv}
                            />
                        ))
                    ) : (
                        <div className="empty-state">
                            <i className="fas fa-calendar-times fa-3x" style={{ color: '#745B3C', marginBottom: '1rem' }}></i>
                            <h3>No hay reservaciones disponibles</h3>
                            <p>No se encontraron reservaciones en este momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}