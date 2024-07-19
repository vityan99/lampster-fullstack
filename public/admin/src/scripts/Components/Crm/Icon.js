import { createElement } from "../../Functions/createElement.js";

export class Icon {
  _element = null;

  constructor(icon) {
    this._icon = icon;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<i class="${this._icon}"></i>`;
  }

  get element() {
    return this._element;
  }
}
