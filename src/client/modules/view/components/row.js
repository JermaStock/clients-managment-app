import { createSvgIcon } from '../svg-icons.js';
import { createContactIcon } from '../components/contact-icon.js';
import { adjustClasses, focusTrap, appendElements } from '../utils.js';
import { renderModalWindow, createConfirmationWindow } from './modal.js';

function createContactList(node, contactsArray) {
  const list = document.createElement('ul');
  list.classList.add('clients-table__list', 'contacts-list', 'list-reset');

  for (const contact of contactsArray) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    const contactType = {
      phone: 'Телефон',
      mail: 'Email',
      fb: 'Facebook',
      vk: 'VK',
      other: 'Другое',
    };
    let { type, value } = contact;

    type === 'phone'
      ? (link.href = `tel:${value}`)
      : type === 'mail'
      ? (link.href = `mailto:${value}`)
      : (link.href = value);

    link.classList.add('contacts-list__link');
    item.classList.add('contacts-list__item');

    // eslint-disable-next-line no-undef
    tippy(link, {
      content: `${contactType[type]}: ${value}`,
    });

    if (list.childElementCount > 3 && contactsArray.length > 5) {
      item.style = 'display: none';
    }

    if (
      list.childElementCount > 3 &&
      !list.querySelector('.contacts-list__btn') &&
      contactsArray.length > 5
    ) {
      const item = document.createElement('li');
      const button = createContactIcon({ length: contactsArray.length });
      item.classList.add('contacts-list__item');

      button.addEventListener('click', () => {
        item.style = 'display: none';
        list.childNodes.forEach((item) => {
          if (list.childNodes.length > 6) {
            item.style.marginBottom = '8px';
          }
          if (
            item.style.display === 'none' &&
            !item.querySelector('.contacts-list__btn')
          ) {
            item.style.marginBottom = '0px';
            item.style = 'display: flex';
            if (list.childNodes[5] === item && list.childNodes.length > 6)
              item.style.marginBottom = '8px';
          }
        });
      });
      item.appendChild(button);
      list.appendChild(item);
    }
    link.appendChild(createContactIcon({ type, length: contactsArray.length }));
    item.appendChild(link);
    list.appendChild(item);
  }
  return node.appendChild(list);
}

export function createClientRow({
  clientData,
  eventHandlers,
  header,
  body,
  searchField,
}) {
  function formatFullName(surname, name, lastName) {
    let fullname = [surname, name, lastName]
      .filter((str) => str.trim().length > 0)
      .map((item) => {
        return item[0].toUpperCase() + item.slice(1).toLowerCase();
      })
      .join(' ');

    return fullname;
  }

  function formatDate(date) {
    const day =
      new Date(date).getDate() > 9
        ? new Date(date).getDate()
        : 0 + `${new Date(date).getDate()}`;
    const month =
      new Date(date).getMonth() + 1 > 9
        ? new Date(date).getMonth() + 1
        : 0 + `${new Date(date).getMonth() + 1}`;
    const year = new Date(date).getFullYear();
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  function formatTime(time) {
    const hours =
      new Date(time).getHours() > 9
        ? new Date(time).getHours()
        : 0 + `${new Date(time).getHours()}`;
    const minutes =
      new Date(time).getMinutes() > 9
        ? new Date(time).getMinutes()
        : 0 + `${new Date(time).getMinutes()}`;
    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }

  const tableRow = document.createElement('tr');

  const idTableCell = document.createElement('td');

  const fullNameCell = document.createElement('td');

  const creationCell = document.createElement('td');
  const creationCellWrapper = document.createElement('div');
  const creationCellDate = document.createElement('span');
  const creationCellTime = document.createElement('span');

  const latestCell = document.createElement('td');
  const latestCellWrapper = document.createElement('div');
  const latestCellDate = document.createElement('span');
  const latestCellTime = document.createElement('span');

  const contactCell = document.createElement('td');

  const actionCell = document.createElement('td');
  const actionCellButtonWrapper = document.createElement('div');
  const changeClientInfoButton = document.createElement('button');
  const changeClientIcon = createSvgIcon({
    attributes: {
      svg: {
        width: '13',
        heigth: '13',
        viewBox: '0 0 13 13',
        fill: 'none',
      },
      path: {
        d: 'M0 10.5V13H2.5L9.87333 5.62662L7.37333 3.12662L0 10.5ZM11.8067 3.69329C12.0667 3.43329 12.0667 3.01329 11.8067 2.75329L10.2467 1.19329C9.98667 0.933291 9.56667 0.933291 9.30667 1.19329L8.08667 2.41329L10.5867 4.91329L11.8067 3.69329Z',
        fill: '#9873FF',
      },
    },
    addNameSpace: ['svg', 'path'],
    addClass: ['clients-table-icon'],
  });
  const changeButtonText = document.createElement('span');
  const deleteClientButton = document.createElement('button');
  const deleteClientIcon = createSvgIcon({
    attributes: {
      svg: {
        width: '12',
        heigth: '12',
        viewBox: '0 0 12 12',
        fill: 'none',
      },
      path: {
        d: 'M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z',
        fill: '#F06A4D',
      },
    },
    addNameSpace: ['svg', 'path'],
    addClass: ['clients-table-icon'],
  });

  const deleteButtonText = document.createElement('span');

  const cells = [
    idTableCell,
    fullNameCell,
    creationCell,
    latestCell,
    contactCell,
    actionCell,
  ];
  let { onChange } = eventHandlers;

  adjustClasses(cells, 'clients-table__data');

  idTableCell.classList.add('clients-table__body-id', 'subtitle');

  fullNameCell.classList.add('clients-table__body-fullname', 'text');

  creationCellWrapper.classList.add('clients-table__date-wrapper');
  latestCellWrapper.classList.add('clients-table__date-wrapper');

  creationCellDate.classList.add('clients-table__date', 'text');
  creationCellTime.classList.add('clients-table__time', 'subtitle');

  latestCellDate.classList.add('clients-table__date', 'text');
  latestCellTime.classList.add('clients-table__time', 'subtitle');

  actionCellButtonWrapper.classList.add('clients-table__change');
  changeClientInfoButton.classList.add('clients-table__edit', 'btn-reset');
  changeButtonText.classList.add('clients-table__edit-text', 'text');
  deleteClientButton.classList.add('clients-table__delete', 'btn-reset');
  deleteButtonText.classList.add('clients-table__edit-text', 'text');

  tableRow.classList.add('clients-table__body');

  changeClientInfoButton.setAttribute('data-control', 'button');
  deleteClientButton.setAttribute('data-control', 'button');

  idTableCell.textContent = clientData.id;
  fullNameCell.textContent = formatFullName(
    clientData.surname,
    clientData.name,
    clientData.lastName,
  );
  creationCellDate.textContent = formatDate(clientData.createdAt);
  creationCellTime.textContent = formatTime(clientData.createdAt);
  latestCellDate.textContent = formatDate(clientData.updatedAt);
  latestCellTime.textContent = formatTime(clientData.updatedAt);
  changeButtonText.textContent = 'Изменить';
  deleteButtonText.textContent = 'Удалить';

  changeClientInfoButton.addEventListener('click', async () => {
    console.log(header, body, searchField);
    const loadingIcon = createSvgIcon({
      attributes: {
        svg: {
          width: '12',
          height: '12',
          viewBox: '0 0 80 80',
          fill: 'none',
        },
        path: {
          stroke: '#9873FF',
          'stroke-width': '8',
          'stroke-miterlimit': '10',
          'stroke-linecap': 'round',
          d: 'M4.00025 40.0005C4.00025 59.8825 20.1182 76.0005 40.0002 76.0005C59.8822 76.0005 76.0002 59.8825 76.0002 40.0005C76.0002 20.1185 59.8823 4.00049 40.0003 4.00049C35.3513 4.00048 30.9082 4.88148 26.8282 6.48648',
        },
      },
      addClass: ['table-spinner-preloader__icon', 'spinning-animation'],
      addNameSpace: ['svg', 'path'],
    });
    changeClientIcon.classList.add('hidden');

    document.querySelectorAll('[data-control]').forEach((button) => {
      button.setAttribute('disabled', 'disabled');
    });

    changeClientInfoButton.prepend(loadingIcon);
    await onChange({
      clientId: clientData.id,
      clientRow: tableRow,
      header,
      body,
      searchField,
    });
    loadingIcon.remove();
    changeClientIcon.classList.remove('hidden');

    document.querySelectorAll('[data-control]').forEach((button) => {
      button.removeAttribute('disabled');
    });
  });

  deleteClientButton.addEventListener('click', function () {
    const modal = renderModalWindow({
      modalWindowFunc: createConfirmationWindow,
      clientData,
      clientRow: tableRow,
      eventHandlers,
      header,
      body,
      searchField,
    });
    document.body.append(modal);
    focusTrap(modal);
    modal.classList.add('modal--active');
  });

  creationCellWrapper.append(creationCellDate);
  creationCellWrapper.append(creationCellTime);
  creationCell.append(creationCellWrapper);

  latestCellWrapper.append(latestCellDate);
  latestCellWrapper.append(latestCellTime);
  latestCell.append(latestCellWrapper);
  createContactList(contactCell, clientData.contacts);

  changeClientInfoButton.append(changeClientIcon);
  changeClientInfoButton.append(changeButtonText);
  deleteClientButton.append(deleteClientIcon);
  deleteClientButton.append(deleteButtonText);
  actionCellButtonWrapper.append(changeClientInfoButton);
  actionCellButtonWrapper.append(deleteClientButton);
  actionCell.append(actionCellButtonWrapper);

  appendElements(cells, tableRow);

  return tableRow;
}
