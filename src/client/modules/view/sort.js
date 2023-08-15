import { loadClients } from '../api/api.js';
import { clearClients } from '../view/utils.js';
import { renderClients } from './render.js';

export async function sortClientData({
  searchParam = '',
  method = '',
  header,
  body,
  searchField,
} = {}) {
  const rotateIcon = ({ header, searchParam, method }) => {
    if (searchParam || method) return;
    header.buttons.forEach((btn) => {
      if (btn !== this) {
        btn
          .querySelector('.clients-table__text')
          .classList.remove('active-sort');
        btn
          .querySelector('.clients-table__ico')
          .classList.remove('active-sort-ico');
        btn.querySelector('.clients-table__ico').classList.add('rotate');
        if (btn.dataset.sortby === 'fullname') {
          btn.querySelector('.clients-table__sort-help').innerHTML =
            'Я&#8209;А';
        }
      }
    });
    this.querySelector('.clients-table__text').classList.remove('active-sort');
    this.querySelector('.clients-table__text').classList.add('active-sort');
    this.querySelector('.clients-table__ico').classList.remove(
      'active-sort-ico',
    );
    this.querySelector('.clients-table__ico').classList.add('active-sort-ico');
    this.querySelector('.clients-table__ico').classList.toggle('rotate');
    if (this.dataset.sortby === 'fullname') {
      let currentHelper = this.querySelector('.clients-table__sort-help');
      // eslint-disable-next-line no-unused-vars
      currentHelper =
        currentHelper.innerHTML.slice(0, 1) === 'Я'
          ? (currentHelper.innerHTML = 'А&#8209;Я')
          : (currentHelper.innerHTML = 'Я&#8209;А');
    }
  };

  const changeSortOrder = ({ header, searchParam, method }) => {
    if (searchParam || method) return;
    header.buttons.forEach((btn) => {
      if (btn !== this) btn.dataset.sortorder = 'decreased';
    });
    this.dataset.sortorder =
      this.dataset.sortorder === 'increased' ? 'decreased' : 'increased';
  };

  document.querySelectorAll('[data-control]').forEach((button) => {
    button.setAttribute('disabled', 'disabled');
  });
  clearClients(body.body);
  body.body.append(body.loadingRow);
  let currentInput = `?search=${searchField.value}`;
  let data = await loadClients(
    searchParam ? searchParam : currentInput ? currentInput : searchParam,
  );
  let dataCopy = [...data];
  let currentSort;

  if (
    method || searchParam
      ? document.querySelector('.active-sort').parentElement.dataset.sortby ===
        'fullname'
      : this.dataset.sortby === 'fullname'
  ) {
    changeSortOrder({ header, searchParam, method });
    rotateIcon({ header, searchParam, method });
    currentSort = document.querySelector('.active-sort').parentElement.dataset;
    dataCopy.sort((a, b) => {
      a = `${a.surname.toLowerCase()} ${a.name.toLowerCase()} ${a.lastName.toLowerCase()}`;
      b = `${b.surname.toLowerCase()} ${b.name.toLowerCase()} ${b.lastName.toLowerCase()}`;
      return searchParam || method
        ? currentSort.sortorder === 'increased'
          ? a > b
            ? 1
            : -1
          : b > a
          ? 1
          : -1
        : this.dataset.sortorder === 'increased'
        ? a > b
          ? 1
          : -1
        : b > a
        ? 1
        : -1;
    });
  } else if (
    method || searchParam
      ? document.querySelector('.active-sort').parentElement.dataset.sortby ===
        'id'
      : this.dataset.sortby === 'id'
  ) {
    changeSortOrder({ header, searchParam, method });
    rotateIcon({ header, searchParam, method });
    currentSort = document.querySelector('.active-sort').parentElement.dataset;
    dataCopy.sort((a, b) => {
      return searchParam || method
        ? currentSort.sortorder === 'increased'
          ? a.id > b.id
            ? 1
            : -1
          : b.id > a.id
          ? 1
          : -1
        : this.dataset.sortorder === 'increased'
        ? a.id > b.id
          ? 1
          : -1
        : b.id > a.id
        ? 1
        : -1;
    });
  } else {
    changeSortOrder({ header, searchParam, method });
    rotateIcon({ header, searchParam, method });
    currentSort = document.querySelector('.active-sort').parentElement.dataset;
    dataCopy.sort((a, b) => {
      return searchParam || method
        ? currentSort.sortorder === 'increased'
          ? new Date(a[currentSort.sortby]) > new Date(b[currentSort.sortby])
            ? 1
            : -1
          : new Date(b[currentSort.sortby]) > new Date(a[currentSort.sortby])
          ? 1
          : -1
        : this.dataset.sortorder === 'increased'
        ? new Date(a[this.dataset.sortby]) > new Date(b[this.dataset.sortby])
          ? 1
          : -1
        : new Date(b[this.dataset.sortby]) > new Date(a[this.dataset.sortby])
        ? 1
        : -1;
    });
  }
  renderClients({
    clientsData: dataCopy,
    body,
    loader: body.loadingRow,
    header,
    searchField,
  });

  document.querySelectorAll('[data-control]').forEach((button) => {
    button.removeAttribute('disabled');
  });

  if (searchParam) searchField.focus();
}
