import { createElement } from "../../Functions/createElement.js";

export class FiledGroup {
  _element = null;
  _subElements = null;

  constructor(key, unit, groupType, text, direction, directionTitle) {
    this._key = key;
    this._unit = unit;
    this._groupType = groupType;
    this._text = text;
    this._direction = direction;
    this._directionTitle = directionTitle;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="filter-field-group">
                <label class="form-control-label" for="${this._key}-${this._direction}">${this._directionTitle}</label>
                <input class="form-control-field" type="text" placeholder="0" id="${this._key}-${this._direction}"  data-element="input" />
            </div>`;
  }

  _addListeners() {
    this._subElements.input.addEventListener("input", () => {
      this._element.dispatchEvent(
        new CustomEvent("filterInput", {
          bubbles: true,
          detail: {
            direction: this._direction,
            value: this._subElements.input.value,
            key: this._key,
            text: this._text,
            unit: this._unit,
            groupType: this._groupType,
          },
        })
      );
    });
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
