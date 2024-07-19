import { createElement } from "../../Functions/createElement.js";

export class MenuItem {
  _element = null;

  constructor(item, link, active) {
    this._item = item;
    this._link = link;
    this._active = active;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<li class="menu__item"><a href="${this._link}" class="menu__link ${this._active === this._link ? "menu__link--active" : ""}">${
      this._item
    }</a></li>`;
  }

  get element() {
    return this._element;
  }
}
