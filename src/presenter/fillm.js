import FilmCardView from "../view/film-card.js";
import FilmCardFullView from "../view/film-card-full.js";
import {render, RenderPosition, remove, include, exclude} from "../utils/render.js";

export default class Film {
  constructor(filmListContainer) {
    this._filmListContainer = filmListContainer;

    this._filmComponent = null;
    this._filmEditComponent = null;

    this._handleEditClick = this._handleOpenClick.bind(this);
    this._handleFormSubmit = this._handleCloseClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    this._filmComponent = new FilmCardView(film);
    this._filmFullComponent = new FilmCardFullView(film);

    this._filmComponent.setOpenClickHandler(this._handleOpenClick);
    this._filmFullComponent.setCloseClickHandler(this._handleCloseClick);

    render(this._filmListContainer, this._filmComponent, RenderPosition.BEFOREEND);
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

  _handleOpenClick() {
      this._createFullFilmComponent();
  }

  _handleCloseClick() {
    this._removeFullFilmComponent();
  }
}
