import { createElement } from "../../Functions/createElement.js";

export class Footer {
  _element = null;

  constructor(Copyright) {
    this._Copyright = Copyright;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate);
    this._render();
  }

  _getTemplate() {
    return `<div class="footer"></div>`;
  }

  _generateCopyright() {
    return new this._Copyright().element;
  }

  _render() {
    this._element.append(this._generateCopyright());
  }

  get element() {
    return this._element;
  }
}
