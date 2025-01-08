import { Link } from 'react-router-dom';
import './ProfilePanel.css';

interface ProfilePanelProps {
  onClose: () => void
}

export function ProfilePanel({ onClose }: ProfilePanelProps) {
 
  interface User {
    user: string;
    name: string;
    email: string;
  }
  
  let user: User = {
    user: '',
    name: '',
    email: ''
  };

  try {
    const storedUser = sessionStorage.getItem('user');
    
    if (storedUser) {
      user = JSON.parse(storedUser)
    } else {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        user = JSON.parse(localUser);
      }
    }
  } catch (error) {
  }

  return (
    <div className="profilePanel">
      <div className="profilePanel__header">
        <h2 className="profilePanel__title">Profile</h2>
        <button onClick={onClose} className="profilePanel__closeButton">
        <i className="fa-sharp fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="profilePanel__content">
        <div className="profilePanel__info">
          <h3 className="profilePanel__name">{user.user}</h3>
          <p className="profilePanel__email">{user.name}</p>
          <p className="profilePanel__email">{user.email}</p>
        </div>
        <div className="profilePanel__actions">
          <Link to="/myreserv" className="profilePanel__actionButton">Ver Reservas</Link>
        </div>
      </div>
    </div>
  )
}
