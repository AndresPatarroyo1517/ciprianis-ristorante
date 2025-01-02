import { useState } from 'react'
import { Orders } from '../../../types/const'
import { CartItem } from '../CartItem'
import './DeliveredOrders.css'

export const DeliveredOrders: React.FC<Orders> = ({ items }) => {
    const [isOpen, setIsOpen] = useState(false)
  
    if (items.length === 0) return null
  
    return (
      <div className="delivered-orders">
        <button 
          className="delivered-orders-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>Pedidos Entregados ({items.length})</span>
          {isOpen ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-chevron-down"></i>}
        </button>
        
        {isOpen && (
          <div className="delivered-orders-list">
            {items.map(item => (
              <CartItem
                key={item._id}
                item={item}
                showControls={false}
              />
            ))}
          </div>
        )}
      </div>
    )
  }