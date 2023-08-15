import { createClientRow } from './components/row.js';
import { eventHandlers } from './handlers.js';

export function renderClients({
  clientsData,
  header,
  body,
  loader,
  searchField,
}) {
  loader.remove();
  clientsData.forEach((client) => {
    body.body.append(
      createClientRow({
        clientData: client,
        eventHandlers,
        searchField,
        header,
        body,
      }),
    );
  });
}
