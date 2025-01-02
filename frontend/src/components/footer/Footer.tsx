import '../../assets/css/style.css'
import '../../assets/css/bootstrap.css'
import './footer.css'
import { Link } from 'react-router-dom';

export function Footer() {
    return (
        <footer className="footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-col">
                        <div className="footer_contact">
                            <h4>
                                Contactanos
                            </h4>
                            <div className="contact_link_box">
                                <Link to="https://www.google.com/maps/place/Bogot%C3%A1/@4.6489628,-74.2719334,11z/data=!4m6!3m5!1s0x8e3f9bfd2da6cb29:0x239d635520a33914!8m2!3d4.7109886!4d-74.072092!16zL20vMDFkenlj?entry=ttu&g_ep=EgoyMDI0MTAwOS4wIKXMDSoASAFQAw%3D%3D">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    <span>
                                        Bogotá D.C
                                    </span>
                                </Link>
                                <p>
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                    <span>
                                        Llama: +57 300 7526311
                                    </span>
                                </p>
                                <p>
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                    <span>
                                        CiprianisRistorante@gmail.com
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 footer-col">
                        <div className="footer_detail">
                            <p className="footer-logo">
                                Ciprianis
                            </p>
                            <p>
                                Donde la comida italiana y la delicia se unen.
                            </p>
                            <div className="footer_social">
                                <Link to="https://github.com/AndresPatarroyo1517" target="_blank"> <i className="fa-brands fa-github-alt" aria-hidden="true"></i></Link>
                                <Link to="https://www.linkedin.com/in/andr%C3%A9s-felipe-patarroyo-mu%C3%B1oz-235b00321/" target="_blank"> <i className="fa-brands fa-linkedin" aria-hidden="true"></i></Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 footer-col">
                        <h4>
                            Horario
                        </h4>
                        <p>
                            Todos los días
                        </p>
                        <p>
                            10.00 Am -10.00 Pm
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}