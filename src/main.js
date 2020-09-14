import {createFilmCard} from "./view/film-card.js";
import {createFilmsList} from "./view/films-list.js";
import {createMainNavigation} from "./view/main-navigation.js";
import {createMainSorting} from "./view/main-sorting.js";
import {createMostCommentedFilmsList} from "./view/most-commented-films-list.js";
import {createTopRatedFilmsList} from "./view/top-rated-films-list.js";
import {createShowMoreButton} from "./view/show-more-button.js";
import {createUserProfile} from "./view/user-profile.js";
import {createFooterFilmCounter} from "./view/footer-film-counter.js";

import {generateFilms} from "./mock/film.js";

const FilmCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderCards = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCard(), `beforeend`);
  }
};

render(siteHeader, createUserProfile(), `beforeend`);
render(siteMain, createMainNavigation(), `beforeend`);
render(siteMain, createMainSorting(), `beforeend`);
render(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const mainList = films.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);


renderCards(FilmCount.MAIN, mainListContainer);
render(mainList, createShowMoreButton(), `beforeend`);

render(films, createTopRatedFilmsList(), `beforeend`);
render(films, createMostCommentedFilmsList(), `beforeend`);

const extraFilmsList = films.querySelectorAll(`.films-list--extra`);

let topRatedFilmsList = ``;
let mostCommentedFilmsList = ``;

const assignValue = (element) => {
  const listHeader = element.querySelector(`.films-list__title`);
  if (listHeader.innerHTML === `Top rated`) {
    topRatedFilmsList = element;
  } else if (listHeader.innerHTML === `Most commented`) {
    mostCommentedFilmsList = element;
  }
};

const extraSections = Array.from(extraFilmsList);
extraSections.forEach((element) => assignValue(element));


const topRatedFilmsListContainer = topRatedFilmsList.querySelector(`.films-list__container`);
const mostCommentedFilmsListContainer = mostCommentedFilmsList.querySelector(`.films-list__container`);

renderCards(FilmCount.TOP_RATED, topRatedFilmsListContainer);
renderCards(FilmCount.MOST_COMMENTED, mostCommentedFilmsListContainer);

render(siteFooter, createFooterFilmCounter(), `beforeend`);


