import "./Cart.css";
import { useState, useEffect, useRef } from 'react'
import { getAll, getMy, updateCart } from '../../services/cartService'
import { Success } from "../../components/success/Success"
import { Order } from '../../types/const'
import { useVerifyAdmin } from '../../hooks/useVerifyAdmin/useVerifyAdmin'
import { Link } from "react-router-dom"
import { ActiveOrders } from "../../components/cartItem/orderType/ActiveOrders"
import { DeliveredOrders } from "../../components/cartItem/orderType/DeliveredOrders"
import { PendingOrders } from "../../components/cartItem/orderType/PendingOrders"
import { OrderSended } from "../../components/success/OrderSended";

export function Cart() {
  const isAdmin = useVerifyAdmin()
  const [cart, setCart] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showOrder, setShowOrder] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showError, setShowError] = useState(false)
  const cartFetcherRef = useRef<() => Promise<void>>(async () => { })

  const removeItemFromCart = async (itemId: string) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== itemId))
    await cartFetcherRef.current()
  }

  const statusChange = async(itemId: string, status:string) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, status: status } : item
      )
    )
    setShowOrder(true)
    await cartFetcherRef.current()
  }

  const updateItemQuantity = async (itemId: string, newQuantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const activeOrders = cart.filter(item => item.status === 'En espera')
  const deliveredOrders = cart.filter(item => item.status === 'Plato entregado')
  const waitedOrders = cart.filter(item => item.status === 'Plato en camino')

  const total = activeOrders.reduce((acc, item) => acc + item.dish.price * item.quantity, 0)

  useEffect(() => {
    if (isAdmin === null) return

    const fetchCart = async () => {
      setLoading(true)
      setError(null)
      try {
        const cartData = isAdmin ? await getAll() : await getMy()
        setCart(cartData)
      } catch (e) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchCart()
    cartFetcherRef.current = fetchCart
  }, [isAdmin])

  const handleCheckout = async () => {
    setIsProcessing(true)
    try {
      const updatedOrders = activeOrders.map((item) => ({
        dishId: item._id,
        quantity: item.quantity
      }))

      await Promise.all(
        updatedOrders.map(async (order) => {
          await updateCart(order.dishId, order.quantity);
        })
      )

      setShowSuccess(true)
      await cartFetcherRef.current()
    } catch (error) {
      setError('Error al finalizar la compra. Intenta de nuevo.')
    } finally {
      setIsProcessing(false)
    }
  }

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
      }, 3000);
      return () => clearTimeout(timer)
    }
  }, [error])

  if (isAdmin === null) {
    return (
      <div className="cart-loading">
        <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "#Fd878d" }}></i>
        <p>Verificando permisos...</p>
      </div>
    )
  }

  return (
    <div className="cart-container">
      <div className="cart-wrapper">
        <div className="cart">
          <div className="cart-header">
            <h2 className="cart-title">
              <Link to="/">
                <i className="fa-solid fa-arrow-left" style={{ color: "#Fd878d" }}></i>
              </Link>
              <i className="fa-solid fa-bag-shopping fa-lg" style={{ color: "#Fd878d" }}></i>
              <span>{isAdmin ? "Pedidos" : "Mi carrito"}</span>
            </h2>
            <span className="cart-item-count">
              {activeOrders.length} {activeOrders.length === 1 ? "item" : "items"}
            </span>
          </div>

          {loading ? (
            <div className="cart-loading">
              <i className="fa-solid fa-spinner fa-spin fa-2x" style={{ color: "#Fd878d" }}></i>
              <p>Cargando...</p>
            </div>
          ) : error && showError ? (
            <div className="cart-error">
              <p>{error}</p>
            </div>
          ) : activeOrders.length === 0 && waitedOrders.length === 0 && deliveredOrders.length === 0 ? (
            <div className="cart-empty">
              <i className="fa-solid fa-cart-shopping fa-4x" style={{ color: "#Fd878d" }}></i>
              <p>
                {isAdmin
                  ? "No hay pedidos disponibles en este momento."
                  : "Tu carrito está vacío. ¡Explora nuestros platos y añade tus favoritos!"}
              </p>
            </div>
          ) : (
            <>
              {!isAdmin ? <ActiveOrders item={activeOrders} onRemove={removeItemFromCart} onQuantityChange={updateItemQuantity} />: null}
              <PendingOrders items={waitedOrders} onStatusChange={statusChange}/>
              <DeliveredOrders items={deliveredOrders} />


              <div className="cart-footer">
                <div className="cart-total">
                  <span className="cart-total-label">Total:</span>
                  <span className="cart-total-amount">${total}</span>
                </div>
                {!isAdmin && (
                  <button
                    onClick={handleCheckout}
                    disabled={isProcessing || activeOrders.length === 0}
                    className="cart-checkout"
                  >
                    {isProcessing ? (
                      "Procesando..."
                    ) : activeOrders.length === 0 ? (
                      <i className="fa-solid fa-lock" style={{ color: "#fbbf24" }}></i>
                    ) : (
                      "Finalizar Compra"
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {showSuccess && <Success onAnimationEnd={() => setShowSuccess(false)} />}
      {showOrder && <OrderSended onAnimationEnd={() => setShowOrder(false)} />}
    </div>
  )
}