"use strict";

const CardCount = {
  MAIN: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2
};


const siteHeader = document.querySelector(`.header`);
const siteMain = document.querySelector(`.main`);
const siteFooter = document.querySelector(`.footer`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const renderCards = (count, container) => {
  for (let i = 0; i < count; i++) {
    render(container, createFilmCard(), `beforeend`);
  }
};

const createUserProfile = () => {
  return (
    `<section class="header__profile profile">
    <p class="profile__rating">Movie Buff</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
  );
};

const createMainNavigation = () => {
  return (
    `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
  );
};

const createMainSorting = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

const createFilmsList = () => {
  return (
    `<section class="films">
      <section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container"></div>
      </section>
      </section>`
  );
};

const createShowMoreButton = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createTopRatedFilmsList = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createMostCommentedFilmsList = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

const createFilmCard = () => {
  return (
    `<article class="film-card">
          <h3 class="film-card__title">The Man with the Golden Arm</h3>
          <p class="film-card__rating">9.0</p>
          <p class="film-card__info">
            <span class="film-card__year">1955</span>
            <span class="film-card__duration">1h 59m</span>
            <span class="film-card__genre">Drama</span>
          </p>
          <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
          <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
          <a class="film-card__comments">18 comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
        </article>`
  );
};

const createFooterFilmCounter = () => {
  return (
    `<section class="footer__statistics">
    <p>130 291 movies inside</p>
  </section>`
  );
};

render(siteHeader, createUserProfile(), `beforeend`);
render(siteMain, createMainNavigation(), `beforeend`);
render(siteMain, createMainSorting(), `beforeend`);
render(siteMain, createFilmsList(), `beforeend`);

const films = siteMain.querySelector(`.films`);
const mainList = films.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);


renderCards(CardCount.MAIN, mainListContainer);
render(mainList, createShowMoreButton(), `beforeend`);

render(films, createTopRatedFilmsList(), `beforeend`);
render(films, createMostCommentedFilmsList(), `beforeend`);

const extraFilmsList = films.querySelectorAll(`.films-list--extra`);

let topRatedFilmsList = ``;
let mostCommentedFilmsList = ``;

const checkElement = (element) => {
  const listHeader = element.querySelector(`.films-list__title`);
  if (listHeader.innerHTML === `Top rated`) {
    topRatedFilmsList = element;
    return;
  } else if (listHeader.innerHTML === `Most commented`) {
    mostCommentedFilmsList = element;
    return;
  }
};

let foo = Array.from(extraFilmsList);
foo.forEach((element) => checkElement(element));


const topRatedFilmsListContainer = topRatedFilmsList.querySelector(`.films-list__container`);
const mostCommentedFilmsListContainer = mostCommentedFilmsList.querySelector(`.films-list__container`);

renderCards(CardCount.TOP_RATED, topRatedFilmsListContainer);
renderCards(CardCount.MOST_COMMENTED, mostCommentedFilmsListContainer);

render(siteFooter, createFooterFilmCounter(), `beforeend`);


