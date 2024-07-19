import { createElement } from "../../Functions/createElement.js";

export class Order {
  _element = null;
  _subElements = null;

  constructor(OrderImg, productId, img, title, price, wattsText, colorText, count) {
    this._OrderImg = OrderImg;
    this._productId = productId;
    this._img = img;
    this._title = title;
    this._price = price;
    this._wattsText = wattsText;
    this._colorText = colorText;
    this._count = count;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="order">
                    <div class="order__img-wrapper" data-element="orderImg"></div>
                    <span class="order__id">${this._productId}</span>
                    <span class="oredr__title">${this._title}</span>
                    <span class="order__watts">${this._wattsText} Ватт</span>
                    <div class="order__color" data-element="color"></div>
                    <span class="order__count">${this._count}</span>
                    <span class="order__price">${this._price} ₽</span>
             </div>`;
  }

  _generateOrderImg() {
    return new this._OrderImg(this._img).element;
  }

  _render() {
    this._subElements.color.style.backgroundColor = this._colorText;
    this._subElements.orderImg.append(this._generateOrderImg());
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
