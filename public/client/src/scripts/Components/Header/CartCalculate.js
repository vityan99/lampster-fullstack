import { createElement } from "../../Functions/createElement.js";

export class CartCalculate {
  _element = null;
  _subElements = null;

  constructor(totalPrice, totalCount) {
    this._totalPrice = totalPrice;
    this._totalCount = totalCount;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
  }

  _getTemplate() {
    return `<div class="mini-cart__calculates-wrapper">
              <span class="mini-cart__calculate" data-element="totalPrice">${this._totalPrice ? this._totalPrice : "0"} руб</span>
              <span class="mini-cart__count" data-element="totalCount">${this._totalCount ? this._totalCount : "0"} товаров</span>
            </div>`;
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
