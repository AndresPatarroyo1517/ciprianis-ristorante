import '../../assets/css/style.css'
import '../../assets/css/bootstrap.css'
import './Information.css'
import aboutImg from '../../assets/images/about-img.png';

export function Information() {
    return (
        <section className="about_section layout_padding">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="img-box">
                            <img src={aboutImg} alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="info-box">
                            <div className="heading_container">
                                <h2>
                                    Somos Ciprianis Ristorante
                                </h2>
                            </div>
                            <p>
                                ¡Bienvenido a Ciprianis Ristorante, el destino culinario donde la tradición italiana cobra
                                vida en cada bocado! Ubicado en el corazón de la ciudad, nuestro restaurante es un santuario
                                para los amantes de la auténtica cocina italiana. Desde el momento en que cruzas nuestras
                                puertas, te transportamos a las pintorescas calles de Italia, donde la pasión por la buena
                                comida y la hospitalidad se fusionan para crear una experiencia gastronómica inolvidable.
                                Con ingredientes frescos y recetas familiares transmitidas a través de generaciones, cada
                                plato que servimos es una celebración de los sabores robustos y la artesanía culinaria que
                                define a la cocina italiana. Ya sea que estés buscando una cena romántica, una reunión
                                familiar o simplemente un lugar para disfrutar de una excelente comida, en Ciprianis
                                Ristorante encontrarás el ambiente perfecto para deleitar tus sentidos y satisfacer tu
                                paladar. ¡Ven y únete a nosotros en un viaje gastronómico a través de Italia en cada visita!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
