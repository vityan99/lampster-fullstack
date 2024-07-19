import { createElement } from "../../Functions/createElement.js";

export class CartItem {
  _element = null;
  _subElements = null;
  _state = {
    itemInfo: {},
  };

  constructor(Icon, iconDelete, productId, img, title, price, wattsId, colorId, count, setStateDeletedProductHandler) {
    this._Icon = Icon;
    this._iconDelete = iconDelete;
    this._productId = productId;
    this._img = img;
    this._title = title;
    this._price = price;
    this._wattsId = wattsId;
    this._colorId = colorId;
    this._count = count;
    this._setStateDeletedProductHandler = setStateDeletedProductHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<div class="mini-product">
                <div class="mini-product__img-wrapper">
                  <img class="mini-product__img" src="${this._img}" alt="" />
                </div>
                <div class="mini-product__content">
                  <h4 class="mini-product__title">${this._title}</h4>
                  <span class="mini-product__count">${this._price} руб. ${this._count === 1 ? "" : "x " + this._count + " шт."}</span>
                </div>
                <button class="btn btn--delete" data-element="deleteItem"></button>
            </div>`;
  }

  _setStateItemInfo(state) {
    this._state.itemInfo = state;
    this._setStateDeletedProductHandler(this._state.itemInfo);
  }

  _generateIconDelete() {
    return new this._Icon(this._iconDelete).element;
  }

  _addListeners() {
    this._subElements.deleteItem.addEventListener("click", () => {
      this._setStateItemInfo({
        productId: this._productId,
        count: this._count,
        price: this._price,
      });
      this._element.remove();
    });
  }

  _render() {
    this._subElements.deleteItem.append(this._generateIconDelete());
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
