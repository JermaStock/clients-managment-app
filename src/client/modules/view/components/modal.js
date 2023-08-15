import { focusTrap, disableInputs } from '../utils.js';
import { createSvgIcon } from '../svg-icons.js';

export function createModalWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('modal');
  return wrapper;
}

export function createConfirmationWindow(
  { background, clientData, clientRow, header, body, searchField },
  { onDelete, onClose },
) {
  function closeModal() {
    if (background.childNodes.length > 1) {
      modal.remove();
      document
        .querySelector('.modal-wrapper')
        .setAttribute('style', 'display: block');
      focusTrap(background);
      return;
    }
    onClose(background);
  }

  const modal = document.createElement('div');
  const title = document.createElement('h2');
  const descr = document.createElement('p');
  const btnWrapper = document.createElement('div');
  const confirmBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');
  const closeBtn = document.createElement('button');
  const closeBtnLineFirst = document.createElement('span');
  const closeBtnLineSecond = document.createElement('span');

  modal.classList.add('modal-wrapper', 'contact-confirm');
  title.classList.add('contact-confirm__title', 'title');
  descr.classList.add('contact-confirm__descr', 'text');
  closeBtn.classList.add(
    'modal-wrapper__close',
    'btn-reset',
    'contact-confirm__close',
  );
  btnWrapper.classList.add('contact-confirm__buttons');
  confirmBtn.classList.add(
    'contact-confirm__submit',
    'clients-submit-btn',
    'btn-reset',
  );
  cancelBtn.classList.add('clients-delete-btn', 'btn-reset');

  title.textContent = 'Удалить контент';
  descr.textContent = 'Вы действительно хотите удалить данного клиента?';
  confirmBtn.textContent = 'Удалить';
  cancelBtn.textContent = 'Отмена';

  confirmBtn.addEventListener('click', async () => {
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

    background.setAttribute('data-confirm-loading', 'pending');
    disableInputs(modal);

    confirmBtn.prepend(loadingIcon);

    await onDelete({ clientData, clientRow, header, body, searchField });
    onClose(background);
  });
  closeBtn.addEventListener('click', () => {
    closeModal();
  });
  cancelBtn.addEventListener('click', () => {
    closeModal();
  });
  background.addEventListener('mousedown', (e) => {
    if (
      e.target === background &&
      !background.hasAttribute('data-confirm-loading')
    ) {
      closeModal();
    }
  });

  closeBtn.append(closeBtnLineFirst);
  closeBtn.append(closeBtnLineSecond);
  btnWrapper.append(confirmBtn);
  btnWrapper.append(cancelBtn);
  modal.append(closeBtn);
  modal.append(title);
  modal.append(descr);
  modal.append(btnWrapper);

  focusTrap(modal);

  return modal;
}

export function renderModalWindow({
  modalBgFunc = createModalWrapper,
  modalWindowFunc,
  eventHandlers,
  clientData,
  clientRow,
  header,
  body,
  searchField,
}) {
  const background = modalBgFunc();
  const modal = modalWindowFunc(
    { background, clientData, clientRow, header, body, searchField },
    eventHandlers,
  );
  background.append(modal);

  return background;
}
