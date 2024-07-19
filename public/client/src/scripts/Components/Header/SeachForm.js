import { createElement } from "../../Functions/createElement.js";

export class SearchForm {
  _element = null;
  _subElements = null;

  constructor(placeholder) {
    this._placeholder = placeholder;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="mini-search__form-wrapper">
              <form class="mini-search-form" action="#" method="post">
                <input
                  class="mini-search-form__field"
                  type="text"
                  placeholder="${this._placeholder}"
                  data-element="input"
                />
              </form>
            </div>`;
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      acc[el.getAttribute("data-element")] = el;
      return acc;
    }, {});
  }

  _addListeners() {
    this._subElements.input.addEventListener("input", () => {
      this._element.dispatchEvent(
        new CustomEvent("searchProduct", {
          bubbles: true,
          detail: this._subElements.input.value,
        })
      );
    });
  }

  get element() {
    return this._element;
  }
}
