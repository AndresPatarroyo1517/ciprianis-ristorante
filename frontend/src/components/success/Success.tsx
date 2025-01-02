import { useEffect, useState } from 'react';
import JSConfetti from 'js-confetti';
import './Success.css';

interface SuccessAnimationProps {
  onAnimationEnd: () => void;
}

export const Success: React.FC<SuccessAnimationProps> = ({ onAnimationEnd }) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const jsConfetti = new JSConfetti();
    
    jsConfetti.addConfetti({
      confettiColors: ['#FFC700', '#FF0099', '#00FF88', '#00C3FF', '#FF5E5E'],
      confettiRadius: 6,
      confettiNumber: 150,
    });

    const timer = setTimeout(() => {
      setShowMessage(true)
      jsConfetti.addConfetti({
        emojis: ['🎉', '🥗', '🍔', '🍕'],
        emojiSize: 50,
        confettiNumber: 30,
      });
    }, 600)

    const endTimer = setTimeout(() => {
      onAnimationEnd()
    }, 3000)

    return () => {
      clearTimeout(timer)
      clearTimeout(endTimer)
    };
  }, [onAnimationEnd]);

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

        {showMessage && (
          <div className="success-message animate-slide-up">
            <div className="success-message-title">
            <i className="fa-solid fa-champagne-glasses" style={{color: '#fbbf24'}}></i>
              <span>¡Compra Exitosa!</span>
              <i className="fa-solid fa-champagne-glasses " style={{color: '#fbbf24'}}></i>
            </div>
            <p className="success-message-text">¡Gracias por tu compra!</p>
          </div>
        )}
      </div>
    </div>
  )
}