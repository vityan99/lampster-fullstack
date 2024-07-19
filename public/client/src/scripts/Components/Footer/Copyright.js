import { createElement } from "../../Functions/createElement.js";

export class Copyright {
  _element = null;

  constructor() {
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
  }

  _getTemplate() {
    return `<span class="footer__copyright">
                &copy; Все права защищены. Электронная почта: info@lampster.ru
            </span>`;
  }

  get element() {
    return this._element;
  }
}
