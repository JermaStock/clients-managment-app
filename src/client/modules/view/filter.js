import { sortClientData } from './sort.js';

export function filterClients({ header, body, searchField }) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(async () => {
      sortClientData({
        header,
        body,
        searchParam: `?search=${this.value}`,
        searchField,
      });
    }, 300);
  };
}
