import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
 
// DOM узлы
const cards = document.querySelector('.places__list');

const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupImageContent = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__caption');

const nameInput = document.querySelector('.popup__input_type_name');
const profileName = document.querySelector('.profile__title');
const jobInput = document.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');
const formElementEditProfile = document.forms['edit-profile'];

const formElementAddCard = document.forms['new-place'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');


// open modal 
function openProfileEdit () {
  openPopup(popupEditProfile);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileName.textContent;
}
buttonProfileEdit.addEventListener('click', openProfileEdit);

function openAddCard () {
  openPopup(popupAddCard);
}
buttonAddCard.addEventListener('click', openAddCard);

function openFullScreenImage (cardItem) {
  popupImageContent.src = cardItem.link;
  popupImageContent.alt = cardItem.link;
  popupImageCaption.textContent = cardItem.name;

  openPopup(popupImage);
} 

// функция для заполнения формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 
  profileDescription.textContent = jobInput.value;
  profileName.textContent = nameInput.value;
  closePopup(popupEditProfile);
}
formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

// Вывести карточки на страницу
initialCards.forEach((cardItem) => {
  const card = createCard(cardItem, removeCard, likeCard, openFullScreenImage);
  cards.append(card);
});

// функция-обработчик карточек
function handleCardSubmit(evt) {
  evt.preventDefault(); 
  const addCardItem = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }
  cards.prepend(createCard(addCardItem, removeCard, likeCard, openFullScreenImage));
  closePopup(popupAddCard);
  formElementAddCard.reset();
}
formElementAddCard.addEventListener('submit', handleCardSubmit); 

