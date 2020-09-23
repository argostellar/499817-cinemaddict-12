import AbstractView from "./abstract.js";

const createMostCommentedFilmsListTemplate = () => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>`
  );
};

export default class MostCommentedFilmsList extends AbstractView {
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }
}
