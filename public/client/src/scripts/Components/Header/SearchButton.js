import { createElement } from "../../Functions/createElement.js";

export class SearchButton {
  _element = null;

  constructor(icon, searchOpenHandler) {
    this._icon = icon;
    this._searchOpenHandler = searchOpenHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<button class="btn btn--search header__control-btn"><i class="${this._icon}"></i></button>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._searchOpenHandler();
    });
  }

  get element() {
    return this._element;
  }
}
