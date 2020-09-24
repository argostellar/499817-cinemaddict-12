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

export const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForItem(filmA.releaseDate, filmB.releaseDate);

  if (weight !== null) {
    return weight;
  }

  return filmB.releaseDate.getTime() - filmA.releaseDate.getTime();
};

export const sortFilmRating = (filmA, filmB) => {
  const weight = getWeightForItem(filmA.rating, filmB.rating);

  if (weight !== null) {
    return weight;
  }

  return filmB.rating - filmA.rating;
};

export const sortFilmCommented = (filmA, filmB) => {
  const weight = getWeightForItem(filmA.comments.length, filmB.comments.length);

  if (weight !== null) {
    return weight;
  }

  return filmB.comments.length - filmA.comments.length;
};
