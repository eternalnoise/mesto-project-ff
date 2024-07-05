  const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
      authorization: 'e5c9680b-1e7a-4e77-a4d4-e0e2f38db8d0',
      'Content-Type': 'application/json'
    }
  }
  
  //проверка отклика сервера
  function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  //загрузка карточек
  function getCards() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    }).then(checkResponse);
  }
  
  //данные пользователя
  function getUserInfo() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    }).then(checkResponse);
  }

  //редактировать профиль
  function editProfile(nameEdit, descriptionEdit) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: nameEdit,
        about: descriptionEdit,
      })
    }).then(checkResponse);
  }

  //добавить карточку
  function addCard(nameCard, linkCard) {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard,
      })
    }).then(checkResponse);
  }

  //удалить свою карточку
  function removeMyCard(cardId) {
    return fetch(`${config.baseUrl}/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(checkResponse);
  }

  //отправить лайк
  function sendLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT', 
      headers: config.headers,
    }).then(checkResponse);
  }

  //удалить лайк
  function removeLike(cardId) {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    }).then(checkResponse);
  }

  //изменить аватар
  function editAvatar(avatarUrl){
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      })
    }).then(checkResponse);
  }

  export { getCards, getUserInfo, editProfile, addCard, removeMyCard, sendLike, removeLike, editAvatar };