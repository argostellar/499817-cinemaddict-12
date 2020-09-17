import {createElement} from "../utils.js";

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

  const HOUR = 60;
  const filmDuration = `${Math.floor(duration / HOUR)}h ${duration % HOUR}m`;

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

export default class Film {
  constructor(film) {
    this._film = film;

    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
