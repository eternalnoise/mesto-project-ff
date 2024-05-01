// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Функция создания карточки
export const createCard = function(cardItem, removeCallback, likeCallback, openFullScreenImage) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    removeCallback(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', () => {
  likeCallback(cardElement);
});

  cardImage.addEventListener('click', () => {
    openFullScreenImage(cardItem);
    });

  return cardElement;
}

// Функция удаления карточки
export const removeCard = function (cardElement) {
  cardElement.remove();
}

// Функция нажатия на сердечко
export function likeCard (cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}
