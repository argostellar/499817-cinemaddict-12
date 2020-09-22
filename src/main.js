import MainNavigationView from "./view/main-navigation.js";
// import MostCommentedFilmsListView from "./view/most-commented-films-list.js";
// import TopRatedFilmsListView from "./view/top-rated-films-list.js";
import UserProfileView from "./view/user-profile.js";
import FooterFilmCounterView from "./view/footer-film-counter.js";

import MovieListPresenter from "./presenter/movie-list.js";

import {generateFilms} from "./mock/film.js";

import {render, RenderPosition} from "./utils/render.js";

// current branch: module5-task1


// const FilmCount = {
//   MAIN: 5,
//   TOP_RATED: 2,
//   MOST_COMMENTED: 2,
// };

const mainFilms = generateFilms();
// const topRatedFilms = generateFilms(FilmCount.TOP_RATED, FilmCount.TOP_RATED);
// const mostCommentedFilms = generateFilms(FilmCount.MOST_COMMENTED, FilmCount.MOST_COMMENTED);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavigationView(mainFilms).getElement(), RenderPosition.BEFOREEND);


const movieListPresenter = new MovieListPresenter(siteMainElement);

movieListPresenter.init(mainFilms);

const filmCounterComponent = new FooterFilmCounterView(mainFilms.length);
render(siteFooterElement, filmCounterComponent.getElement(), RenderPosition.BEFOREEND);


