import { createElement } from "../../Functions/createElement.js";

export class IconFavorite {
  _element = null;

  constructor(setStateClickFavoriteHandler, { active }) {
    this._setStateClickFavoriteHandler = setStateClickFavoriteHandler;
    this._active = active;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<i class="${this._active ? 'fa-solid fa-star" style="color: #ff0000' : "fa-regular fa-star"}"></i>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._setStateClickFavoriteHandler(!this._active);
    });
  }

  get element() {
    return this._element;
  }
}
