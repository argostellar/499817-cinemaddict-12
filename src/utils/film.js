import {SortType} from "../const.js";

const getWeightForItem = (itemA, itemB) => {
  if (itemA === null && itemB === null) {
    return 0;
  }

  if (itemA === null) {
    return 1;
  }

  if (itemB === null) {
    return -1;
  }

  return null;
};

const sortFilmByProp = (filmA, filmB, prop) => {
  const weight = getWeightForItem(filmA[prop], filmB[prop]);
  console.log(`SORT!`);

  if (weight !== null) {
    return weight;
  }

  return filmA[prop] - filmB[prop];
};

export const sortFilmDate = (filmA, filmB) => {
  sortFilmByProp(filmA, filmB, SortType.DATE);
};

export const sortFilmRating = (filmA, filmB) => {
  sortFilmByProp(filmA, filmB, SortType.RATING);
};
