import AbstractView from "./abstract.js";

const createFooterFilmCounterTemplate = (count) => {
  return (
    `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`
  );
};

export default class FooterCounter extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterFilmCounterTemplate(this._count);
  }
}
