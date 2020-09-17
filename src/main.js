import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import FilmCardView from "./view/film-card.js";
import FilmCardFullView from "./view/film-card-full.js";
import MainNavigationView from "./view/main-navigation.js";
import MainSortingView from "./view/main-sorting.js";
import MostCommentedFilmsListView from "./view/most-commented-films-list.js";
import TopRatedFilmsListView from "./view/top-rated-films-list.js";
import ShowMoreButtonView from "./view/show-more-button.js";
import UserProfileView from "./view/user-profile.js";
import FooterFilmCounterView from "./view/footer-film-counter.js";

import {generateFilms} from "./mock/film.js";

import {render, RenderPosition} from "./utils.js";


const FilmCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
  FILMS_COUNT_PER_STEP: 5,
};

const renderCards = (count, container, films) => {
  for (let i = 0; i < count; i++) {
    render(container, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
};

const mainFilms = generateFilms();
const topRatedFilms = generateFilms(FilmCount.TOP_RATED, FilmCount.TOP_RATED);
const mostCommentedFilms = generateFilms(FilmCount.MOST_COMMENTED, FilmCount.MOST_COMMENTED);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(mainFilms).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainSortingView().getElement(), RenderPosition.BEFOREEND);

const films = new FilmsView();
render(siteMainElement, films.getElement(), RenderPosition.BEFOREEND);

const mainList = new FilmsListView();
render(films.getElement(), mainList.getElement(), RenderPosition.BEFOREEND);

const mainListContainer = new FilmsListContainerView();
render(mainList.getElement(), mainListContainer.getElement(), RenderPosition.BEFOREEND);

const renderMainCards = () => {
  renderCards(FilmCount.FILMS_COUNT_PER_STEP, mainListContainer.getElement(), mainFilms);

  if (mainFilms.length > FilmCount.FILMS_COUNT_PER_STEP) {
    render(mainList.getElement(), new ShowMoreButtonView().getElement(), RenderPosition.BEFOREEND);

    let renderedFilmCount = FilmCount.FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      mainFilms
        .slice(renderedFilmCount, renderedFilmCount + FilmCount.FILMS_COUNT_PER_STEP)
        .forEach((film) => render(mainListContainer.getElement(), new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

      renderedFilmCount += FilmCount.FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= mainFilms.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }
};

renderMainCards();

const filmCardsCollection = mainListContainer.getElement().querySelectorAll(`.film-card`);

const filmCards = Array.from(filmCardsCollection);

const onClickOpen = (evt) => {
  evt.preventDefault();

  findCloseButton();

  siteFooterElement.appendChild(fullSizeCard.getElement());

  closeButton.addEventListener(`click`, onClickClose);
  fullSizeCard.getElement().removeEventListener(`click`, onClickOpen);
};

const onClickClose = (evt) => {
  evt.preventDefault();

  fullSizeCard.getElement().remove();
  fullSizeCard.removeElement();

  closeButton.removeEventListener(`click`, onClickClose);
  fullSizeCard.getElement().addEventListener(`click`, onClickOpen);
};

const fullSizeCard = new FilmCardFullView(mainFilms[0]);
let closeButton = fullSizeCard.getElement().querySelector(`.film-details__close-btn`);

const findCloseButton = () => {
  // функция (скорее всего временная) для того,
  // чтобы при повторных открытиях работала кнопка закрытия
  // не терясь при удалении обработчиков событий
  closeButton = fullSizeCard.getElement().querySelector(`.film-details__close-btn`);
};

filmCards[0].addEventListener(`click`, onClickOpen);

render(films.getElement(), new TopRatedFilmsListView().getElement(), RenderPosition.BEFOREEND);
render(films.getElement(), new MostCommentedFilmsListView().getElement(), RenderPosition.BEFOREEND);

const extraFilmsList = films.getElement().querySelectorAll(`.films-list--extra`);

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

render(siteFooterElement, new FooterFilmCounterView(mainFilms.length).getElement(), RenderPosition.BEFOREEND);


