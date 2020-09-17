import {createElement} from "../utils.js";

const createMainNavigationTemplate = (films) => {
  let watchlistCount = 0;
  let watchedCount = 0;
  let favoritesCount = 0;

  console.log(films);

  for (const film of films) {
    if (film.isInWatchList) {
      watchlistCount++;
    }
    if (film.isWatched) {
      watchedCount++;
    }
    if (film.isFavorite) {
      favoritesCount++;
    }
  }

  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistCount}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${watchedCount}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesCount}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

export default class MainNavigation {
  constructor(films) {
    this._films = films;

    this._element = null;
  }

  getTemplate() {
    return createMainNavigationTemplate(this._films);
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
