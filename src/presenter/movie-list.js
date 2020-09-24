import FilmsView from "../view/films.js";
import FilmsListView from "../view/films-list.js";
import FilmsListContainerView from "../view/films-list-container.js";
import NoFilmView from "../view/no-films.js";
import FilmPresenter from "../presenter/film.js";
import {updateItem} from "../utils/common.js";
import MainSortingView from "../view/main-sorting.js";
import MostCommentedFilmsListView from "../view/most-commented-films-list.js";
import TopRatedFilmsListView from "../view/top-rated-films-list.js";
import ShowMoreButtonView from "../view/show-more-button.js";
import MainNavigationView from "../view/main-navigation.js";

import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType} from "../const.js";
import {sortFilmDate, sortFilmRating, sortFilmCommented} from "../utils/film.js";

const FILMS_COUNT_PER_STEP = 5;
const MIN_EXTRA_FILMS = 0;
const MAX_EXTRA_FILMS = 2;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderedFilmCount = 0;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = {};

    this._minExtraFilms = MIN_EXTRA_FILMS;
    this._maxExtraFilms = MAX_EXTRA_FILMS;

    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._topRatedFilmsListContainerComponent = new FilmsListContainerView();
    this._mostCommentedFilmsListContainerComponent = new FilmsListContainerView();
    this._sortComponent = new MainSortingView();
    this._noFilmComponent = new NoFilmView();
    this._showMoreButtonComponent = new ShowMoreButtonView();

    this._topFilmsList = new TopRatedFilmsListView();
    this._commentedFilmsList = new MostCommentedFilmsListView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._sourcedBoardFilms = boardFilms.slice();

    this._renderedFilmCount = FILMS_COUNT_PER_STEP;

    this._mainNavigation = new MainNavigationView(this._boardFilms);

    render(this._movieListContainer, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderBoard();
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._sourcedBoardFilms = updateItem(this._sourcedBoardFilms, updatedFilm);
    this._filmPresenter[updatedFilm.id].init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._boardFilms.sort(sortFilmDate);
        break;
      case SortType.RATING:
        this._boardFilms.sort(sortFilmRating);
        break;
      case SortType.MOST_COMMENTED:
        this._boardFilms.sort(sortFilmCommented);
        break;
      default:
        this._boardFilms = this._sourcedBoardFilms.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _clearFilmList() {
    Object
      .values(this._filmPresenter)
      .forEach((presenter) => presenter.destroy());
    this._taskPresenter = {};
    this._renderedFilmCount = FILMS_COUNT_PER_STEP;
  }

  _renderNavigation() {
    render(this._movieListContainer, this._mainNavigation, RenderPosition.AFTERBEGIN);
  }

  _renderSort() {
    render(this._movieListContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(film, container = this._filmsListContainerComponent, updateHandler = this._handleFilmChange) {
    const filmPresenter = new FilmPresenter(container, updateHandler);
    filmPresenter.init(film);
    this._filmPresenter[film.id] = filmPresenter;
  }

  _renderFilms(from, to, typeOfExtra, extraSection) {
    if (arguments.length > 2) {
      typeOfExtra
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm, extraSection));
      return;
    }

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
    render(this._filmsListComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderFilmList() {
    this._renderFilms(0, Math.min(this._boardFilms.length, FILMS_COUNT_PER_STEP));

    if (this._boardFilms.length > FILMS_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderTopRatedFilms() {
    render(this._filmsComponent, this._topFilmsList, RenderPosition.BEFOREEND);
    render(this._topFilmsList, this._topRatedFilmsListContainerComponent, RenderPosition.BEFOREEND);
    this._topRatedFilms = this._boardFilms.slice()
    .sort(sortFilmRating);
    this._renderFilms(this._minExtraFilms, this._maxExtraFilms, this._topRatedFilms, this._topRatedFilmsListContainerComponent);
  }

  _renderMostCommentedFilms() {
    render(this._filmsComponent, this._commentedFilmsList, RenderPosition.BEFOREEND);
    render(this._commentedFilmsList, this._mostCommentedFilmsListContainerComponent, RenderPosition.BEFOREEND);
    this._mostCommentedFilms = this._boardFilms.slice()
    .sort(sortFilmCommented);
    this._renderFilms(this._minExtraFilms, this._maxExtraFilms, this._mostCommentedFilms, this._mostCommentedFilmsListContainerComponent);
  }

  _renderExtraFilms() {
    this._renderTopRatedFilms();
    this._renderMostCommentedFilms();
  }

  _renderBoard() {
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }

    this._renderSort();
    this._renderNavigation();

    this._renderFilmList();
    this._renderExtraFilms();
  }
}
