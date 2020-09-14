import {getRandomInteger, getRandomArrayElement} from "../utils.js";
import {POSTERS, FILM_NAMES, NAMES, GENRES, COUNTRIES, SENTENCES} from "../const.js";

const generateName = () => {
  return getRandomArrayElement(FILM_NAMES);
};

const generatePoster = () => {
  const poster = getRandomArrayElement(POSTERS);

  return poster;
};

const generateDescription = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 5;

  const sentencesCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  let description = new Array(sentencesCount).fill().map(() => {
    return getRandomArrayElement(SENTENCES);
  }).join(` `);

  return description;
};

const generateYear = () => {
  const MIN_YEAR = 1895;
  const MAX_YEAR = 2020;

  const randomYear = getRandomInteger(MIN_YEAR, MAX_YEAR);

  return randomYear;
};

const generateRating = () => {
  const MIN_RATING = 0.0;
  const MAX_RATING = 10.0;

  const randomRating = getRandomInteger(MIN_RATING, MAX_RATING);

  return randomRating;
};

const generateDuration = () => {
  const MIN_DURATION = 30;
  const MAX_DURATION = 240;

  const randomDuration = getRandomInteger(MIN_DURATION, MAX_DURATION);

  return randomDuration;
};

const generateComments = () => {
  const MIN_COUNT = 0;
  const MAX_COUNT = 5;

  const randomComments = getRandomInteger(MIN_COUNT, MAX_COUNT);

  return randomComments;
};

const generateActors = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 3;

  const actorsCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  let actors = new Array(actorsCount).fill().map(() => {
    return getRandomArrayElement(NAMES);
  }).join(` `);

  return actors;
};

const generateWriters = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 3;

  const writersCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  let writers = new Array(writersCount).fill().map(() => {
    return getRandomArrayElement(NAMES);
  }).join(` `);

  return writers;
};

const generateGenres = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 3;

  const genresCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  let genres = new Array(genresCount).fill().map(() => {
    return getRandomArrayElement(GENRES);
  });

  return genres;
};

const generateDirector = () => {
  const director = getRandomArrayElement(NAMES);

  return director;
};

const generateReleaseDate = (year) => {
  const releaseDate = new Date(year, getRandomInteger(1, 12), getRandomInteger(1, 31));
  return releaseDate.toLocaleString(`en-US`, {day: `numeric`, month: `long`, year: `numeric`});
};

const generateCountry = () => {
  const country = getRandomArrayElement(COUNTRIES);
  return country;
};

export const generateFilm = () => {
  const name = generateName();
  const poster = generatePoster();
  const description = generateDescription();
  const comments = generateComments();
  const year = generateYear();
  const releaseDate = generateReleaseDate(year);
  const rating = generateRating();
  const duration = generateDuration();
  const genres = generateGenres();

  const country = generateCountry();
  const director = generateDirector();
  const actors = generateActors();
  const writers = generateWriters();

  const isInWatchList = Boolean(getRandomInteger(0, 1));
  const isWatched = Boolean(getRandomInteger(0, 1));
  const isFavorite = Boolean(getRandomInteger(0, 1));

  return {
    name,
    poster,
    description,
    comments,
    year,
    releaseDate,
    rating,
    duration,
    genres,
    country,
    director,
    actors,
    writers,
    isInWatchList,
    isWatched,
    isFavorite,
  };
};

export const generateFilms = (MIN_COUNT = 15, MAX_COUNT = 20) => {
  const count = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const films = new Array(count).fill().map(generateFilm);

  return films;
};
