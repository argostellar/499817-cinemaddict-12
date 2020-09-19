import AbstractView from "./abstract.js";
import {createElement} from "../utils.js";

const createNoFilmTemplate = () => {
  return `<h2 class="films-list__title">There are no movies in our database</h2>`;
};

export default class NoFilm extends Abstract {
  getTemplate() {
    return createNoFilmTemplate();
  }
}
