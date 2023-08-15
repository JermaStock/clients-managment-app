export function createContainer() {
  const section = document.createElement('seciton');
  const container = document.createElement('div');

  section.classList.add('clients');
  container.classList.add('container', 'clients__container');
  section.id = 'clients';

  section.append(container);

  return container;
}
