// функция открытия попапа
function openPopup (element) {
  element.classList.add('popup_is-opened');
  element.addEventListener('click', closePopupOnClick);
  document.addEventListener('keydown', closePopupOnEsc);
  };

// функция закрытия попапа по клику на оверлей и крестик  
function closePopupOnClick (evt) {
if (evt.target.classList.contains('popup_is-opened') || evt.target.classList.contains('popup__close')) {
  const currentModal = document.querySelector('.popup_is-opened');
  closePopup(currentModal);
  };
}

// функция закрытия попапа
function closePopup (element) {
  element.classList.remove('popup_is-opened');
  element.removeEventListener('click', closePopupOnClick);
  document.removeEventListener('keydown', closePopupOnEsc);
}

// функция закрытия попапа клавишей Esc
function closePopupOnEsc (evt) {
  if (evt.key === 'Escape') {
    const currentModal = document.querySelector('.popup_is-opened');
    closePopup(currentModal);
  };
}

export { openPopup, closePopup };

