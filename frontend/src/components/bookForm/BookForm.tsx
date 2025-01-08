import { useEffect, useState } from "react"
import { ReservationFormData } from "../../types/const"
import { postBook } from "../../services/bookService"
import { useAuth } from "../../hooks/auth/useAuth"
import { Link } from "react-router-dom"
import './BookForm.css'

export function BookForm() {
  const [isHiding, setIsHiding] = useState(false)
  const { isLogged } = useAuth()
  const [formData, setFormData] = useState<ReservationFormData>({
    numOfPersons: 1,
    table: 1,
    date: new Date().toISOString().split('T')[0],
    startHour: '',
    endHour: ''
  })
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setIsHiding(true)
        const removeErrorTimer = setTimeout(() => {
          setIsHiding(false)
          setError(null)
        }, 500)

        return () => clearTimeout(removeErrorTimer);
      }, 2000)

      return () => clearTimeout(timer);
    }
  }, [error])

  const calculateTimeLimits = (startHour: string) => {
    if (!startHour) return { minTime: '10:00', maxTime: '20:00' }

    const [hours, minutes] = startHour.split(':').map(Number)
    const startDate = new Date()
    startDate.setHours(hours, minutes, 0)

    const minDate = new Date(startDate)
    minDate.setHours(minDate.getHours() + 1)

    const maxDate = new Date(startDate);
    maxDate.setHours(maxDate.getHours() + 2)

    const formatTime = (date: Date) =>
      `${date.getHours().toString().padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;

    return {
      minTime: formatTime(minDate),
      maxTime: formatTime(maxDate),
    }
  }

  const handleStartHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const startHour = e.target.value
    setFormData({ ...formData, startHour, endHour: '' })

    const { minTime, maxTime } = calculateTimeLimits(startHour)

    const endHourInput = document.getElementById('endHour') as HTMLInputElement
    if (endHourInput) {
      endHourInput.min = minTime
      endHourInput.max = maxTime
    }
  }

  const handleEndHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const endHour = e.target.value
    if (formData.startHour && endHour) {
      const [startHours, startMinutes] = formData.startHour.split(':').map(Number)
      const [endHours, endMinutes] = endHour.split(':').map(Number)
      const startTime = new Date()
      startTime.setHours(startHours, startMinutes, 0)
      const endTime = new Date()
      endTime.setHours(endHours, endMinutes, 0)

      if (endTime <= startTime) {
        setError('La hora de fin debe ser después de la hora de inicio')
        return
      }
    }

    setFormData({ ...formData, endHour })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (!formData.startHour) {
        throw new Error('Por favor selecciona una hora de inicio')
      }
      await postBook(formData)
    } catch (e) {
      setError((e as Error).message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      {error && (
        <div className={`error-message ${isHiding ? "hide" : ""}`}>
          <i className="fas fa-exclamation-circle"></i> {error}
        </div>
      )}
      <div className="form-group">
        <label className="form-label">
          <i className="fas fa-users"></i>
          Número de Personas
          <input
            type="number"
            min="1"
            value={formData.numOfPersons}
            onChange={(e) => setFormData({ ...formData, numOfPersons: parseInt(e.target.value) })}
            className="form-input"
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          <i className="fas fa-chair"></i>
          Mesa
          <select
            value={formData.table}
            onChange={(e) => setFormData({ ...formData, table: parseInt(e.target.value) })}
            className="form-select"
            required
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                Mesa {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="form-group">
        <label className="form-label">
          <i className="fas fa-calendar"></i>
          Fecha
          <input
            type="date"
            value={formData.date}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="form-input"
            required
          />
        </label>
      </div>
      <div className="time-inputs">
        <label className="form-label">
          <i className="fas fa-clock"></i>
          Hora Inicio
          <input
            type="time"
            value={formData.startHour}
            min='10:00'
            max='20:00'
            onChange={handleStartHourChange}
            className="form-input"
            required
          />
        </label>

        <label className="form-label">
          <i className="fas fa-clock"></i>
          Hora Fin
          <input
            type="time"
            id="endHour"
            value={formData.endHour}
            onChange={handleEndHourChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-info">
        <i className="fas fa-info-circle"></i>
        Horario de atención: 10:00 - 22:00
        <br />
        <small>Última reservación: 21:00</small>
      </div>
      {isLogged ? <button type="submit" className="submit-button">
        Crear Reservación
      </button> : <Link to='/login'><button type="button" className="submit-button">Iniciar Sesión</button></Link>}
    </form>
  )
}