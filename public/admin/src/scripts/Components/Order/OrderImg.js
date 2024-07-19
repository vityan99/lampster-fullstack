import { createElement } from "../../Functions/createElement.js";

export class OrderImg {
  _element = null;

  constructor(img) {
    this._img = img;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<img class="order__img" src="${this._img}" />`;
  }

  get element() {
    return this._element;
  }
}
