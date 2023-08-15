import { createContainer } from './modules/view/components/container.js';
import { createClientAddButton } from './modules/view/components/add-btn.js';
import {
  createTableWrapper,
  createTable,
  createTableHead,
  createTableBody,
} from './modules/view/components/table.js';
import { loadClients } from './modules/api/api.js';
import { renderClients } from './modules/view/render.js';
import { filterClients } from './modules/view/filter.js';
import { sortClientData } from './modules/view/sort.js';

(async () => {
  function renderClientsTable() {
    table.append(tableHead.tableHead);
    table.append(tableBody.body);
    tableWrapper.append(table);
    container.append(tableWrapper);
    container.append(addClient.wrapper);
    main.append(container);
  }

  const main = document.querySelector('.clients');
  const container = createContainer();
  const tableWrapper = createTableWrapper();
  const table = createTable();
  const tableHead = createTableHead();
  const tableBody = createTableBody();
  const searchForm = document.querySelector('.search');
  const searchField = document.querySelector('.search__field');
  const addClient = createClientAddButton(tableHead, tableBody, searchField);

  renderClientsTable();
  const clientsData = await loadClients();
  renderClients({
    clientsData,
    header: tableHead,
    body: tableBody,
    loader: tableBody.loadingRow,
    searchField,
  });
  searchField.removeAttribute('disabled');
  addClient.btn.removeAttribute('disabled');

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  searchField.addEventListener(
    'input',
    filterClients({ header: tableHead, body: tableBody, searchField }),
  );

  tableHead.buttons.forEach((btn) => {
    btn.addEventListener('click', function () {
      sortClientData.apply(this, [
        {
          header: tableHead,
          body: tableBody,
          searchField,
        },
      ]);
    });
  });
})();
