export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomArrayElement = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

const checkArrayUniqueness = (array) => {
  for (let j = 0; j < array.length; j++) {
    let currentItem = array[j];
    if (array.length > 1) {
      for (let i = j + 1; i < array.length; i++) {
        if (currentItem === array[i]) {
          const currentItemIndex = array.indexOf(currentItem);
          array.splice(currentItemIndex, 1);
        }
      }
    }
  }
};

export const getUniqueArray = (itemsCount, itemConsts) => {
  const items = new Array(itemsCount).fill().map(() => {
    return getRandomArrayElement(itemConsts);
  });

  const itemsLength = items.length;

  for (let i = 0; i < itemsLength; i++) {
    checkArrayUniqueness(items);
    if (itemsLength !== items.length) {
      const newItem = getRandomArrayElement(itemConsts);
      items.push(newItem);
    }
  }
  return items;
};

export const randomBooleanValue = () => {
  const value = Boolean(getRandomInteger(0, 1));
  return value;
};
