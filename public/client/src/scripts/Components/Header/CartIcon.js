import { createElement } from "../../Functions/createElement.js";

export class CartIcon {
  _element = null;

  constructor(icon, cartOpenHandler) {
    this._icon = icon;
    this._cartOpenHandler = cartOpenHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._cartOpenHandler();
    });
  }

  _getTemplate() {
    return `<i class="${this._icon}"></i>`;
  }

  get element() {
    return this._element;
  }
}
