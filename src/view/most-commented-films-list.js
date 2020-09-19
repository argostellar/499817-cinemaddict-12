import AbstractView from "./abstract.js";
import {createElement} from "../utils.js";

const createMostCommentedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class MostCommentedFilmsList extends Abstract {
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }
}
