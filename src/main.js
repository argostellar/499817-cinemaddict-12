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
import {createFullFilmCard} from "./view/film-card-full.js";

const FilmCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
  FILMS_COUNT_PER_STEP: 5,
};

const mainFilms = generateFilms();
const topRatedFilms = generateFilms(FilmCount.TOP_RATED, FilmCount.TOP_RATED);
const mostCommentedFilms = generateFilms(FilmCount.MOST_COMMENTED, FilmCount.MOST_COMMENTED);

const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderCards = (count, container, films) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCard(films[i]), `beforeend`);
  }
};

render(siteHeader, createUserProfile(), `beforeend`);
render(siteMain, createMainNavigation(mainFilms), `beforeend`);
render(siteMain, createMainSorting(), `beforeend`);
render(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const mainList = films.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

const renderMainCards = () => {
  renderCards(FilmCount.FILMS_COUNT_PER_STEP, mainListContainer, mainFilms);

  if (mainFilms.length > FilmCount.FILMS_COUNT_PER_STEP) {
    render(mainList, createShowMoreButton(), `beforeend`);

    let renderedFilmCount = FilmCount.FILMS_COUNT_PER_STEP;

    const showMoreButton = mainList.querySelector(`.films-list__show-more`);

    showMoreButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      mainFilms
        .slice(renderedFilmCount, renderedFilmCount + FilmCount.FILMS_COUNT_PER_STEP)
        .forEach((film) => render(mainListContainer, createFilmCard(film), `beforeend`));

      renderedFilmCount += FilmCount.FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= mainFilms.length) {
        showMoreButton.remove();
      }
    });
  }
};

renderMainCards();

const filmCardsCollection = mainListContainer.querySelectorAll(`.film-card`);

const filmCards = Array.from(filmCardsCollection);


filmCards[0].addEventListener(`click`, (evt) => {
  evt.preventDefault();
  const fullSizeCard = createFullFilmCard(mainFilms[0]);
  render(siteFooter, fullSizeCard, `afterend`);
});

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

renderCards(topRatedFilms.length, topRatedFilmsListContainer, topRatedFilms);
renderCards(mostCommentedFilms.length, mostCommentedFilmsListContainer, mostCommentedFilms);

render(siteFooter, createFooterFilmCounter(filmCards.length), `beforeend`);


