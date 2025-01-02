import { useState } from 'react'
import { removeFromCart, adminUpdateStatus } from '../../services/cartService'
import './CartItem.css'
import { Order } from '../../types/const'
import { OrderStatusBadge } from './orderType/OrderStatus'
import { useVerifyAdmin } from '../../hooks/useVerifyAdmin/useVerifyAdmin'

interface CartItemProps {
  item: Order,
  onRemove?: (id: string) => void,
  onQuantityChange?: (id: string, quantity: number) => void,
  onStatusChange?: (id: string, status: string) => void
  showControls?: boolean
}

export const CartItem: React.FC<CartItemProps> = ({ item, onRemove, showControls, onQuantityChange, onStatusChange }) => {
  const [quantity, setQuantity] = useState(item.quantity)
  const isAdmin = useVerifyAdmin()

  const handleRemove = async (id: string) => {
    await removeFromCart(id)
    onRemove?.(id)
  }

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
      onQuantityChange?.(item._id, newQuantity)
    }
  }
  const handleStatusUpdate = async (id: string) => {

    await adminUpdateStatus(id)
    onStatusChange?.(id, 'Plato entregado')
  }

  const handleDate = (date: string) => {
    const fecha = new Date(date)
    return `${fecha.getDate().toString().padStart(2, '0')}/${(fecha.getMonth() + 1).toString().padStart(2, '0')}/${fecha.getFullYear()} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`
  }

  const { dish } = item

  return (
    <div className="cart-item">
      <img
        src={dish.image}
        alt={dish.name}
        className="cart-item-image"
      />
      <div className="cart-item-details">
        {isAdmin ? <div className="cart-item-order-info">
          <div className="cart-item-order-detail">
            <i className="fa-solid fa-hashtag"></i>
            <span>{item._id}</span>
          </div>
          <div className="cart-item-order-detail">
            <i className="fa-regular fa-user"></i>
            <span>{item.user.username}</span>
          </div>
          <div className="cart-item-order-detail">
            <i className="fa-solid fa-clock"></i>
            <span>{handleDate(item.orderDate)}</span>
          </div>
        </div> : null}
        <h3 className="cart-item-name">{dish.name}</h3>
        <p className="cart-item-price">${dish.price}</p>
        <OrderStatusBadge status={item.status} />
      </div>
      {showControls && !isAdmin && (
        <>
          <div className="cart-item-quantity">
            <button
              onClick={() => updateQuantity(quantity - 1)}
              className="cart-item-quantity-button"
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="cart-item-quantity-value">{quantity}</span>
            <button
              onClick={() => updateQuantity(quantity + 1)}
              className="cart-item-quantity-button"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
          <button
            onClick={() => handleRemove(item._id)}
            className="cart-item-remove">
            <i className="fa-regular fa-trash-can" style={{ color: '#fbbf24' }}></i>
          </button>
        </>
      )}
      {isAdmin && item.status === 'Plato en camino' && (
        <button onClick={() => handleStatusUpdate(item._id)}>
          <i className="fa-solid fa-check" style={{ color: '#16a34a' }}></i>
        </button>
      )}
    </div>
  )
}