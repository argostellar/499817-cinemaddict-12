import {getRandomInteger, getRandomArrayElement} from "../utils.js";
import {POSTERS} from "../const.js";

const generateName = () => {
  const names = [
  'Lorem Ipsum',
  'Lorem Ipsum 2: Electric Boogaloo',
  'Equilibrium',
  'Die Hard',
  'GoldenEye',
  'Alien',
  'Terminator',
  ];

  return getRandomArrayElement(names);
};

const generatePoster = () => {
  const path = '/public/images/posters';

  const finalPath = path + '/' + getRandomArrayElement(POSTERS);

  return finalPath;
};

const generateDescription = () => {
  const MIN_COUNT = 1;
  const MAX_COUNT = 5;

  const sentencesCount = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const sentences = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
  'Cras aliquet varius magna, non porta ligula feugiat eget. ',
  'Fusce tristique felis at fermentum pharetra. ',
  'Aliquam id orci ut lectus varius viverra. ',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. ',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. ',
  'Sed sed nisi sed augue convallis suscipit in sed felis. ',
  'Aliquam erat volutpat. ',
  'Nunc fermentum tortor ac porta dapibus. ',
  'In rutrum ac purus sit amet tempus. ',
  ];

  let description = '';

  for (let i = 0; i < sentencesCount.length; i++) {
    description = description + getRandomArrayElement(sentences);
  }

  return description;
};

const generateYear = () => {
  const MIN_YEAR = 1895;
  const MAX_YEAR = 2020;

  const randomYear = getRandomInteger(MIN_YEAR, MAX_YEAR);

  return randomYear;
};

const generateRating = () => {
  const MIN_RATING = 0;
  const MAX_RATING = 100;

  const randomRating = getRandomInteger(MIN_RATING, MAX_RATING);

  return randomRating;
};

const generateDuration = () => {
  const MIN_DURATION = 30;
  const MAX_DURATION = 240;

  const randomDuration = getRandomInteger(MIN_DURATION, MAX_DURATION);

  return randomDuration;
};

const generateGenre = () => {
  const genres = [
  'action',
  'adventure',
  'comedy',
  'crime',
  'drama',
  'fantasy',
  'horror',
  'mystery',
  'romance',
  'thriller',
  'western',
  ];

  return getRandomArrayElement(genres);
};

const generateComments = () => {
  const MIN_COUNT = 0;
  const MAX_COUNT = 5;

  const randomComments = getRandomInteger(MIN_COUNT, MAX_COUNT);

  return randomComments;
};


export const generateFilm = () => {
  const name = generateName();
  const poster = generatePoster();
  const description = generateDuration();
  const comments = generateComments();
  const year = generateYear();
  const rating = generateRating();
  const duration = generateDuration();
  const genre = generateGenre();

  return {
    name,
    poster,
    description,
    comments,
    year,
    rating,
    duration,
    genre,
  };
};

export const generateFilms = (MIN_COUNT = 15, MAX_COUNT = 20) => {
  const count = getRandomInteger(MIN_COUNT, MAX_COUNT);

  const films = [];

  for (let i = 0; i < count; i++) {
    films[i] = generateFilm();
  }

  return films;
};
