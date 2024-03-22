import React, { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cards, setCards] = useState([]);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  useEffect(() => {
    api.getUserData()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((error) => {
        console.error(`Error al obtener la información del usuario: ${error}`);
      });
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const handleDeleteConfirm = () => {
    if (cardToDelete) {
      return api.deleteCard(cardToDelete._id)
        .then(() => {
          setCards((prevCards) => prevCards.filter((card) => card._id !== cardToDelete._id));
          setIsConfirmPopupOpen(false);
        })
        .catch((error) => console.error(`Error al eliminar la tarjeta: ${error}`));
    }
  };

  const handleUpdateAvatar = ({ avatar }) => {
    return api.updateProfilePicture(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(`Error al actualizar el avatar: ${error}`);
      });
  };

  const handleUpdateUser = ({ name, about }) => {
    setIsSubmitting(true);
    return api.updateProfile(name, about)
      .then((updateUserData) => {
        setCurrentUser(updateUserData);
        closeAllPopups();
        setIsSubmitting(false);
      })
      .catch((error) => {
        console.error(`Error al actualizar el usuario: ${error}`)
        setIsSubmitting(false);
        throw error;
      });
  }

  const handleAddPlaceSubmit = (inputs) => {
    api.addCard(inputs.title, inputs.urlImagen)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.error(`Error al agregar una nueva tarjeta: ${error}`);
      });
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setSelectedCard(null);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(card => card._id === currentUser._id);

    (isLiked ? api.unlikeCard(card._id) : api.likeCard(card._id))
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => console.error(`Error al actualizar el like de la tarjeta: ${error}`));

  }

  function handleCardDelete(card) {
    setCardToDelete(card);
    setIsConfirmPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfileClick={handleEditProfileClick}
          onAddPlaceClick={handleAddPlaceClick}
          onEditAvatarClick={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={() => setIsConfirmPopupOpen(false)}
          onConfirm={handleDeleteConfirm}
        />

        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
