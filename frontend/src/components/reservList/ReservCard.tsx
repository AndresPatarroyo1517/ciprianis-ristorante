import { useState} from 'react'
import { Reservation, User } from '../../types/const'
import './ReservCard.css'
import { deleteReserv, patchReserv } from '../../services/bookService'

interface ReservCardProps {
    user: User | null;
    reserv: Reservation;
    onStatusChange?: (id: string, newStatus: Reservation['status']) => void;
    isAdmin: boolean;
}

export const ReservCard: React.FC<ReservCardProps> = ({ user, reserv, onStatusChange, isAdmin }) => {
    const [error, setError] = useState<string | null>(null)

    const handleCancel = async () => {
        try {
            await deleteReserv(reserv._id)
            alert('Reservación cancelada correctamente')
        } catch (e) {
            setError((e as Error).message)
        }
    }

    const handleStatusChange = async (newStatus: Reservation['status']) => {
        try {
            await patchReserv(reserv._id, newStatus)
            if (onStatusChange) onStatusChange(reserv._id, newStatus)
        } catch (e) {
            setError((e as Error).message)
        }
    };

    return (
        <div className="reservation-card">
            {error && (
                <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                </div>
            )}

            <div className="card-header">
                <div className="header-main">
                    <div className="date">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{new Date(reserv.date).toLocaleDateString()}</span>
                    </div>

                    {user?.role === 'administrador' && (
                        <div className="user-info">
                            <i className="fas fa-user"></i>
                            <span>{user?.name}</span>
                        </div>
                    )}
                </div>

                {isAdmin && (
                    <select
                        value={reserv.status}
                        onChange={(e) =>
                            handleStatusChange(e.target.value as Reservation['status'])
                        }
                        className="status-select"
                    >
                        {['Pendiente', 'Confirmada', 'Finalizada', 'Cancelada'].map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                )}
            </div>

            <div className="card-body">
                <div className="info-item">
                    <i className="fas fa-chair"></i>
                    <span>Mesa {reserv.table}</span>
                </div>

                <div className="info-item">
                    <i className="fas fa-users"></i>
                    <span>{reserv.numOfPersons} personas</span>
                </div>

                <div className="time-info">
                    <i className="fas fa-clock"></i>
                    <span>
                        {reserv.startHour.toLocaleTimeString()} - {reserv.endHour.toLocaleTimeString()}
                    </span>
                </div>
            </div>
            {!isAdmin && (
                <div className="card-actions">
                    <button className="action-btn cancel" onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                        <span>Cancelar</span>
                    </button>
                </div>
            )}
        </div>
    );
};
