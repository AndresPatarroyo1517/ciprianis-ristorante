import { useState } from 'react'
import { Order } from '../../../types/const'
import { CartItem } from '../CartItem'
import './PendingOrders.css'

interface pendingProps {
items: Order[], 
onStatusChange: (id: string, status:string) => void
}

export const PendingOrders: React.FC<pendingProps> = ({ items, onStatusChange }) => {
    const [isOpen, setIsOpen] = useState(true)
  
    if (items.length === 0) return null
  
    return (
      <div className="pending-orders">
        <button 
          className="pending-orders-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="pending-orders-header">
          <i className="fa-regular fa-clock"></i>
            <span>Pedidos en Espera ({items.length})</span>
          </div>
          <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`}></i>
        </button>
        
        {isOpen && (
          <div className="pending-orders-list">
            {items.map(item => (
              <CartItem
              key={item._id}
              item={item}
              showControls={false}
              onStatusChange={onStatusChange}
            />
            ))}
          </div>
        )}
      </div>
    )
  }