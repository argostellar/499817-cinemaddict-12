import {getRandomInteger, getRandomArrayElement, getUniqueArray, randomBooleanValue} from "../utils.js";
import {POSTERS,
  FILM_NAMES,
  NAMES,
  GENRES,
  COUNTRIES,
  SENTENCES,
  COMMENTATORS,
  COMMENTS,
  EMOJIS} from "../const.js";

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

  const description = getUniqueArray(sentencesCount, SENTENCES).join(` `);

  return description;
};

const generateRating = () => {
  const MIN_RATING = 0;
  const MAX_RATING = 10;

  const randomRating = getRandomInteger(MIN_RATING, MAX_RATING);

  return randomRating;
};

const generateDuration = () => {
  const MIN_DURATION = 30;
  const MAX_DURATION = 240;

  const randomDuration = getRandomInteger(MIN_DURATION, MAX_DURATION);

  return randomDuration;
};

const generateComment = () => {
  const author = getRandomArrayElement(COMMENTATORS);
  const date = new Date(Math.random() * Date.now());
  const text = getRandomArrayElement(COMMENTS);
  const emoji = getRandomArrayElement(EMOJIS);

  const comment = {
    author,
    date,
    text,
    emoji,
  };
  return comment;
};

const generateComments = () => {
  const MIN_COUNT = 0;
  const MAX_COUNT = 5;

  const commentsCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments[i] = generateComment();
  }

  return comments;
};

const generateDirector = () => {
  const director = getRandomArrayElement(NAMES);

  return director;
};

const generateWriters = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 3;

  const writersCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const writers = getUniqueArray(writersCount, NAMES).join(`, `);

  return writers;
};

const generateActors = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 3;

  const actorsCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const actors = getUniqueArray(actorsCount, NAMES).join(`, `);

  return actors;
};

const generateGenres = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 3;

  const genresCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const genres = getUniqueArray(genresCount, GENRES);

  return genres;
};

const generateReleaseDate = () => {
  const MIN_YEAR = 1895;
  const MAX_YEAR = 2020;
  const JS_YEAR = 1970;

  const year = getRandomInteger(MIN_YEAR, MAX_YEAR);

  const msInYear = 365 * 24 * 60 * 60 * 1000;
  const yearDiffInMs = (JS_YEAR - MIN_YEAR) * msInYear;

  const yearInMs = (year - MIN_YEAR) * msInYear;
  const msDate = new Date(yearInMs - yearDiffInMs);
  const releaseDate = new Date(msDate);
  return releaseDate;
};

const generateCountry = () => {
  const country = getRandomArrayElement(COUNTRIES);
  return country;
};

export const generateFilm = () => {
  return {
    name: generateName(),
    poster: generatePoster(),
    description: generateDescription(),
    comments: generateComments(),
    releaseDate: generateReleaseDate(),
    rating: generateRating(),
    duration: generateDuration(),
    genres: generateGenres(),
    country: generateCountry(),
    director: generateDirector(),
    writers: generateActors(),
    actors: generateWriters(),
    isInWatchList: randomBooleanValue(),
    isWatched: randomBooleanValue(),
    isFavorite: randomBooleanValue(),
  };
};

export const generateFilms = (MIN_COUNT = 15, MAX_COUNT = 20) => {
  const count = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const films = new Array(count).fill().map(generateFilm);

  return films;
};
