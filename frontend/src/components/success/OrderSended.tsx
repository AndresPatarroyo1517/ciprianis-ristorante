import { useEffect, useState } from "react"
import "./Success.css"

interface SuccessAnimationProps {
    onAnimationEnd: () => void;
  }
  
  export const OrderSended: React.FC<SuccessAnimationProps> = ({ onAnimationEnd }) => {
    const [showOrder, setShowOrder] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowOrder(true)
      }, 600)
  
      const endTimer = setTimeout(() => {
        onAnimationEnd()
      }, 3000)
  
      return () => {
        clearTimeout(timer)
        clearTimeout(endTimer)
      }
    }, [onAnimationEnd])
  
    return (
      <div className="success-overlay animate-fade-in">
        <div className="success-content">
          <div className="success-checkmark-wrapper">
            <div className="success-checkmark-inner">
              <div className="success-spinning-circle animate-spin-slow" />
              <div className="success-checkmark">
              <i className="fa-solid fa-check fa-4x success-checkmark-icon animate-scale"></i>
              </div>
            </div>
          </div>
  
          {showOrder && (
            <div className="success-message animate-slide-up">
              <div className="success-message-title">
              <i className="fa-regular fa-paper-plane fa-flip-horizontal" style={{color: "#Fd878d"}}></i>
                <span>¡Se ha enviado el plato!</span>
                <i className="fa-regular fa-paper-plane" style={{color: "#Fd878d"}}></i>
              </div>
              <p className="success-message-text">¡El plato ha sido despachado!</p>
            </div>
          )}
        </div>
      </div>
    )
  }