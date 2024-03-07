import React, { useEffect } from 'react';
import closeIcon from '../images/Icons/close-icon.png';

const PopupWithForm = ({ isOpen, onClose, name, onSubmit, title, children, submitButtonText }) => {
    useEffect(() => {
        const handleEscClose = (event) => {
            if(event.key === 'Escape') {
                onClose();
            }
        };

        if(isOpen) {
            document.addEventListener('keydown', handleEscClose);
        };

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    }, [isOpen, onClose]);


    const openClass = isOpen ? `${name}_open` : '';

    return (
        <div className={`${name} ${openClass}`}>
            <form className={`form ${name}__popup`} name={name} onSubmit={onSubmit}>
                <button className="form__close" onClick={onClose}>
                    <img src={closeIcon} alt="Cerrar" className="form__close-icon" />
                </button>
                <h2 className="form__title">{title}</h2>
                {children}
                <button type="submit" className="form__submit">{submitButtonText}</button>
            </form>
            <div className={`${name}__background`} onClick={onClose}></div>
        </div>
    );
};

export default PopupWithForm;