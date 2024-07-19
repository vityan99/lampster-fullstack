import { createElement } from "../../Functions/createElement.js";

export class OptionGroup {
  _element = null;

  constructor(Option, key, unit, groupType, options) {
    this._Option = Option;
    this._key = key;
    this._unit = unit;
    this._groupType = groupType;
    this._options = options;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<select class="form-control-select" name="${this._key}"></select>`;
  }

  _generateOption() {
    return this._options.map(({ value, text }, index) => {
      return new this._Option(this._key, this._unit, this._groupType, value, text, index).element;
    });
  }

  _addListeners() {
    this._element.addEventListener("change", (e) => {
      this._element.dispatchEvent(
        new CustomEvent("filterOption", {
          bubbles: true,
          detail: {
            value: e.target.value,
            key: this._key,
            groupType: this._groupType,
          },
        })
      );
    });
  }

  _render() {
    this._element.append(...this._generateOption());
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
