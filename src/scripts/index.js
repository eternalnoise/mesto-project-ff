import '../pages/index.css';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, validationConfig, clearValidation } from './validation.js';
import { getCards, getUserInfo, editProfile, sendCard, removeMyCard, sendLike, removeLike, editAvatar } from './api.js';
 
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
const profileImage = document.querySelector('.profile__image');

const formElementAddCard = document.forms['new-place'];
const newCardNameInput = document.querySelector('.popup__input_type_card-name');
const newCardLinkInput = document.querySelector('.popup__input_type_url');

// open modal 
function openProfileEdit() {
  clearValidation(formElementEditProfile);
  openPopup(popupEditProfile);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileName.textContent;
}
buttonProfileEdit.addEventListener('click', openProfileEdit);

function openAddCard() {
  clearValidation(formElementAddCard);
  openPopup(popupAddCard);
}
buttonAddCard.addEventListener('click', openAddCard);

function openFullScreenImage(cardItem) {
  popupImageContent.src = cardItem.link;
  popupImageContent.alt = cardItem.link;
  popupImageCaption.textContent = cardItem.name;

  openPopup(popupImage);
} 

// функция для заполнения формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 
  editProfile(nameInput.value, jobInput.value)
  .then(() => {
    profileDescription.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
}
formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

// функция-обработчик карточек
function handleCardSubmit(evt) {
  evt.preventDefault(); 
  const addCardItem = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }
  sendCard(addCardItem)
  .then(() => {
    cards.prepend(createCard(addCardItem, removeCard, likeCard, openFullScreenImage));
    closePopup(popupAddCard);
    formElementAddCard.reset();
  })
  .catch((err) => {
    console.log(err);
  })
}
formElementAddCard.addEventListener('submit', handleCardSubmit); 

enableValidation(validationConfig);



//загрузка карточек и инфо
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
   cardsData.forEach((cardItem) => {
    const card = createCard(cardItem, removeCard, likeCard, openFullScreenImage);
  cards.append(card);
    });
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.background = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.log(err)
  });