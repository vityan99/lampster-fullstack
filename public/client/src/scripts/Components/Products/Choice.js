import { createElement } from "../../Functions/createElement.js";

export class Choice {
  _element = null;

  constructor(id, text, unit, img, setStateActiveHandler, { active }) {
    this._id = id;
    this._text = text;
    this._unit = unit;
    this._img = img;
    this._setStateActiveHandler = setStateActiveHandler;
    this._active = active;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="choice-item ${this._active ? "choice-item--active" : ""}" data-id="${this._id}">${this._text}${
      this._unit ? this._unit : ""
    }</div>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._setStateActiveHandler(this._id, this._text, this._unit, this._img);
    });
  }

  get element() {
    return this._element;
  }
}
