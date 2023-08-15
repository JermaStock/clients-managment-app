/* eslint-disable no-undef */
import { animateElement } from '../animate.js';
import { createSvgIcon } from '../svg-icons.js';

export function createContactsSection(contactsList = []) {
  function createCustomSelect(contact, { initalPhoneMask, contactType }) {
    function createSelectList() {
      const contactType = [
        { phone: 'Телефон' },
        { mail: 'Email' },
        { fb: 'Facebook' },
        { vk: 'VK' },
        { other: 'Другое' },
      ];
      const nodeList = [];

      contactType.forEach((object) => {
        const listItem = document.createElement('li');
        const listText = document.createElement('span');
        listItem.classList.add('contact-select__item');
        listText.classList.add('contact-select__text', 'subtitle');

        for (let key in object) {
          listItem.setAttribute('data-contact', '');
          listItem.dataset.contact = key;
          listText.textContent = object[key];
          listItem.append(listText);

          if (contact.type === key) {
            listItem.classList.add('is-active');
            select.dataset.contact = key;
            selectHeaderText.textContent = object[key];
          } else if (
            listText.textContent === contactType[0][key] &&
            !Object.keys(contact).length
          ) {
            listItem.classList.add('is-active');
            select.dataset.contact = key;
            selectHeaderText.textContent = object[key];
          }
        }
        nodeList.push(listItem);
      });

      return nodeList;
    }

    function selectToggle() {
      document.querySelectorAll('.contact-select').forEach((select) => {
        if (this.parentElement !== select) {
          select.classList.remove('is-active');
        }
      });
      this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
      const text = this.textContent;
      const select = this.closest('.contact-select');
      const selectItem = this.closest('.contact-select__item');
      const currentText = this.closest('.contact-select').querySelector(
        '.contact-select__current',
      );
      const currentInput = this.closest('.contact-form__field').querySelector(
        '.contact-form__input',
      );

      select.setAttribute('data-contact', '');
      select.dataset.contact = selectItem.getAttribute('data-contact');
      currentText.textContent = text;

      itemsList.forEach((item) => {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      select.classList.remove('is-active');

      if (this.dataset.contact === 'phone') {
        // eslint-disable-next-line no-undef
        phoneMask = IMask(currentInput, {
          mask: '+{7}(000)000-00-00',
          lazy: false,
        });
      } else if (Object.keys(phoneMask).length) {
        phoneMask.destroy();
        currentInput.value = '';
        phoneMask = {};
      }
    }

    window.addEventListener('click', function (event) {
      if (!event.target.closest('.contact-select')) {
        document.querySelectorAll('.contact-select').forEach((item) => {
          item.classList.remove('is-active');
        });
      }
    });

    const select = document.createElement('div');
    const selectHeader = document.createElement('div');
    const selectHeaderText = document.createElement('span');
    const selectBody = document.createElement('ul');
    const itemsList = createSelectList();
    let phoneMask =
      contactType === 'phone'
        ? IMask(initalPhoneMask, {
            mask: '+{7}(000)000-00-00',
            lazy: false,
          })
        : {};

    select.classList.add('contact-select');
    selectHeader.classList.add('contact-select__header');
    selectHeaderText.classList.add('contact-select__current', 'subtitle');
    selectBody.classList.add('contact-select__body', 'list-reset');

    selectHeader.addEventListener('click', selectToggle);

    itemsList.forEach((item) => {
      item.addEventListener('click', function () {
        selectChoose.apply(this, phoneMask);
      });
    });

    selectHeader.append(selectHeaderText);
    createSvgIcon({
      attributes: {
        svg: {
          width: '10',
          height: '6',
          viewBox: '0 0 10 6',
          fill: 'none',
        },
        path: {
          fill: '#9873FF',
          d: 'M0.495029 0.690001C0.250029 0.935001 0.250029 1.33 0.495029 1.575L4.65003 5.73C4.84503 5.925 5.16003 5.925 5.35503 5.73L9.51003 1.575C9.75503 1.33 9.75503 0.935001 9.51003 0.690001C9.26503 0.445001 8.87003 0.445001 8.62503 0.690001L5.00003 4.31L1.37503 0.685002C1.13503 0.445002 0.735029 0.445001 0.495029 0.690001Z',
        },
      },
      addClass: ['contact-select__ico'],
      addNameSpace: ['svg', 'path'],
      appendInto: selectHeader,
    });
    itemsList.forEach((item) => {
      selectBody.append(item);
    });
    select.append(selectHeader);
    select.append(selectBody);

    return select;
  }

  function animateContactFieldAppend(parent, child, delay) {
    animateElement(
      [
        { heigth: '0px' },
        { heigth: '10px' },
        { heigth: '20px' },
        { heigth: '30px' },
        { heigth: '36px' },
        { heigth: 'auto' },
      ],
      parent,
      'normal',
      delay,
    );

    setTimeout(() => {
      parent.classList.add('contact-fade-in');
      child.classList.add('contact-form-input-fade-in');
    }, delay);
  }

  function animateInnerFieldRemoval(element, heightProperty) {
    const rules = [];

    element.replaceChildren();
    element.style.heigth = heightProperty;

    for (let i = parseInt(heightProperty); i >= 0; i--) {
      rules.push({ heigth: `${i}` });
    }

    animateElement(rules, element, 'normal', 250);
  }

  function renderContactField(contact = {}) {
    const field = document.createElement('div');
    const input = document.createElement('input');
    const inputWrapper = document.createElement('div');
    const btnClose = document.createElement('button');

    inputWrapper.classList.add('contact-form__input-wrapper');
    input.classList.add('contact-form__input', 'text');
    btnClose.classList.add('contact-form__input-btn', 'btn-reset');
    field.classList.add('contact-form__field');

    input.setAttribute('data-field', 'required-contact');
    input.type = 'text';

    animateContactFieldAppend(field, input, 85);

    btnClose.type = 'button';
    input.placeholder = 'Введите данные контакта';

    input.value = contact.value || '';

    // eslint-disable-next-line no-undef
    tippy(btnClose, {
      content: 'Удалить контакт',
    });

    inputWrapper.append(input);
    createSvgIcon({
      attributes: {
        svg: {
          width: 12,
          heigth: 12,
          viewBox: '0 0 12 12',
          fill: 'none',
        },
        path: {
          fill: 'currentColor',
          d: 'M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z',
        },
      },
      addClass: ['contact-form__input-close-icon'],
      addNameSpace: ['svg', 'path'],
      appendInto: btnClose,
    });
    inputWrapper.append(btnClose);
    field.append(
      createCustomSelect(contact, {
        initalPhoneMask: input,
        contactType: contact.type || 'phone',
      }),
    );
    field.append(inputWrapper);
    fieldWrapper.append(field);

    !input.value
      ? btnClose.classList.remove('is-active')
      : btnClose.classList.add('is-active');

    if (fieldWrapper.childElementCount === 1) {
      wrapper.classList.remove('clients-form__contact-wrapper--squeeze');
      wrapper.classList.add('clients-form__contact-wrapper--extended');
    }

    if (fieldWrapper.childElementCount >= 10) {
      contactAddBtn.remove();
    }

    input.addEventListener('input', () => {
      if (!input.value) {
        btnClose.classList.remove('is-active');
        return;
      }
      btnClose.classList.add('is-active');
    });

    btnClose.addEventListener('click', () => {
      const innerFormField = btnClose.closest('.contact-form__field');
      const innerFormFieldHeigth = window
        .getComputedStyle(innerFormField)
        .getPropertyValue('height');

      innerFormField.setAttribute('data-to-be-remvoed', '');
      setTimeout(() => {
        innerFormField.remove();
      }, 200);

      innerFormField.classList.add('contact-form__field--slide');
      if (
        fieldWrapper.childElementCount === 1 &&
        innerFormField.hasAttribute('data-to-be-remvoed')
      ) {
        wrapper.classList.remove('clients-form__contact-wrapper--extended');
        wrapper.classList.add('clients-form__contact-wrapper--squeeze');
      }

      animateInnerFieldRemoval(innerFormField, innerFormFieldHeigth);

      if (!wrapper.contains(contactAddBtn)) wrapper.append(contactAddBtn);
    });
  }

  const wrapper = document.createElement('div');
  const fieldWrapper = document.createElement('div');
  const contactAddBtn = document.createElement('button');

  contactAddBtn.classList.add('clients-form__add-contact', 'btn-reset');
  fieldWrapper.classList.add('clients-form__wrapper');
  wrapper.classList.add('clients-form__contact-wrapper');
  contactAddBtn.type = 'button';
  contactAddBtn.textContent = 'Добавить контакт';

  contactsList.forEach((contact) => {
    renderContactField(contact);
  });

  contactAddBtn.addEventListener('click', () => {
    renderContactField();
  });

  createSvgIcon({
    attributes: {
      svg: {
        width: '14',
        heigth: '14',
        viewBox: '0 0 14 14',
        fill: 'none',
      },
      path: {
        d: 'M7.00001 3.66665C6.63334 3.66665 6.33334 3.96665 6.33334 4.33331V6.33331H4.33334C3.96668 6.33331 3.66668 6.63331 3.66668 6.99998C3.66668 7.36665 3.96668 7.66665 4.33334 7.66665H6.33334V9.66665C6.33334 10.0333 6.63334 10.3333 7.00001 10.3333C7.36668 10.3333 7.66668 10.0333 7.66668 9.66665V7.66665H9.66668C10.0333 7.66665 10.3333 7.36665 10.3333 6.99998C10.3333 6.63331 10.0333 6.33331 9.66668 6.33331H7.66668V4.33331C7.66668 3.96665 7.36668 3.66665 7.00001 3.66665ZM7.00001 0.333313C3.32001 0.333313 0.333344 3.31998 0.333344 6.99998C0.333344 10.68 3.32001 13.6666 7.00001 13.6666C10.68 13.6666 13.6667 10.68 13.6667 6.99998C13.6667 3.31998 10.68 0.333313 7.00001 0.333313ZM7.00001 12.3333C4.06001 12.3333 1.66668 9.93998 1.66668 6.99998C1.66668 4.05998 4.06001 1.66665 7.00001 1.66665C9.94001 1.66665 12.3333 4.05998 12.3333 6.99998C12.3333 9.93998 9.94001 12.3333 7.00001 12.3333Z',
        fill: 'currentColor',
      },
      circle: {
        cx: '7',
        cy: '7',
        r: '6',
        stroke: '#9873FF',
        'stroke-width': '2',
        fill: 'transaprent',
      },
    },
    addNameSpace: ['svg', 'path', 'circle'],
    addClass: ['clients-form__add--contact-icon'],
    appendInto: contactAddBtn,
    insertType: false,
  });
  wrapper.append(fieldWrapper);

  if (fieldWrapper.childElementCount < 10) {
    wrapper.append(contactAddBtn);
  }

  return wrapper;
}
