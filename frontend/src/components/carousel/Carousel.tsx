import { Link } from "react-router-dom";
import './Carousel.css';

interface CarouselItemProps {
  active?: boolean;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl?: string;
}

export function CarouselItem({
  active = false,
  title,
  description,
  buttonText,
  buttonLink,
  imageUrl
}: CarouselItemProps) {
  return (
    <div className={`carousel-item ${active ? 'active' : ''}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-lg-6">
            <div className="detail-box">
              <h1>{title}</h1>
              <p>{description}</p>
              {buttonText && (
                <div className="btn-box">
                  <Link to={buttonLink || '/'} className="btn1">{buttonText}</Link>
                </div>
              )}
            </div>
          </div>
          <div className="col-md-7 col-lg-6">
            <img src={imageUrl} alt={title} className="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  );
}
