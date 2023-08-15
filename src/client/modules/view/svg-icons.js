export function createSvgIcon({
  nameSpace = 'http://www.w3.org/2000/svg',
  attributes = {},
  addClass = [],
  addNameSpace = [],
  appendInto = '',
  insertType = true,
}) {
  const svgNsMap = new Map();
  addNameSpace.forEach((ns) => {
    svgNsMap.set(ns, document.createElementNS(nameSpace, ns));
  });

  if (addClass.length) {
    addClass.forEach((el) => {
      svgNsMap.get('svg').classList.add(el);
    });
  }

  for (const [attrType, value] of Object.entries(attributes)) {
    for (const [attrName, attrValue] of Object.entries(value)) {
      svgNsMap.get(attrType).setAttribute(attrName, attrValue);
    }
  }

  svgNsMap.get('svg').appendChild(svgNsMap.get('path'));

  for (const element of svgNsMap.values()) {
    if (element !== svgNsMap.get('svg')) {
      svgNsMap.get('svg').appendChild(element);
    }
  }

  if (appendInto) {
    return insertType
      ? appendInto.appendChild(svgNsMap.get('svg'))
      : appendInto.prepend(svgNsMap.get('svg'));
  } else {
    return svgNsMap.get('svg');
  }
}
