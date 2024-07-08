import { removeLike, removeMyCard, sendLike } from "./api";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

// Функция создания карточки
  
function getCardTemplate() {
  return cardTemplate.cloneNode(true);
  };

export const createCard = function(cardItem, removeCallback, likeCallback, openFullScreenImage, userId) {
  const cardElement = getCardTemplate();
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const likeCountElement = cardElement.querySelector('.card__like-button_amount');
    
  if (cardItem.likes === undefined) {
    cardItem.likes = [];
  }

  likeCountElement.textContent = cardItem.likes.length;
  cardTitle.textContent = cardItem.name;
  cardImage.src = cardItem.link;
  cardImage.alt = cardItem.name;
  cardElement.id = cardItem._id;

  //отображать лайк если он есть в карточке
  const likeButton = cardElement.querySelector('.card__like-button');
  cardItem.likes.forEach((like) => {
    if (like._id === userId) {
      likeButton.classList.add('card__like-button_is-active')    
    }
  })

  const deleteButton = cardElement.querySelector('.card__delete-button');
  if (userId === undefined || cardItem.owner._id === userId) {
    deleteButton.addEventListener('click', () => {
      removeCallback(cardElement);
    });
  } else {
     deleteButton.style.display = 'none';
  }
 
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
  removeMyCard(cardElement.id) 
  .then((res) => {
    cardElement.remove()
  }).catch((err) => {
    console.log(err);
  })
}

// Функция нажатия на сердечко
export function likeCard (cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCountElement = cardElement.querySelector('.card__like-button_amount');

  if (!likeButton.classList.contains('card__like-button_is-active')) {
    sendLike(cardElement.id) 
     .then((res) => {
      likeButton.classList.add('card__like-button_is-active');
      likeCountElement.textContent = res.likes.length;
    }).catch((err) => {
      console.log(err);
    })
  } else {
    removeLike(cardElement.id) 
     .then((res) => {
      likeButton.classList.remove('card__like-button_is-active');
      likeCountElement.textContent = res.likes.length;
    }).catch((err) => {
      console.log(err);
    })
  }
  };
     
 

