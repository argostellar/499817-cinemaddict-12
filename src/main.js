import UserProfileView from "./view/user-profile.js";
import FooterFilmCounterView from "./view/footer-film-counter.js";

import MovieListPresenter from "./presenter/movie-list.js";

import {generateFilms} from "./mock/film.js";

import {render, RenderPosition} from "./utils/render.js";

// current branch: module5-task2

const mainFilms = generateFilms();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterElement = document.querySelector(`.footer`);

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement);

movieListPresenter.init(mainFilms);

const filmCounterComponent = new FooterFilmCounterView(mainFilms.length);
render(siteFooterElement, filmCounterComponent.getElement(), RenderPosition.BEFOREEND);


