import { createElement } from "../../Functions/createElement.js";

export class ExitButton {
  _element = null;

  constructor(setStateLoginHandler, login) {
    this._setStateLoginHandler = setStateLoginHandler;
    this._login = login;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<button class="btn btn--exit">Выйти</button>`;
  }

  _addListeners() {
    this._element.addEventListener("click", (e) => {
      this._setStateLoginHandler(!this._login);
    });
  }

  get element() {
    return this._element;
  }
}
