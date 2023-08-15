export function validateInput(
  { fieldName = 'Контактов', inputField },
  { errorWrapper, errorFlag },
) {
  const errorsMap = {
    inputReq:
      typeof fieldName === 'object'
        ? `Поле ${fieldName.textContent} должно быть заполнено`
        : `Поля ${fieldName} должны быть заполнены`,
    noDigit: `Поле ${fieldName.textContent} должно содержать только буквы`,
    emailValid: 'Введите корректный Email (отсутствует символ "@")',
    validPhone: 'Введите корректный номер телефона',
  };
  const errorContent = document.createElement('span');
  let arrayOfLetters = inputField.value.trim().split('');
  let noDigitFlag = true;
  errorContent.classList.add('error-field__message');

  inputField.addEventListener('input', () => {
    arrayOfLetters = inputField.value.trim().split('');

    for (const letter of arrayOfLetters) {
      if (!isNaN(letter) && typeof fieldName === 'object') {
        errorContent.textContent = errorsMap.noDigit;
        return noDigitFlag ? !noDigitFlag : noDigitFlag;
      }
      errorRemoval({ fieldName, inputField }, errorContent);
      // eslint-disable-next-line no-self-assign
      noDigitFlag = noDigitFlag;
    }

    if (
      inputField.value.trim() &&
      inputField.parentNode.dataset.field !== 'optional'
    ) {
      errorRemoval({ fieldName, inputField }, errorContent);
    }
  });

  if (
    !inputField.value.trim() &&
    inputField.parentNode.dataset.field !== 'optional'
  ) {
    errorContent.textContent = errorsMap.inputReq;
    if (typeof fieldName !== 'object') {
      errorContent.setAttribute('data-error', 'contact-message');
    }

    if (!errorWrapper.querySelectorAll('[data-error]').length) {
      errorWrapper.append(errorContent);
    }

    if (typeof fieldName === 'object') {
      inputField.parentNode.classList.add('error-input');
    } else {
      inputField.classList.add('error-input');
    }
    if (errorFlag) return !errorFlag;
  }

  for (const letter of arrayOfLetters) {
    if (!isNaN(letter) && typeof fieldName === 'object') {
      errorContent.textContent = errorsMap.noDigit;
      errorWrapper.append(errorContent);
      inputField.parentNode.classList.add('error-input');
      if (errorFlag) return !errorFlag;
    }
  }

  if (typeof fieldName !== 'object') {
    const contactType = inputField
      .closest('.contact-form__field')
      .querySelector('[data-contact]').dataset.contact;
    switch (contactType) {
      case 'phone': {
        // eslint-disable-next-line no-undef
        let mask = IMask(inputField, {
          mask: '+{7}(000)000-00-00',
          lazy: false,
        });

        if (!mask.unmaskedValue.slice(1) || mask.unmaskedValue.length < 11) {
          errorContent.textContent = errorsMap.validPhone;
          errorContent.setAttribute('data-phone-error', '');
          if (!errorWrapper.querySelectorAll('[data-phone-error]').length) {
            errorWrapper.append(errorContent);
          }

          inputField.classList.add('error-input');
          if (errorFlag) return !errorFlag;
        }
        break;
      }
      case 'mail': {
        if (!inputField.value.includes('@') && inputField.value) {
          errorContent.textContent = errorsMap.emailValid;
          errorContent.setAttribute('data-mail-error', '');
          if (!errorWrapper.querySelectorAll('[data-mail-error]').length) {
            errorWrapper.append(errorContent);
          }

          inputField.classList.add('error-input');
          if (errorFlag) return !errorFlag;
        }
        break;
      }
    }
  }

  return errorFlag;
}

function errorRemoval({ fieldName, inputField }, errorContent) {
  errorContent.remove();
  if (typeof fieldName === 'object') {
    inputField.parentNode.classList.remove('error-input');
  } else {
    inputField.classList.remove('error-input');
  }
}
