import { focusTrap } from './utils.js';
import { renderModalWindow } from './components/modal.js';
import { createForm } from '../view/components/form.js';
import {
  loadClients,
  editClient,
  createClient,
  deleteClient,
} from '../api/api.js';
import { sortClientData } from './sort.js';

export const eventHandlers = {
  async onSave(clientInfo, clientData, header, body, searchField) {
    if (clientData.id) {
      await editClient(clientInfo, clientData.id);
    } else {
      await createClient(clientInfo);
    }
    sortClientData({ method: true, header, body, searchField });
  },
  async onChange({ clientId, clientRow, searchField, header, body }) {
    let clientData = await loadClients(clientId);
    const editModal = renderModalWindow({
      modalWindowFunc: createForm,
      clientData,
      eventHandlers,
      clientRow,
      searchField,
      header,
      body,
    });
    document.body.append(editModal);
    focusTrap(editModal);
    editModal.classList.add('modal--active');
  },
  async onDelete({ clientData, clientRow, header, body, searchField }) {
    console.log(header, body, searchField);
    await deleteClient(clientData.id);
    clientRow.remove();
    sortClientData({ method: true, header, body, searchField });
  },
  onClose(element) {
    setTimeout(() => element.remove(), 200);
    element.classList.remove('modal--active');
  },
};
