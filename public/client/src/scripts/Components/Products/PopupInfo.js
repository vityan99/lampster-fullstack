import { createElement } from "../../Functions/createElement.js";

export class PopupInfo {
  _element = null;
  _subElements = null;

  constructor(IconMore, text, value, unit) {
    this._IconMore = IconMore;
    this._text = text;
    this._value = value;
    this._unit = unit;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="popup__info">
              <div class="popup__icon" data-element="icon"></div>
              <div class="popup__items">
                <span class="popup__item-desc">${this._text}</span>
                <span class="popup__item-text">${this._value} ${this._unit}</span>
              </div>
            </div>`;
  }

  _generateIconMore() {
    return new this._IconMore().element;
  }

  _render() {
    this._subElements.icon.append(this._generateIconMore());
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      return {
        ...acc,
        [el.getAttribute("data-element")]: el,
      };
    }, {});
  }

  get element() {
    return this._element;
  }
}
