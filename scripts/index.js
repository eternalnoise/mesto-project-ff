// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// @todo: DOM узлы
const cards = document.querySelector('.places__list');

// @todo: Функция создания карточки
const createCard = function(cardItem, cardCallback) {
  const cardElement = cardTemplate.cloneNode(true);
  let cardTitle = cardElement.querySelector('.card__title');
  let cardImage = cardElement.querySelector('.card__image');
  cardTitle.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    cardCallback(cardElement);
  })
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
})
