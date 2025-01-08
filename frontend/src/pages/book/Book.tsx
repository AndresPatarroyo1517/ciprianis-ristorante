import { BookForm } from "../../components/bookForm/BookForm"
import bookImage from '../../assets/images/bookImage.jpg'
import './Book.css'
import {Booked} from "../../components/booked/Booked"
import { useAuth } from "../../hooks/auth/useAuth"

export function Book() {
    const isLogged = useAuth()
    
    return (
        <section className="book_section">
            <div className="book_container">
                <div className="heading_container">
                    <h2 className="heading_title">
                        Haz una Reservación
                    </h2>
                </div>
                <div className="book_content">
                    <div className="book_form_container">
                        <BookForm />
                    </div>
                    {!isLogged ? (
                        <div className="book_image_container">
                            <img src={bookImage} alt="Imagen de reservación" className="book_image"/>
                        </div>
                    ) : (
                        <div className="book_tables_section">
                            <Booked/>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}