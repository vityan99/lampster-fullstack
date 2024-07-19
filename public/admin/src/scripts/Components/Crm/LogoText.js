import { createElement } from "../../Functions/createElement.js";

export class LogoText {
  _element = null;

  constructor(firstPart, secondPart) {
    this._firsrPart = firstPart;
    this._secondPart = secondPart;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<span class="logo__text-master">${this._firsrPart}<span class="logo__text-primary">${this._secondPart}</span> </span>`;
  }

  get element() {
    return this._element;
  }
}
