import AbstractView from "./abstract.js";
import {createElement} from "../utils.js";

const createFooterFilmCounterTemplate = (count) => {
  return (
    `<section class="footer__statistics">
    <p>${count} movies inside</p>
  </section>`
  );
};

export default class FooterCounter extends Abstract {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterFilmCounterTemplate(this._count);
  }
}
