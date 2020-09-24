import FilmCardView from "../view/film-card.js";
import FilmCardFullView from "../view/film-card-full.js";
import {render, RenderPosition, remove, include, exclude} from "../utils/render.js";

export default class Film {
  constructor(filmListContainer, changeData) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;

    this._filmComponent = null;
    this._filmFullComponent = null;

    this._handleOpenClick = this._handleOpenClick.bind(this);
    this._handleCloseClick = this._handleCloseClick.bind(this);

    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchListClick = this._handleWatchListClick.bind(this);

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevFilmFullComponent = this._filmFullComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmFullComponent = new FilmCardFullView(film);

    this._filmComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmFullComponent.setCloseClickHandler(this._handleCloseClick);

    this._taskComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._taskComponent.setWatchListClickHandler(this._handleWatchListClick);
    this._taskComponent.setWatchedClickHandler(this._handleWatchedClick);

    if (prevFilmComponent === null || prevFilmFullComponent === null) {
      render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    // нужны ли следующие две проверки?

    if (this._filmListContainer.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._taskListContainer.getElement().contains(prevFilmFullComponent.getElement())) {
      replace(this._filmFullComponent, prevFilmFullComponent);
    }

    remove(prevFilmComponent);
    remove(prevFilmFullComponent);
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  _createFullFilmComponent() {
    include(this._filmFullComponent, this._filmListContainer)
    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  _removeFullFilmComponent() {
    exclude(this._filmFullComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _escKeyDownHandler = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        this._removeFullFilmComponent();
      }
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _handleWatchListClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isInWatchList: !this._film.isInWatchList
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _handleOpenClick() {
      this._createFullFilmComponent();
  }

  _handleCloseClick(film) {
    this._changeData(film);
    this._removeFullFilmComponent();
  }
}
