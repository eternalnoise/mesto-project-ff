// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cards = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = function(cardItem, removeCallback) {
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
  return cardElement;
}

// @todo: Функция удаления карточки
const removeCard = function (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardItem) => {
  const card = createCard(cardItem, removeCard);
  cards.append(card);
});
