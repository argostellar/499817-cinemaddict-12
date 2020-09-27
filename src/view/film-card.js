import AbstractView from "./abstract.js";
import {formatFilmDuration} from "../utils/common.js";

const createFilmCardTemplate = (film) => {
  const
    {name,
      poster,
      description,
      comments,
      rating,
      releaseDate,
      duration,
      genres,
      isInWatchList,
      isWatched,
      isFavorite} = film;

  const filmDuration = formatFilmDuration(duration);

  const filmGenres = genres.slice();
  const genre = filmGenres.shift();

  const isActiveTemplate = (isActive) => {
    return isActive ? `film-card__controls-item--active` : ``;
  };

  const year = releaseDate.toLocaleString(`en-US`, {year: `numeric`});


  return (
    `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}.0</p>
          <p class="film-card__info">
            <span class="film-card__year">${year}</span>
            <span class="film-card__duration">${filmDuration}</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${comments.length} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isActiveTemplate(isInWatchList)}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isActiveTemplate(isWatched)}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${isActiveTemplate(isFavorite)}">Mark as favorite</button>
          </form>
        </article>`
  );
};

export default class Film extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._openClickHandler = this._openClickHandler.bind(this);

    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchListClickHandler = this._watchListClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _openClickHandler(evt) {
    evt.preventDefault();
    this._callback.openClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _watchListClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchListClick();
  }

  setOpenClickHandler(callback) {
    this._callback.openClick = callback;
    this.getElement().addEventListener(`click`, this._openClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
    .querySelector(`.film-card__controls-item--favorite`)
    .addEventListener(`click`, this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
    .querySelector(`.film-card__controls-item--mark-as-watched`)
    .addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchListClickHandler(callback) {
    this._callback.watchListClick = callback;
    this.getElement()
    .querySelector(`.film-card__controls-item--add-to-watchlist`)
    .addEventListener(`click`, this._watchListClickHandler);
  }
}
