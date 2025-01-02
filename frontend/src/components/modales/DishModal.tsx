import { useState, useEffect } from 'react';
import './DishModal.css';
import { createDish, patchDish } from '../../services/dishService';

interface DishData {
    _id?: string;
    name: string;
    description: string;
    price: string | number;
    category: string;
    ingredients: string | string[];
    image: string;
}

interface DishModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    dish?: DishData;
}

const initialDishData: DishData = {
    name: '',
    description: '',
    price: '',
    category: '',
    ingredients: '',
    image: '',
};

const categoryOptions = ['Entrada', 'Plato principal', 'Postre', 'Bebida']

export const DishModal: React.FC<DishModalProps> = ({ isOpen, onClose, isEdit, dish }) => {
    const [dishData, setDishData] = useState<DishData>(initialDishData)

    useEffect(() => {
        if (isEdit && dish) {
            setDishData({
                ...dish,
                price: dish.price.toString(),
                ingredients: Array.isArray(dish.ingredients)
                    ? dish.ingredients.join(', ')
                    : dish.ingredients,
            })
        } else {
            setDishData(initialDishData)
        }
    }, [isEdit, dish])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setDishData((prev) => ({ ...prev, [name]: value }))
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const priceValue = parseFloat(dishData.price as string);
        if (isNaN(priceValue) || priceValue <= 0) {
            alert('El precio debe ser un número positivo.')
            return
        }

        const formattedIngredients = (dishData.ingredients as string)
            .split(',')
            .map((ingredient) => ingredient.trim())

        if (isEdit && dishData._id) {
            await patchDish(
                dishData._id,
                dishData.name,
                dishData.description,
                priceValue,
                dishData.image,
                dishData.category,
                formattedIngredients
            )
        } else {
            await createDish(
                dishData.name,
                dishData.description,
                priceValue,
                dishData.image,
                dishData.category,
                formattedIngredients
            )
        }

        setDishData(initialDishData)
        onClose()
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <div className="modal-header">
                    <h2>{isEdit ? 'Editar Plato' : 'Agregar Nuevo Plato'}</h2>
                    <button onClick={onClose} className="close-button">
                        <i className="fa-sharp fa-regular fa-circle-xmark fa-lg"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input
                        type="text"
                        name="name"
                        value={dishData.name}
                        onChange={handleChange}
                        placeholder="Nombre del plato"
                        required
                        title="Este campo es obligatorio"
                    />
                    <textarea
                        name="description"
                        value={dishData.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                        required
                        title="Este campo es obligatorio"
                    />
                    <input
                        type="number"
                        name="price"
                        value={dishData.price}
                        onChange={handleChange}
                        placeholder="Precio"
                        required
                        title="Este campo es obligatorio y debe ser un número positivo"
                    />
                    <select
                        name="category"
                        value={dishData.category}
                        onChange={handleChange}
                        required
                        title="Este campo es obligatorio"
                    >
                        <option value="" disabled>
                            Selecciona una categoría
                        </option>
                        {categoryOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <textarea
                        name="ingredients"
                        value={dishData.ingredients}
                        onChange={handleChange}
                        placeholder="Ingredientes (separados por coma)"
                        required
                        title="Este campo es obligatorio"
                    />
                    <input
                        type="url"
                        name="image"
                        value={dishData.image}
                        onChange={handleChange}
                        placeholder="URL de la imagen"
                        required
                        title="Este campo es obligatorio"
                    />
                    <button type="submit" className="submit-button">
                        {isEdit ? 'Editar Plato' : 'Agregar Plato'}
                    </button>
                </form>
            </div>
        </div>
    )
}