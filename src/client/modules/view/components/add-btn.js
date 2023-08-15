import { createForm } from '../components/form.js';
import { renderModalWindow } from '../components/modal.js';
import { createSvgIcon } from '../svg-icons.js';
import { focusTrap } from '../utils.js';
import { eventHandlers } from '../handlers.js';

export function createClientAddButton(header, body, searchField) {
  const wrapper = document.createElement('div');
  const btn = document.createElement('button');
  const btnText = document.createElement('span');

  btn.classList.add('btn-add', 'btn-reset');
  wrapper.classList.add('btn-wrapper');
  btnText.classList.add('btn-add__text', 'text');

  btn.setAttribute('data-control', 'button');
  btn.setAttribute('disabled', 'disabled');

  btnText.textContent = 'Добавить Клиента';

  createSvgIcon({
    attributes: {
      svg: {
        width: '23',
        height: '16',
        viewBox: '0 0 23 16',
        fill: 'none',
      },
      path: {
        fill: 'currentColor',
        d: 'M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z',
      },
    },
    addClass: ['btn-add__icon'],
    addNameSpace: ['svg', 'path'],
    appendInto: btn,
  });
  btn.append(btnText);
  wrapper.append(btn);

  btn.addEventListener('click', () => {
    const modal = renderModalWindow({
      modalWindowFunc: createForm,
      eventHandlers,
      header,
      body,
      searchField,
    });
    document.body.append(modal);
    focusTrap(modal);
    modal.classList.add('modal--active');
  });

  return {
    wrapper,
    btn,
  };
}
