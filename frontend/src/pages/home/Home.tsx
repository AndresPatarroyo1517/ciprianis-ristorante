import './Home.css';
import { CarouselItem } from '../../components/carousel/Carousel';
import { useCarousel } from '../../hooks/useCarousel/useAutoCarousel';

export function Home() {
  const carouselLength = 3
  const intervalTime = 5000
  const { activeIndex, handlePrev, handleNext } = useCarousel(carouselLength, intervalTime)

  return (
      <section className="slider_section">
        <div id="customCarousel1" className="carousel slide" data-ride="carousel">
          <a className="carousel-control-prev" href="#homeCarousel" role="button" onClick={handlePrev}>
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <div className="carousel-inner">
            <CarouselItem
              active={activeIndex === 0}
              title="Ciprianis Ristorante"
              description="En Cipriani's Ristorante, no solo te ofrecemos comida, te ofrecemos una experiencia. Nuestro cálido y acogedor ambiente te hará sentir como en casa desde el momento en que entras por la puerta. Y nuestro equipo dedicado de profesionales de la hospitalidad está aquí para asegurarse de que cada visita sea memorable."
              imageUrl="src/assets/images/f9.png"
            />
            <CarouselItem
              active={activeIndex === 1}
              title="Toque Italiano"
              description="Descubre el auténtico sabor de Italia en Cipriani's Ristorante. Sumérgete en un viaje gastronómico que te llevará directamente a las encantadoras calles de Italia. Nuestro menú está cuidadosamente elaborado con los ingredientes más frescos y auténticos, desde nuestras pastas caseras hasta nuestras pizzas recién horneadas."
              buttonText="Pide ahora"
              buttonLink="/menu"
              imageUrl="src/assets/images/f3.png"
            />
            <CarouselItem
              active={activeIndex === 2}
              title="¡Reserva Ya!"
              description="Ya sea que estés celebrando una ocasión especial o simplemente disfrutando de una cena casual, en Cipriani's Ristorante te espera una experiencia culinaria excepcional. ¡Reserva ahora y déjate llevar por el delicioso mundo de la comida italiana! Buon appetito! 🍝🍕🇮🇹"
              buttonText="Reserva"
              buttonLink="/reservation"
              imageUrl="src/assets/images/image-removebg-preview.png"
            />
          </div>
          <a className="carousel-control-next" href="#homeCarousel" role="button" onClick={handleNext}>
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
          <div className="container">
            <ol className="carousel-indicators">
              <li data-target="#homeCarousel" data-slide-to="0" className={activeIndex === 0 ? 'active' : ''}></li>
              <li data-target="#homeCarousel" data-slide-to="1" className={activeIndex === 1 ? 'active' : ''}></li>
              <li data-target="#homeCarousel" data-slide-to="2" className={activeIndex === 2 ? 'active' : ''}></li>
            </ol>
          </div>
        </div>
      </section>
  )
}
