import { createElement } from "../../Functions/createElement.js";

export class Filter {
  _element = null;
  _state = {
    filterData: {},
  };

  constructor(FilterGroup, FieldGroup, OptionGroup, Option) {
    this._FilterGroup = FilterGroup;
    this._FieldGroup = FieldGroup;
    this._OptionGroup = OptionGroup;
    this._Option = Option;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._getFilterData();
  }

  _getTemplate() {
    return `<form class="filter" action="#" data-element="form"></form>`;
  }

  _setStateFilterData(state) {
    this._state.filterData = state;
  }

  _getFilterData() {
    fetch("/getFilter")
      .then((response) => response.json())
      .then((data) => this._setStateFilterData(data))
      .then(() => this._render())
      .catch((error) => console.error(error));
  }

  _generateFilterGroup() {
    return this._state.filterData.map((categorie) => {
      const { key, text, unit, groupType, options } = categorie;

      return new this._FilterGroup(this._FieldGroup, this._OptionGroup, this._Option, key, text, unit, groupType, options).element;
    });
  }

  _render() {
    this._element.append(...this._generateFilterGroup());
  }

  get element() {
    return this._element;
  }
}
