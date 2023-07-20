class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  // проверка ответа сервера и преобразование из json
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  // получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  // добавление карточки на сервер
  addNewCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: cardData.name,
        link: cardData.link,
        owner: cardData.owner,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // удаление карточки с сервера
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  // добавление лайка
  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  // удаление лайка
  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.deleteLike(cardId);
    } else {
      return this.addLike(cardId);
    }
  }

  // получение своих данных пользователя с сервера
  getMyUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._getResponseData(res));
  }

  // внесение изменений в свои данные пользователя на сервере
  editUserInfo(profileData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileData.name,
        about: profileData.about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // изменение своего аватара на сервере
  editAvatar(profileData) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: profileData.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  // возвращает массив промисов, которые нужно исполнить
  getAllNeededData() {
    return Promise.all([this.getInitialCards(), this.getMyUserInfo()]);
  }
}

// создание экземпляра класса Api
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'b76f62bc-fc94-47a0-8fcd-24ebc70a3fc1',
    'Content-Type': 'application/json',
  },
});
