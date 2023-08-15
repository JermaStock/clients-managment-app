export function adjustClasses(array, ...classes) {
  array.forEach((item) => {
    item.classList.add(...classes);
  });
}

export function appendElements(arrayOfChildren, parentNode) {
  arrayOfChildren.forEach((child) => {
    parentNode.appendChild(child);
  });
}

export function focusTrap(element) {
  const KEYCODE_TAB = 9;
  let focusableEls = element.querySelectorAll(
    'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])',
  );
  let firstFocusableEl = focusableEls[0];
  let lastFocusableEl = focusableEls[focusableEls.length - 1];

  firstFocusableEl.focus();

  element.addEventListener('keydown', function (e) {
    let isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      if (document.activeElement === firstFocusableEl) {
        lastFocusableEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusableEl) {
        firstFocusableEl.focus();
        e.preventDefault();
      }
    }
  });
}

export function extractContactsInfo(node) {
  const contactsArray = [];
  node.forEach((element) => {
    let mask;
    if (element.querySelector('.contact-select').dataset.contact === 'phone') {
      // eslint-disable-next-line no-undef
      mask = IMask(element.querySelector('.contact-form__input'), {
        mask: '+{7}(000)000-00-00',
        lazy: false,
      });
    }
    contactsArray.push({
      type: element
        .querySelector('.contact-select')
        .getAttribute('data-contact'),
      value:
        element.querySelector('.contact-select').dataset.contact === 'phone'
          ? mask.unmaskedValue
          : element.querySelector('.contact-form__input').value,
    });
  });
  return contactsArray;
}

export function disableInputs(element) {
  element.querySelectorAll('button, input').forEach((el) => {
    el.setAttribute('disabled', 'disabled');
  });
}

export function clearClients(node) {
  node.replaceChildren();
}
