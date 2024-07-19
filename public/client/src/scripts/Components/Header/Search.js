import { createElement } from "../../Functions/createElement.js";

export class Search {
  _element = null;
  _subElements = null;

  constructor(SearchButton, SearchForm, icon, placeholder) {
    this._SearchButton = SearchButton;
    this._SearchForm = SearchForm;
    this._icon = icon;
    this._placeholder = placeholder;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _getTemplate() {
    return `<div class="mini-search-wrapper" data-mini-search-wrapper>
                <div class="mini-search" data-element="miniSearch"></div>
            </div>`;
  }

  _searchOpenHandler() {
    this._updateUI();
  }

  _generateSearchButton() {
    return new this._SearchButton(this._icon, this._searchOpenHandler.bind(this)).element;
  }

  _generateSearchForm() {
    this._searchForm = new this._SearchForm(this._placeholder);
    return this._searchForm.element;
  }

  _render() {
    this._subElements.miniSearch.innerHTML = "";
    this._subElements.miniSearch.append(this._generateSearchButton());
    this._subElements.miniSearch.append(this._generateSearchForm());
  }

  _updateUI() {
    this._searchForm._element.classList.toggle("mini-search__form-wrapper--active");
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
