const URL_PATH = 'http://localhost:3000/api/clients/';

export async function loadClients(clientId = '') {
  console.log(`${URL_PATH}${clientId}`);
  const response = await fetch(`${URL_PATH}${clientId}`);
  const data = await response.json();
  return data;
}

export async function editClient(clientData, clientId) {
  await fetch(`${URL_PATH}${clientId}`, {
    method: 'PATCH',
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function createClient(clientData) {
  await fetch(URL_PATH, {
    method: 'POST',
    body: JSON.stringify(clientData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteClient(clientId) {
  await fetch(`${URL_PATH}${clientId}`, {
    method: 'DELETE',
  });
}
