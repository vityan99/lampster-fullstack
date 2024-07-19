import { createElement } from "../../Functions/createElement.js";

export class Option {
  _element = null;

  constructor(key, unit, groupType, value, text, index) {
    this._key = key;
    this._unit = unit;
    this._groupType = groupType;
    this._value = value;
    this._text = text;
    this._index = index;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<option value="${this._value}" ${this._index === 0 ? "selected" : ""}>${this._text}</option>`;
  }

  get element() {
    return this._element;
  }
}
