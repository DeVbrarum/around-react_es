import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);

  };

  // For managing the submit button
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfileClick={handleEditProfileClick}
        onAddPlaceClick={handleAddPlaceClick}
        onEditAvatarClick={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        name="avatarPopup"
        title="Cambia foto de perfil"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmit}
        submitButtonText="Guardar"
      >
        <input type="url" name="urlAvatar" className="form__input avatarPopup__input" placeholder="https://somewebsite.com/someimage.jpg" pattern="https://.*" required />
        <span className="empty-field" data-error="username"></span> {/* For future error handling*/}

      </PopupWithForm>


      <PopupWithForm
        name="profileForm"
        title="Editar perfil"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmit}
        submitButtonText="Guardar"
      >
        <input type="text" name="name" className="form__input" placeholder="Nombre" required />
        <span className="empty-field" data-error="username"></span>{/* For future error handling */}

        <input type="text" name="about" className="form__input" placeholder="Acerca de" required />
        <span className="empty-field" data-error="about"></span>{/* For future error handling */}

      </PopupWithForm>

      <PopupWithForm
        name="addNewImage"
        title="Nuevo Lugar"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleSubmit}
        submitButtonText="Crear"

      >
        <input type="text" name="title" className="form__input" placeholder="Titulo" minlength="2" maxlength="30" required />
        <span className="empty-field" data-error="title"></span>{/* For future error handling */}

        <input type="url" name="urlImagen" className="form__input" placeholder="Image url" pattern="https://.*" required />
        <span className="empty-field" data-error="urlImagen"></span>{/* For future error handling */}

      </PopupWithForm>

      <Footer />
    </div>
  );
}

export default App;
