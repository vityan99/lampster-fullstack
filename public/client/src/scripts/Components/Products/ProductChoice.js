import { createElement } from "../../Functions/createElement.js";

export class ProductChoice {
  _element = null;
  _subElements = null;
  _state = {
    active: {},
  };

  constructor(productChoiceTitle, Choice, choiceList, setStateToParentHandler) {
    this._productChoiceTitle = productChoiceTitle;
    this._Choice = Choice;
    this._choiceList = choiceList;
    this._setStateToParentHandler = setStateToParentHandler;
    this._init();
  }

  _init() {
    this._setStateActiveStart();
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _setStateActiveStart() {
    this._choiceList.forEach((choice) => {
      this._state.active[choice.id] = {
        isActive: choice.id === 1,
        text: choice.text,
        img: choice.img ? choice.img : null,
      };
    });
  }

  _setStateActive(id, text, img) {
    this._state.active[id] = {
      isActive: true,
      text: text,
      img: img,
    };
  }

  _resetStateActive() {
    Object.keys(this._state.active).forEach((key) => {
      this._state.active[key].isActive = false;
    });
  }

  _setStateActiveHandler(id, text, unit, img) {
    this._resetStateActive();
    this._setStateActive(id, text, unit, img);
    this._setStateToParentHandler(id, text, unit, img);
    this._render();
  }

  _getTemplate() {
    return `<div class="choice">
      <span class="choice__btn">${this._productChoiceTitle}</span>
      <div class="choice__list choice__list--active" data-element="choiceList"></div>
    </div>`;
  }

  _generateChoice() {
    return this._choiceList.map(({ id, text, unit, img }) => {
      return new this._Choice(id, text, unit, img, this._setStateActiveHandler.bind(this), {
        active: this._state.active[id].isActive,
      }).element;
    });
  }

  _render() {
    this._subElements.choiceList.innerHTML = "";
    this._subElements.choiceList.append(...this._generateChoice());
  }

  _getSubElements() {
    return Array.from(this._element.querySelectorAll("[data-element]")).reduce((acc, el) => {
      acc[el.getAttribute("data-element")] = el;
      return acc;
    }, {});
  }

  get element() {
    return this._element;
  }
}
