import { createElement } from "../../Functions/createElement.js";

export class OrderOption {
  _element = null;

  constructor(selected, text) {
    this._selected = selected;
    this._text = text;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<option value="${this._text}" ${this._selected ? "selected" : ""} >${this._text}</option>`;
  }

  get element() {
    return this._element;
  }
}
