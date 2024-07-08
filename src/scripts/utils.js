//изменение текста кнопки submit
export function toggleButtonText(formElement) {
  const submitButton = formElement.querySelector('.popup__button');
  if (submitButton.textContent == 'Сохранить') {
    submitButton.textContent = 'Сохранение...';
    //console.log(submitButton.textContent);
  } else {
    submitButton.textContent = 'Сохранить';
    //console.log(submitButton.textContent);
  }
}
