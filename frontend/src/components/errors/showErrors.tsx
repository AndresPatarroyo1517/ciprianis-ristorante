import { useState } from 'react';
import './ShowErrors.css';

interface ShowErrorsProps {
    er: string[];
}

const ShowErrors = ({ er }: ShowErrorsProps) => {
    const [showDialog, setShowDialog] = useState(false);

    return (
        <div
            className="dialog-wrapper"
            onMouseEnter={() => setShowDialog(true)}
            onMouseLeave={() => setShowDialog(false)}
        >
            <i className="fa-solid fa-circle-exclamation dialog-icon" />
            {showDialog && (
                <div className="dialog-container">
                    <ul className="error-list">
                        {er.map((error, index) => (
                            <li key={index} className="error-item">
                                {error}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ShowErrors;
