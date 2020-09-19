import AbstractView from "./abstract.js";
import {createElement} from "../utils.js";

const createFilmsTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Films extends Abstract {
  getTemplate() {
    return createFilmsTemplate();
  }
}

