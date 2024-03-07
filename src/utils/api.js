class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .catch((error) => console.error("No se pudieron recuperar los datos de las tarjetas:", error));
    }

    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                return response.json();
            })
            .catch((error) => console.error("No se pudieron recuperar los datos del usuario:", error));
    }


    updateProfile(name, about, submitButton) {

        submitButton.textContent = "Guardando...";

        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })

            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
            });
    }


    updateProfilePicture(newAvatarUrl) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatarUrl.avatar
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error al actualizar la foto de perfil:', error);
            });
    }

    updateNewCard(name, link, submitButton) {
        const cardName = name;
        const cardLink = link;
        submitButton.textContent = "Guardando...";

        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: cardName,
                link: cardLink,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error al actualizar el perfil:", error);
            });
    }

    deleteCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: "DELETE",
            headers: this._headers,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => console.error("Error al eliminar la tarjeta:", error));
    }

    likeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo dar "me gusta" a la tarjeta');
                }
                return response.json();
            });
    }

    unlikeCard(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo quitar el "me gusta" de la tarjeta');
                }
                return response.json();
            });
    }
}

const api = new Api({
    baseUrl: `https://around.nomoreparties.co/v1/web_es_11`, // URL base de tu API
    headers: {
      authorization: 'ba812068-4270-4077-a7da-dadcfc552381',
      'Content-Type': 'application/json'
    }
  });

export default api;