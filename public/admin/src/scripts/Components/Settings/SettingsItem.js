import { createElement } from "../../Functions/createElement.js";

export class SettingsItem {
  _element = null;

  constructor(value, userId, userPassword) {
    this._value = value;
    this._userId = userId;
    this._userPassword = userPassword;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<li class="menu__item"><a class="menu__link">${this._value}</a></li>`;
  }

  _addListeners() {
    this._element.addEventListener("click", () => {
      if (this._value === "Настройка аккаунта") {
        this._element.dispatchEvent(
          new CustomEvent("accountSettings", {
            bubbles: true,
            detail: {
              id: this._userId,
              password: this._userPassword,
            },
          })
        );
      }

      if (this._value === "Добавить пользователя") {
        this._element.dispatchEvent(
          new CustomEvent("addUser", {
            bubbles: true,
          })
        );
      }
    });
  }

  get element() {
    return this._element;
  }
}
