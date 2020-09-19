import AbstractView from "./abstract.js";
import {createElement} from "../utils.js";

const createMainSortingTemplate = () => {
  return (
    `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`
  );
};

export default class MainSorting extends Abstract {
  getTemplate() {
    return createMainSortingTemplate();
  }
}
