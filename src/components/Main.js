import React, { useState, useEffect } from "react"
import plusIcon from '../images/Icons/plusIcon.png';
import editIcon from '../images/Icons/editIcon.png';
import closeIcon from '../images/Icons/close-icon.png';
import api from '../utils/api';
import Card from "./Card";



function Main({ onEditProfileClick, onAddPlaceClick, onEditAvatarClick, onCardClick }) {
    const [userName, setUserName] = useState('');
    const [userAbout, setUserAbout] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserData() 
            .then((userInfo) => {
                setUserName(userInfo.name);
                setUserAbout(userInfo.about);
                setUserAvatar(userInfo.avatar);
                
            })
            .catch((error) => console.error(`Error: ${error}`));
    }, []); 

    useEffect(() => {
        api.getInitialCards() 
            .then((cardsData) => {
                setCards(cardsData);
            })
            .catch((error) => console.error(`Error: ${error}`));
    }, []); 

    return (
        <main>
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        src={userAvatar}
                        alt="Avatar del usuario"
                        className="profile__avatar-image"
                    />
                    <div className="profile__edit-icon" onClick={onEditAvatarClick}></div>
                </div>

                <div className="profile__info">
                    <div className="profile__info-content">
                        <h2 className="profile__info-name">{userName}</h2>
                        <button
                            className="profile__editUserButton" onClick={onEditProfileClick}
                        >
                            <img src={editIcon} alt="Edit user button" />
                        </button>
                    </div>
                    <h3 className="profile__info-about">{userAbout}</h3>
                </div>
                <button
                    className="profile__addCardButton"
                    onClick={onAddPlaceClick}
                >
                    <img src={plusIcon} alt="Add card icon button" />
                </button>
            </section>

            <section className="photos">
                {cards.map((card) => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} />
                ))}
            </section>

            <section id="deletePopup" className="deletePopup">
                <form className="deletePopup__content">
                    <button className="deletePopup__close" type="button">
                        <img
                            src={closeIcon}
                            alt="close icon"
                            className="deletePopup__close-icon"
                        />
                    </button>
                    <h2 className="deletePopup__title">¿Estás seguro?</h2>
                    <button id="deletePopupButton" className="deletePopup__button" type="submit">Sí</button>
                </form>
                <div className="deletePopup__background"></div>
            </section>

        </main>
    );
};

export default Main;