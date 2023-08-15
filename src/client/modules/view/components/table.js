import { adjustClasses, appendElements } from '../utils.js';
import { createSvgIcon } from '../svg-icons.js';

export function createTableWrapper() {
  const wrapper = document.createElement('div');
  wrapper.classList.add('clients__table');
  return wrapper;
}

export function createTable() {
  const table = document.createElement('table');
  const tableTitle = document.createElement('caption');

  table.classList.add('clients-table');
  tableTitle.classList.add('clients-table__title', 'title');

  tableTitle.textContent = 'Клиенты';

  table.append(tableTitle);

  return table;
}

export function createTableHead() {
  const tableHead = document.createElement('thead');
  const tableRow = document.createElement('tr');

  const idCell = document.createElement('th');
  const idCellButton = document.createElement('button');
  const idCellCaption = document.createElement('span');

  const fullNameCell = document.createElement('th');
  const fullNameCellButton = document.createElement('button');
  const fullNameCellCaption = document.createElement('span');
  const fullNameCellCaptionSort = document.createElement('span');

  const creationDateCell = document.createElement('th');
  const creationDateCellButton = document.createElement('button');
  const creationDateCellCaption = document.createElement('span');

  const latestChangeCell = document.createElement('th');
  const latestChangeCellButton = document.createElement('button');
  const latestChangeCellCaption = document.createElement('span');

  const contactsCell = document.createElement('th');
  const contactsCellCaption = document.createElement('span');

  const actionCell = document.createElement('th');
  const actionCellCaption = document.createElement('span');

  const cells = [
    idCell,
    fullNameCell,
    creationDateCell,
    latestChangeCell,
    contactsCell,
    actionCell,
  ];
  const buttons = [
    idCellButton,
    fullNameCellButton,
    creationDateCellButton,
    latestChangeCellButton,
  ];
  const captions = [
    idCellCaption,
    fullNameCellCaption,
    creationDateCellCaption,
    latestChangeCellCaption,
    contactsCellCaption,
    actionCellCaption,
  ];

  buttons.forEach((btn) => {
    btn.setAttribute('data-control', 'button');
  });

  tableHead.classList.add('clients-table__head-wrapper');
  tableRow.classList.add('clients-table__head');
  adjustClasses(cells, 'clients-table__data', 'clients-table__data--head');
  adjustClasses(buttons, 'clients-table__btn', 'btn-reset');
  adjustClasses(captions, 'clients-table__text', 'subtitle');
  idCellCaption.classList.add('active-sort');
  fullNameCellCaptionSort.classList.add('clients-table__sort-help');

  idCellButton.setAttribute('data-sortby', 'id');
  idCellButton.setAttribute('data-sortorder', 'increased');
  fullNameCellButton.setAttribute('data-sortby', 'fullname');
  fullNameCellButton.setAttribute('data-sortorder', 'decreased');
  creationDateCellButton.setAttribute('data-sortby', 'createdAt');
  creationDateCellButton.setAttribute('data-sortorder', 'decreased');
  latestChangeCellButton.setAttribute('data-sortby', 'updatedAt');
  latestChangeCellButton.setAttribute('data-sortorder', 'decreased');

  idCellCaption.textContent = 'ID';
  fullNameCellCaption.textContent = 'Фамилия Имя Отчество';
  fullNameCellCaptionSort.innerHTML = 'Я&#8209;А';
  creationDateCellCaption.textContent = 'Дата и время создания';
  latestChangeCellCaption.textContent = 'Последние изменения';
  contactsCellCaption.textContent = 'Контакты';
  actionCellCaption.textContent = 'Действия';

  idCell.append(idCellButton);
  idCellButton.append(idCellCaption);
  createSvgIcon({
    attributes: {
      svg: {
        width: '8',
        heigth: '8',
        viewBox: '0 0 8 8',
        fill: 'none',
      },
      path: {
        fill: 'currentColor',
        d: 'M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z',
      },
    },
    addNameSpace: ['svg', 'path'],
    addClass: ['clients-table__ico', 'active-sort-ico'],
    appendInto: idCellButton,
  });

  fullNameCell.append(fullNameCellButton);
  fullNameCellButton.append(fullNameCellCaption);
  createSvgIcon({
    attributes: {
      svg: {
        width: '8',
        heigth: '8',
        viewBox: '0 0 8 8',
        fill: 'none',
      },
      path: {
        fill: 'currentColor',
        d: 'M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z',
      },
    },
    addNameSpace: ['svg', 'path'],
    addClass: ['clients-table__ico', 'rotate'],
    appendInto: fullNameCellButton,
  });
  fullNameCellButton.append(fullNameCellCaptionSort);

  creationDateCell.append(creationDateCellButton);
  creationDateCellButton.append(creationDateCellCaption);
  createSvgIcon({
    attributes: {
      svg: {
        width: '8',
        heigth: '8',
        viewBox: '0 0 8 8',
        fill: 'none',
      },
      path: {
        fill: 'currentColor',
        d: 'M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z',
      },
    },
    addNameSpace: ['svg', 'path'],
    addClass: ['clients-table__ico', 'rotate'],
    appendInto: creationDateCellButton,
  });

  latestChangeCell.append(latestChangeCellButton);
  latestChangeCellButton.append(latestChangeCellCaption);
  createSvgIcon({
    attributes: {
      svg: {
        width: '8',
        heigth: '8',
        viewBox: '0 0 8 8',
        fill: 'none',
      },
      path: {
        fill: 'currentColor',
        d: 'M3.49691e-07 4L0.705 4.705L3.5 1.915L3.5 8L4.5 8L4.5 1.915L7.29 4.71L8 4L4 -3.49691e-07L3.49691e-07 4Z',
      },
    },
    addNameSpace: ['svg', 'path'],
    addClass: ['clients-table__ico', 'rotate'],
    appendInto: latestChangeCellButton,
  });

  contactsCell.append(contactsCellCaption);

  actionCell.append(actionCellCaption);

  appendElements(cells, tableRow);
  tableHead.append(tableRow);

  return {
    tableHead,
    buttons,
  };
}

export function createTableBody() {
  const body = document.createElement('tbody');
  const loadingRow = document.createElement('tr');
  const loadingCell = document.createElement('td');
  const loadingElement = document.createElement('div');
  const loadingIcon = createSvgIcon({
    attributes: {
      svg: {
        width: '80',
        height: '80',
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

  loadingElement.classList.add('table-spinner-preload');
  loadingCell.classList.add(
    'clients-table__data',
    'clients-table__data--preload',
  );
  loadingRow.classList.add('clients-table__body');
  body.classList.add('clients-table__body-wrapper');

  loadingCell.setAttribute('colspan', '6');

  loadingElement.append(loadingIcon);
  loadingCell.append(loadingElement);
  loadingRow.append(loadingCell);
  body.append(loadingRow);

  return {
    body,
    loadingRow,
  };
}
