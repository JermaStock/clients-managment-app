import { createContactsSection } from './contacts.js';
import { animateElement } from '../animate.js';
import { validateInput } from '../validation.js';
import { focusTrap, extractContactsInfo, disableInputs } from '../utils.js';
import { createSvgIcon } from '../svg-icons.js';
import { createConfirmationWindow } from './modal.js';

export function createForm(
  { background, clientData = {}, clientRow, header, body, searchField },
  { onSave, onDelete, onClose },
) {
  console.log(searchField, header, body);
  const modal = document.createElement('div');

  const modalTitle = document.createElement('h2');
  const formHeadWrapper = document.createElement('div');
  const form = document.createElement('form');

  const labelSurname = document.createElement('label');
  const titleSurname = document.createElement('span');
  const inputSurname = document.createElement('input');

  const labelName = document.createElement('label');
  const titleName = document.createElement('span');
  const inputName = document.createElement('input');

  const labelSecondName = document.createElement('label');
  const titleSecondName = document.createElement('span');
  const inputSecondName = document.createElement('input');

  const submitBtnWrapper = document.createElement('div');
  const submitBtn = document.createElement('button');
  const cancelBtnWrapper = document.createElement('div');
  const cancelBtn = document.createElement('button');
  const deleteBtnWrapper = document.createElement('div');
  const deleteBtn = document.createElement('button');

  const closeModalBtn = document.createElement('button');
  const closeModalBtnLineFirst = document.createElement('span');
  const closeModalBtnLineSecond = document.createElement('span');

  const inputFields = [
    { label: titleSurname, input: inputSurname },
    { label: titleName, input: inputName },
    { label: titleSecondName, input: inputSecondName },
  ];

  const contactSection = createContactsSection(clientData.contacts);

  cancelBtn.type = 'button';
  deleteBtn.type = 'button';

  modal.classList.add('modal-wrapper');
  modalTitle.classList.add('title', 'clients-form__title');
  closeModalBtn.classList.add('modal-wrapper__close', 'btn-reset');

  form.classList.add('client-form');
  formHeadWrapper.classList.add('clients-form__header');

  labelSurname.classList.add('clients-form__label');
  labelName.classList.add('clients-form__label');
  labelSecondName.classList.add('clients-form__label');

  titleSecondName.classList.add('clients-form__subtitle', 'text');
  titleName.classList.add(
    'clients-form__subtitle',
    'clients-form__subtitle--name',
    'text',
  );
  titleSurname.classList.add(
    'clients-form__subtitle',
    'clients-form__subtitle--surname',
    'text',
  );

  inputSurname.classList.add('clients-form__input');
  inputName.classList.add('clients-form__input');
  inputSecondName.classList.add('clients-form__input');

  submitBtnWrapper.classList.add('clients-form__btn-wrapper', 'form-btn');
  cancelBtnWrapper.classList.add('clients-form__btn-wrapper', 'form-btn');
  deleteBtnWrapper.classList.add('clients-form__btn-wrapper', 'form-btn');
  submitBtn.classList.add('clients-submit-btn', 'text', 'btn-reset');
  cancelBtn.classList.add('clients-delete-btn', 'btn-reset');
  deleteBtn.classList.add('clients-delete-btn', 'btn-reset');

  modalTitle.setAttribute('data-content', '');
  labelName.setAttribute('data-field', 'required');
  labelSurname.setAttribute('data-field', 'required');
  labelSecondName.setAttribute('data-field', 'optional');

  modalTitle.textContent = clientData.id ? 'Изменить данные' : 'Новый клиент';
  titleSurname.textContent = 'Фамилия';
  titleName.textContent = 'Имя';
  titleSecondName.textContent = 'Отчество';
  submitBtn.textContent = 'Сохранить';
  cancelBtn.textContent = 'Отмена';
  deleteBtn.textContent = 'Удалить клиента';

  if (clientData.id) {
    inputSurname.value = clientData.surname;
    inputName.value = clientData.name;
    inputSecondName.value = clientData.lastName;

    modalTitle.dataset.content = `ID: ${clientData.id}`;

    inputFields.forEach((field) => {
      if (field.input.value) {
        animateElement(
          [
            { transform: 'translateY(10px)', fontSize: '1em' },
            { transform: 'translateY(6px)', fontSize: '.92em' },
            { transform: 'translateY(3px)', fontSize: '.84em' },
            { transform: 'translateY(0px)', fontSize: '.76em' },
          ],
          field.label,
          'normal',
          80,
        );
      }
    });
  }

  closeModalBtn.addEventListener('click', () => {
    onClose(background);
  });
  cancelBtn.addEventListener('click', () => {
    onClose(background);
  });
  background.addEventListener('mousedown', (e) => {
    if (
      e.target === background &&
      background.childElementCount === 1 &&
      !modal.hasAttribute('data-loading')
    ) {
      onClose(background);
    }
  });
  inputFields.forEach((field) => {
    field.input.addEventListener('focus', () => {
      if (!field.input.value) {
        animateElement(
          [
            { transform: 'translateY(10px)', fontSize: '1em' },
            { transform: 'translateY(6px)', fontSize: '.92em' },
            { transform: 'translateY(3px)', fontSize: '.84em' },
            { transform: 'translateY(0px)', fontSize: '.76em' },
          ],
          field.label,
          'normal',
          80,
        );
      }
    });
    field.input.addEventListener('blur', () => {
      if (!field.input.value) {
        animateElement(
          [
            { transform: 'translateY(10px)', fontSize: '1em' },
            { transform: 'translateY(6px)', fontSize: '.92em' },
            { transform: 'translateY(3px)', fontSize: '.84em' },
            { transform: 'translateY(0px)', fontSize: '.76em' },
          ],
          field.label,
          'reverse',
          80,
        );
      }
    });
  });

  labelSurname.append(titleSurname);
  labelSurname.append(inputSurname);
  labelName.append(titleName);
  labelName.append(inputName);
  labelSecondName.append(titleSecondName);
  labelSecondName.append(inputSecondName);
  submitBtnWrapper.append(submitBtn);
  cancelBtnWrapper.append(cancelBtn);
  deleteBtnWrapper.append(deleteBtn);

  formHeadWrapper.append(labelSurname);
  formHeadWrapper.append(labelName);
  formHeadWrapper.append(labelSecondName);

  form.append(formHeadWrapper);
  form.append(contactSection);
  form.append(submitBtnWrapper);
  form.append(clientData.id ? deleteBtnWrapper : cancelBtnWrapper);

  closeModalBtn.append(closeModalBtnLineFirst);
  closeModalBtn.append(closeModalBtnLineSecond);
  modal.append(closeModalBtn);

  modal.append(modalTitle);
  modal.append(form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fields = modal.querySelectorAll('[data-field]');
    const contactList = document.querySelectorAll('.contact-form__field');
    const error = document.createElement('div');
    const loadingIcon = createSvgIcon({
      attributes: {
        svg: {
          width: '12',
          height: '12',
          viewBox: '0 0 80 80',
          fill: 'none',
        },
        path: {
          stroke: '#fff',
          'stroke-width': '8',
          'stroke-miterlimit': '10',
          'stroke-linecap': 'round',
          d: 'M4.00025 40.0005C4.00025 59.8825 20.1182 76.0005 40.0002 76.0005C59.8822 76.0005 76.0002 59.8825 76.0002 40.0005C76.0002 20.1185 59.8823 4.00049 40.0003 4.00049C35.3513 4.00048 30.9082 4.88148 26.8282 6.48648',
        },
      },
      addClass: ['table-spinner-preloader__icon', 'spinning-animation'],
      addNameSpace: ['svg', 'path'],
    });
    loadingIcon.style.marginRight = '9px';
    let isValid = true;
    error.classList.add('error-field');

    if (modal.querySelector('.error-field')) {
      modal.querySelector('.error-field').remove();
    }

    fields.forEach((element) => {
      const label = {
        ...(element.childNodes.length && {
          fieldName: element.childNodes[0],
        }),
        inputField: !element.childNodes.length
          ? element
          : element.childNodes[1],
      };
      isValid = validateInput(label, {
        errorWrapper: error,
        errorFlag: isValid,
      });
    });
    if (!isValid) {
      contactSection.parentNode.insertBefore(error, contactSection.nextSibling);
      return;
    }

    let contactsArray = contactList ? extractContactsInfo(contactList) : [];

    disableInputs(modal);
    if (modal.querySelector('.contact-select__header'))
      modal.querySelector('.contact-select__header').style['pointer-events'] =
        'none';

    modal.setAttribute('data-loading', 'pending');

    submitBtn.prepend(loadingIcon);

    await onSave(
      {
        name: inputName.value,
        surname: inputSurname.value,
        lastName: inputSecondName.value,
        contacts: contactsArray,
      },
      clientData,
      header,
      body,
      searchField,
    );

    onClose(background);
  });

  deleteBtn.addEventListener('click', function () {
    const confirmationWindow = createConfirmationWindow(
      { background, clientData, clientRow, header, body, searchField },
      { onDelete, onClose },
    );
    modal.setAttribute('style', 'display: none');
    background.append(confirmationWindow);
    focusTrap(background);
  });

  return modal;
}
