import '../pages/index.css';
import { createCard, removeCard, likeCard } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getCards, getUserInfo, editProfile, sendCard, editAvatar } from './api.js';
import { toggleButtonText } from './utils.js';
 
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
const newCardLinkInput = document.querySelector('#link-input');

const popupEditAvatar = document.querySelector('.popup_type_edit-profile');
const formElementEditAvatar = document.forms['edit-profile-avatar'];
const newAvatarLinkInput = document.querySelector('#link-input-avatar');

//settings
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}; 

// open modal 
function openProfileEdit() {
  clearValidation(formElementEditProfile, validationConfig);
  openPopup(popupEditProfile);
  jobInput.value = profileDescription.textContent;
  nameInput.value = profileName.textContent;
}
buttonProfileEdit.addEventListener('click', openProfileEdit);

function openAddCard() {
  clearValidation(formElementAddCard, validationConfig);
  openPopup(popupAddCard);
}
buttonAddCard.addEventListener('click', openAddCard);

function openFullScreenImage(cardItem) {
  popupImageContent.src = cardItem.link;
  popupImageContent.alt = cardItem.link;
  popupImageCaption.textContent = cardItem.name;

  openPopup(popupImage);
} 

//редактирование аватара
function openEditAvatar() {
  clearValidation(formElementEditAvatar, validationConfig);
  openPopup(popupEditAvatar);
}

profileImage.addEventListener('click', openEditAvatar);

function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault(); 
  toggleButtonText(formElementEditAvatar);
  editAvatar(newAvatarLinkInput.value)
  .then(() => {
    profileImage.style.backgroundImage = `url(${newAvatarLinkInput.value})`;
    closePopup(popupEditAvatar);
  })
  .catch((err) => {
    console.log(err);
  }) 
  .finally(() => {
    toggleButtonText(formElementEditAvatar);
  });
 }
formElementEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit); 

// функция для заполнения формы редактирования профиля
function handleFormEditProfileSubmit(evt) {
  evt.preventDefault(); 
  toggleButtonText(formElementEditProfile);
  editProfile(nameInput.value, jobInput.value)
  .then(() => {
    profileDescription.textContent = jobInput.value;
    profileName.textContent = nameInput.value;
    closePopup(popupEditProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    toggleButtonText(formElementEditProfile);
  });
}
formElementEditProfile.addEventListener('submit', handleFormEditProfileSubmit); 

// функция-обработчик карточек
function handleCardSubmit(evt) {
  evt.preventDefault(); 
  toggleButtonText(formElementAddCard);
  const addCardItem = {
    name: newCardNameInput.value,
    link: newCardLinkInput.value
  }
  sendCard(addCardItem)
  .then((res) => {
    cards.prepend(createCard(res, removeCard, likeCard, openFullScreenImage));
    closePopup(popupAddCard);
    formElementAddCard.reset();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    toggleButtonText(formElementAddCard);
  });
 }

formElementAddCard.addEventListener('submit', handleCardSubmit); 

enableValidation(validationConfig);

//загрузка карточек и инфо
Promise.all([getUserInfo(), getCards()])
  .then(([userData, cardsData]) => {
    const userId = userData._id;
    cardsData.forEach((cardItem) => {
    const card = createCard(cardItem, removeCard, likeCard, openFullScreenImage, userId);
    cards.append(card);
    }); 
  
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
  })
  .catch((err) => {
    console.log(err)
  });

