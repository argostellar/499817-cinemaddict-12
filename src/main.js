import FilmsView from "./view/films.js";
import FilmsListView from "./view/films-list.js";
import FilmsListContainerView from "./view/films-list-container.js";
import NoFilmView from "./view/no-films.js";
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

// current branch: module5-task1
console.log(`Initial commit`);


const FilmCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
  FILMS_COUNT_PER_STEP: 5,
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

const renderFilm = (filmsListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmFullComponent = new FilmCardFullView(film);
  const closeButtonComponent = filmFullComponent.getElement()
  .querySelector(`.film-details__close-btn`);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      siteFooterElement.removeChild(filmFullComponent.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const onClickOpen = (evt) => {
    evt.preventDefault();

    siteFooterElement.appendChild(filmFullComponent.getElement());

    closeButtonComponent.addEventListener(`click`, onClickClose);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onClickClose = (evt) => {
    evt.preventDefault();

    siteFooterElement.removeChild(filmFullComponent.getElement());
    filmFullComponent.removeElement();

    closeButtonComponent.removeEventListener(`click`, onClickClose);
  };

  filmComponent.getElement().addEventListener(`click`, onClickOpen);
  closeButtonComponent.addEventListener(`click`, onClickClose);

  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderCardsBoard = (boardFilms) => {
  const films = new FilmsView();
  const mainList = new FilmsListView();

  render(siteMainElement, films.getElement(), RenderPosition.BEFOREEND);
  render(films.getElement(), mainList.getElement(), RenderPosition.BEFOREEND);

  if (boardFilms.length === 0) {
    render(mainList.getElement(), new NoFilmView().getElement(), RenderPosition.AFTERBEGIN);
    return;
  }

  const mainListContainer = new FilmsListContainerView();
  render(mainList.getElement(), mainListContainer.getElement(), RenderPosition.BEFOREEND);

  boardFilms
        .slice(0, Math.min(boardFilms.length, FilmCount.FILMS_COUNT_PER_STEP))
        .forEach((boardFilm) => renderFilm(mainListContainer.getElement(), boardFilm));

  if (boardFilms.length > FilmCount.FILMS_COUNT_PER_STEP) {
    let renderedFilmCount = FilmCount.FILMS_COUNT_PER_STEP;

    const showMoreButtonComponent = new ShowMoreButtonView();

    render(mainList.getElement(), showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      boardFilms
        .slice(renderedFilmCount, renderedFilmCount + FilmCount.FILMS_COUNT_PER_STEP)
        .forEach((boardFilm) => renderFilm(mainListContainer.getElement(), boardFilm));

      renderedFilmCount += FilmCount.FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= boardFilms.length) {
        showMoreButtonComponent.getElement().remove();
        showMoreButtonComponent.removeElement();
      }
    });
  }

  // Секция дополнительного задания (TopRated и MostCommented секции)

  const topFilmsList = new TopRatedFilmsListView();
  const commentedFilmsList = new MostCommentedFilmsListView();

  render(films.getElement(), topFilmsList.getElement(), RenderPosition.BEFOREEND);
  render(films.getElement(), commentedFilmsList.getElement(), RenderPosition.BEFOREEND);

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

  const renderExtraSections = (filmListElement, someFilms) => {
    for (const film of someFilms) {
      renderFilm(filmListElement, film);
    }
  };

  renderExtraSections(topRatedFilmsListContainer, topRatedFilms);
  renderExtraSections(mostCommentedFilmsListContainer, mostCommentedFilms);
};

renderCardsBoard(mainFilms);

const filmCounterComponent = new FooterFilmCounterView(mainFilms.length);
render(siteFooterElement, filmCounterComponent.getElement(), RenderPosition.BEFOREEND);


