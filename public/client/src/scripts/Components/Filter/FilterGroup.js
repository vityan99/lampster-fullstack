import { createElement } from "../../Functions/createElement.js";

export class FilterGroup {
  _element = null;
  _subElements = null;

  constructor(FieldGroup, OptionGroup, Option, key, text, unit, groupType, options) {
    this._FieldGroup = FieldGroup;
    this._OptionGroup = OptionGroup;
    this._Option = Option;
    this._key = key;
    this._text = text;
    this._unit = unit;
    this._groupType = groupType;
    this._options = options;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="filter-group">
              <span class="filter-group__title">${this._text}</span>
              <div class="filter-group__field-holder" data-element="groupFilter"></div>
              <div class="filter-reset"></div>
            </div>`;
  }

  _generateFieldGroupFrom() {
    return new this._FieldGroup(this._key, this._unit, this._groupType, this._text, "from", "от").element;
  }

  _generateFieldGroupTo() {
    return new this._FieldGroup(this._key, this._unit, this._groupType, this._text, "to", "до").element;
  }

  _generateOptionGroup() {
    return new this._OptionGroup(this._Option, this._key, this._unit, this._groupType, this._options).element;
  }

  _render() {
    if (this._groupType === 1) {
      this._subElements.groupFilter.append(this._generateFieldGroupFrom());
      this._subElements.groupFilter.append(this._generateFieldGroupTo());
    }

    if (this._groupType === 2) {
      this._subElements.groupFilter.append(this._generateOptionGroup());
    }
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
