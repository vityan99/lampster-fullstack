import { createElement } from "../../Functions/createElement.js";

export class ProductImg {
  _element = null;

  constructor(img) {
    this._img = img;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<img class="product__img" src="${this._img}" />`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._element.dispatchEvent(
        new CustomEvent("popupImg", {
          bubbles: true,
          detail: {
            img: this._img,
          },
        })
      );
    });
  }

  get element() {
    return this._element;
  }
}
