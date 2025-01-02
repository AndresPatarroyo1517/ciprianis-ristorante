import './Menu.css'
import '../../assets/css/style.css'
import '../../assets/css/bootstrap.css'
import { useVerifyAdmin } from '../../hooks/useVerifyAdmin/useVerifyAdmin'
import { useEffect, useState } from 'react'
import { MenuCard } from '../../components/menuCard/MenuCard'
import { getAllDishes } from '../../services/dishService'
import { DishModal } from '../../components/modales/DishModal'

interface Plato {
    _id: string
    name: string
    description: string
    category: string
    image: string
    price: number
    ingredients: string[],
    isDeleted: boolean
}

export const Menu: React.FC = () => {
    const isAdmin = useVerifyAdmin()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [platosXCategoriaList, setPlatosXCategoriaList] = useState<Plato[]>([])
    const [activeCategory, setActiveCategory] = useState<string>('All')
    const [visiblePlatos, setVisiblePlatos] = useState<Plato[]>([])
    const [limit, setLimit] = useState<number>(15)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const getPlatos = async (category: string) => {
            setIsLoading(true)
            try {
                const responseData = await getAllDishes()
                const allPlatos: Plato[] = responseData.data
                const filteredPlatos = category === 'All'
                    ? allPlatos
                    : allPlatos.filter(plato => plato.category === category)
                const avaliblePlatos = filteredPlatos.filter(plato => plato.isDeleted === false)
                setPlatosXCategoriaList(avaliblePlatos)
                setVisiblePlatos(avaliblePlatos.slice(0, limit))
            } catch (error) {
                console.error("Error fetching dishes:", error)
            } finally {
                setIsLoading(false)
            }
        };

        getPlatos(activeCategory);
    }, [activeCategory, limit])

    const handleCategoryChange = (category: string) => {
        setActiveCategory(category)
        setLimit(15);
    };

    const handleLoadMore = () => {
        setLimit(prevLimit => prevLimit + 15);
    };

    const handleOpenModal = () => setIsModalOpen(true)

    const handleCloseModal = () => setIsModalOpen(false)

    const hasMoreItems = platosXCategoriaList.length > visiblePlatos.length

    return (
        <section className="food_section layout_padding-bottom dark-section">
            <div className="container">
                <div className="heading_container heading_center">
                    <h2>Nuestro menú</h2>
                </div>

                <ul className="filters_menu">
                    {['All', 'Entrada', 'Plato principal', 'Postre', 'Bebida'].map(category => (
                        <li
                            key={category}
                            className={activeCategory === category ? 'active' : ''}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>

                <div>
                    {isAdmin && (
                        <button className="color" onClick={handleOpenModal}>
                            <i className="fa-solid fa-circle-plus fa-xl" style={{ color: '#d2c4a5' }}></i>
                        </button>
                    )}
                </div>

                <div className="filters-content">
                    <div className="row grid">
                        {isLoading ? (
                            <div className="load-spinner">
                                <div className="spinner"></div>
                            </div>
                        ) : visiblePlatos.length > 0 ? (
                            visiblePlatos.map(plato => (
                                <div key={plato._id} className="col-sm-6 col-lg-4 all">
                                    <MenuCard plato={plato} />
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <i className="fas fa-utensils fa-3x" style={{ color: '#745B3C', marginBottom: '1rem' }}></i>
                                <h3>No hay platos disponibles</h3>
                                <p>No se encontraron platos en esta categoría.</p>
                            </div>
                        )}
                    </div>
                </div>

                {hasMoreItems && (
                    <div className="text-center">
                        <button onClick={handleLoadMore} className="boton_cargar">
                            Ver más
                        </button>
                    </div>
                )}
                <DishModal isOpen={isModalOpen} onClose={handleCloseModal} isEdit={false} />
            </div>
        </section>
    )
}

