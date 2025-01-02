import { CartItem } from '../CartItem'
import { Order } from '../../../types/const'
import './ActiveOrder.css'

interface CartItemProps {
    item: Order[],
    onRemove: (id: string) => void,
    onQuantityChange: (id: string, quantity: number) => void
}

export const ActiveOrders: React.FC<CartItemProps> = ({ item , onRemove, onQuantityChange }) => {
    if (!item) return null
    return (
        <div className="active-orders">
            <h3 className="active-orders-title">Pedidos</h3>
            <div className="active-orders-list">
                {item.map(items => (
                    <CartItem
                        key={items._id}
                        item={items}
                        onRemove={onRemove}
                        onQuantityChange={onQuantityChange}
                        showControls={true}
                    />
                ))}
            </div>
        </div>
    )
}
