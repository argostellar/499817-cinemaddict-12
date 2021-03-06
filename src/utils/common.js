import moment from "moment";

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


export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const formatCommentDate = (commentDate) => {
  if (!(commentDate instanceof Date)) {
    return ``;
  }

  return moment(commentDate).format(`YYYY/MM/DD HH:MM`);
};

export const formatFilmReleaseDate = (releaseDate) => {
  if (!(releaseDate instanceof Date)) {
    return ``;
  }

  return moment(releaseDate).format(`DD MMMM YYYY`);
};

export const formatFilmDuration = (filmDuration) => {
  const HOUR = 60;
  const MILLISECOND = 1000;
  return moment.utc(filmDuration * HOUR * MILLISECOND).format(`H[h] mm[m]`);
};

