import { useState, useEffect } from 'react';
import './QuantityPanel.css';

interface QuantityPanelProps {
    itemName: string;
    itemPrice: number;
    isVisible: boolean;
    onClose: () => void;
    onConfirm: (quantity: number) => void;
}

export const QuantityPanel: React.FC<QuantityPanelProps> = ({ itemName, itemPrice, isVisible, onClose, onConfirm }) => {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if (isVisible) {
            setQuantity(1)
        }
    }, [isVisible]);

    if (!isVisible) return null

    return (
        <div className="quantity-panel">
            <button className="close-btn" onClick={onClose} aria-label="Close panel">
                <i className="fa-solid fa-times"></i>
            </button>
            <h3 className="panel-title">{itemName}</h3>
            <p className="panel-subtitle">Selecciona la cantidad</p>

            <div className="quantity-controls">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="control-btn"
                    aria-label="Decrease quantity"
                >
                    <i className="fa-solid fa-minus"></i>
                </button>
                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="quantity-input"
                />
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="control-btn"
                    aria-label="Increase quantity"
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </div>

            <div className="panel-total">
                <span>Total:</span>
                <span>${(quantity * itemPrice)}</span>
            </div>

            <div className="panel-actions">
                <button onClick={onClose} className="cancel-btn">
                    Cancel
                </button>
                <button onClick={() => onConfirm(quantity)} className="confirm-btn">
                    <i className="fa-solid fa-check"></i>
                    Confirm
                </button>
            </div>
        </div>
    )
}