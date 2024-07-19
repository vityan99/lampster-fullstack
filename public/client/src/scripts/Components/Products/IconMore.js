import { createElement } from "../../Functions/createElement.js";

export class IconMore {
  _element = null;

  constructor(properties) {
    this._properties = properties;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<i class="fa-solid fa-angles-right"></i>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      this._element.dispatchEvent(
        new CustomEvent("popupInfo", {
          bubbles: true,
          detail: this._properties,
        })
      );
    });
  }

  get element() {
    return this._element;
  }
}