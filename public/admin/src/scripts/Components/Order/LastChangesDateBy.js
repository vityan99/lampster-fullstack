import { createElement } from "../../Functions/createElement.js";

export class LastChangesDateBy {
  _element = null;
  _subElements = null;

  constructor(user, date, updateUser, updateDate) {
    this._user = user;
    this._date = date;
    this._updateUser = updateUser;
    this._updateDate = updateDate;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
  }

  _getTemplate() {
    return `<span class="last-modified-changes-by">
                Последнее изменение было произведено пользователем:
                <span class="last-modified-changes-by--accent" data-element="info">${
                  this._updateUser === null ? this._user : this._updateUser
                } ${this._updateDate === null ? this._date : this._updateDate}</span>
            </span>`;
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
