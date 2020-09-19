import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-films.js";
import FilmCardView from "../view/film-card.js";
import FilmCardFullView from "../view/film-card-full.js";
import MainSortingView from "../view/main-sorting.js";
// import MostCommentedFilmsListView from "../view/most-commented-films-list.js";
// import TopRatedFilmsListView from "../view/top-rated-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import {render, RenderPosition, remove} from "../utils/render.js";

const FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._sortComponent = new MainSortingView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();

    render(this._movieListContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(film) {
    const filmComponent = new FilmCardView(film);
    const filmFullComponent = new FilmCardFullView(film);

    const closeButtonComponent = filmFullComponent.getElement()
    .querySelector(`.film-details__close-btn`);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._filmsListContainerComponent.removeChild(filmFullComponent.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    const onClickClose = () => {
      this._filmsListContainerComponent.removeChild(filmFullComponent.getElement());
      filmFullComponent.removeElement();

      closeButtonComponent.removeEventListener(`click`, onClickClose);
    };

    filmComponent.setOpenClickHandler(() => {
      console.log(this._filmsListContainerComponent);
      this._filmsListContainerComponent.appendChild(filmFullComponent.getElement());

      closeButtonComponent.addEventListener(`click`, onClickClose);
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    render(this._filmsListContainerComponent, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderNoFilms() {
    render(this._filmsListComponent, this._noFilmComponent, RenderPosition.AFTERBEGIN);
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreButtonComponent);
    }

  }

  _renderShowMoreButton() {
    render(this._movieListContainer, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP));

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();

    this._renderFilmList();

  }
}
