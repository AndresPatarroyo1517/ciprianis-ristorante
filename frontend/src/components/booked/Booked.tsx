import { useEffect, useState } from 'react';
import { GroupedReservations, Reservation } from '../../types/const'
import { getDateBooks } from '../../services/bookService';
import './Booked.css'

export function Booked() {
    const [reservations, setReservations] = useState<GroupedReservations[]>([])
    const [date, setDate] = useState<string>(() => {
        const today = new Date()
        return today.toISOString().split('T')[0]
    })
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const formatTime = (date: Date) => {
        return new Date(date).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const getStatusClass = (status: Reservation['status']) => {
        switch (status) {
            case 'Confirmada':
                return 'status-confirmed'
            case 'Finalizada':
            case 'Cancelada':
                return 'status-cancelled'
            default:
                return 'status-pending'
        }
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }

    const formatDisplayDate = (date: string) => {
        const parsedDate = new Date(date + 'T00:00:00')
        return parsedDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            if (!date) return 

            setIsLoading(true)
            setError(null)

            try {
                const data = await getDateBooks(date)
                setReservations(data)
            } catch (e) {
                setError((e as Error).message)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [date])

    if (isLoading) {
        return <div className="loading-state">Cargando reservaciones...</div>
    }

    if (error) {
        return <div className="error-state">Error: {error}</div>
    }

    return (
        <div className="booked-container">
            <div className="booked-header">
                <h2 className="date-display">
                    Reservaciones para {formatDisplayDate(date)}
                </h2>
                <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    className="date-input"
                />
            </div>

            <div className="tables-grid">
                {reservations.map((group) => (
                    <div key={group.table} className="table-box">
                        <div className="table-header">
                            <i className="fas fa-chair"></i>
                            <span>Mesa {group.table}</span>
                        </div>
                        <div className="table-content">
                            {group.reservations.length === 0 ? (
                                <div className="no-reservations">Sin reservaciones</div>
                            ) : (
                                group.reservations.map((reservation) => (
                                    <div key={reservation._id} className="reservation-box">
                                        <div className="reservation-time">
                                            <i className="fas fa-clock"></i>
                                            <span>{formatTime(reservation.startHour)} - {formatTime(reservation.endHour)}</span>
                                        </div>
                                        <div className={`reservation-status ${getStatusClass(reservation.status)}`}>
                                            {reservation.status}
                                        </div>
                                        <div className="guest-count">
                                            <i className="fas fa-users"></i>
                                            <span>{reservation.numOfPersons} personas</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}