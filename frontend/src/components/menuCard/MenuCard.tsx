import { useVerifyAdmin } from '../../hooks/useVerifyAdmin/useVerifyAdmin'
import { useAuth } from '../../hooks/auth/useAuth'
import { Link } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { DishModal } from '../modales/DishModal'
import { QuantityPanel } from '../modales/QuantityPanel'
import { addToCart } from '../../services/cartService'
import { deleteDish } from '../../services/dishService'
import './MenuCard.css'

interface Plato {
    _id: string
    name: string
    description: string
    category: string
    image: string
    price: number
    ingredients: string[]
}

interface MenuCardProps {
    plato: Plato
}

export const MenuCard: React.FC<MenuCardProps> = ({ plato }) => {
    const isAdmin = useVerifyAdmin()
    const { isLogged } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isQuantityPanelVisible, setIsQuantityPanelVisible] = useState(false)
    const panelRef = useRef<HTMLDivElement | null>(null)
    const [isAlertVisible, setIsAlertVisible] = useState(false)

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handleAddToCart = (quantity: number) => {
        addToCart(plato._id, quantity)
        setIsQuantityPanelVisible(false)
    }

    const disabledDish = () =>{
        try {
            deleteDish(plato._id) 
            setIsAlertVisible(true)
            setTimeout(() => setIsAlertVisible(false), 3000)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsQuantityPanelVisible(false)
            }
        };

        if (isQuantityPanelVisible) {
            document.addEventListener('mousedown', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        }
    }, [isQuantityPanelVisible])

    return (
        <div className="box">
            <div>
                <div className="img-box">
                    <img src={plato.image} alt={plato.name} />
                </div>
                <div className="detail-box">
                    <h5>{plato.name}</h5>
                    <p>{plato.description}</p>
                    <div className="options">
                        <h6>${plato.price}</h6>
                        {isAdmin ? (
                           <>
                           <Link to="#" onClick={isLogged ? handleOpenModal : undefined}>
                               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                                   <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                               </svg>
                           </Link>
                           <button className="btn-desabilitar" onClick={disabledDish}>
                           <i className="fa-solid fa-trash"></i>
                           </button>
                       </>
                        ) : (
                            <Link to={isLogged ? "" : "/login"} onClick={isLogged ? () => setIsQuantityPanelVisible(true) : undefined}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {isQuantityPanelVisible && (
                <div ref={panelRef}>
                    <QuantityPanel
                        itemName={plato.name}
                        itemPrice={plato.price}
                        isVisible={isQuantityPanelVisible}
                        onClose={() => setIsQuantityPanelVisible(false)}
                        onConfirm={handleAddToCart}
                    />
                </div>
            )}
            <DishModal isOpen={isModalOpen} onClose={handleCloseModal} isEdit={true} dish={plato} />
            <div className={`alert-container ${isAlertVisible ? 'show' : ''}`}>
                <div className="alert-box">
                    <span>¡Plato deshabilitado!</span>
                </div>
            </div>
        </div>
    )
}
