import { createElement } from "../../Functions/createElement.js";

export class Popup {
  _element = null;
  _subElements = null;
  _state = {
    status: false,
    content: {},
    type: null,
  };

  constructor(PopupInfo, IconMore) {
    this._PopupInfo = PopupInfo;
    this._IconMore = IconMore;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="popup">
                    <div class="popup__wrapper" data-element="wrapper">
                        <div class="popup__container">
                            <img src="" alt="" data-element="img"/>
                            <button class="btn popup__btn" data-element="close">X</button>
                            <div class="popup__info-block" data-element="popupInfo"></div>
                        </div>
                    </div>
                </div>`;
  }

  _setStateStatus(status) {
    this._state.status = status;
  }

  _setStateContent(content) {
    this._state.content = content;
  }

  _setStateType(type) {
    this._state.type = type;
  }

  openImg(content) {
    this._setStateType("img");
    this._setStateStatus(!this._state.status);
    this._setStateContent(content);
    this._render();
  }

  openInfo(content) {
    this._setStateType("info");
    this._setStateStatus(!this._state.status);
    this._setStateContent(content);
    this._render();
  }

  close() {
    this._setStateStatus(!this._state.status);
    this._render();
  }

  _generatePopupInfo() {
    return this._state.content.map(({ text, value, unit }) => {
      return new this._PopupInfo(this._IconMore, text, value, unit).element;
    });
  }

  _render() {
    if (this._state.status) {
      this._element.classList.add("popup--active");
    } else {
      this._element.classList.remove("popup--active");
    }

    this._subElements.popupInfo.innerHTML = "";

    if (this._state.type === "img") {
      this._subElements.img.setAttribute("src", this._state.content.img);
    }

    if (this._state.type === "info") {
      this._subElements.img.setAttribute("src", "");
      this._subElements.popupInfo.append(...this._generatePopupInfo());
    }
  }

  _addListeners() {
    this._subElements.wrapper.addEventListener("click", (e) => {
      if (e.target === this._subElements.wrapper) {
        this.close();
      }
    });

    this._subElements.close.addEventListener("click", (e) => {
      e.stopPropagation();
      this.close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
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
