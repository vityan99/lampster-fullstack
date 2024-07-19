import { createElement } from "../../Functions/createElement.js";

export class PopupAccountSettings {
  _element = null;
  _subElements = null;
  _state = {
    status: false,
    content: {},
  };

  constructor() {
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
                        <div class="popup__container" data-element="container">
                            <button class="btn popup__btn" data-element="close">X</button>
                            <form class="popup-form" action="#" data-element="updatePasswordForm">
                                <h1 class="popup-title">Настройки аккаунта</h1>
                                <input class="popup-input" type="password" placeholder="Старый пароль" name="oldPassword" data-element="oldPassword"/>
                                <input class="popup-input" type="password" placeholder="Новый пароль" name="newPassword"  data-element="newPassword"/>
                                <input class="popup-input" type="password" placeholder="Повторите пароль" name="newPasswordRepeat"  data-element="newPasswordRepeat"/>
                                <button class="btn btn--popup-send" type="submit" id="updatePassword" data-element="btnUpdatePassword">Обновить</button>
                            </form>
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

  open(content) {
    this._setStateStatus(!this._state.status);
    this._setStateContent(content);
    this._render();
  }

  close() {
    this._setStateStatus(!this._state.status);
    this._render();
  }

  _sendUpdatePasswordRequest() {
    const id = this._state.content.id;
    const oldPassword = this._subElements.oldPassword.value;
    const newPassword = this._subElements.newPassword.value;

    if (!id || !oldPassword || !newPassword) {
      console.error("Missing fields on client side:", { id, oldPassword, newPassword });
      return;
    }

    const userDataChange = JSON.stringify({
      id,
      oldPassword,
      newPassword,
    });

    const request = new XMLHttpRequest();
    request.open("POST", "/userPasswordChange", true);

    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      if (request.status >= 200 && request.status < 300) {
        const receivedUserPasswordChange = JSON.parse(request.response);
        console.log(receivedUserPasswordChange.message);
      } else {
        console.error("Server error:", request.status, request.statusText);
      }
    });

    request.send(userDataChange);
  }

  _checkCorrectNewPasswordsEqual() {
    if (this._subElements.newPassword.value === this._subElements.newPasswordRepeat.value) {
      return true;
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

    this._subElements.btnUpdatePassword.addEventListener("click", (e) => {
      e.preventDefault();

      if (!this._checkCorrectNewPasswordsEqual()) {
        alert("Ваши новые пароли не совпадают");
        return;
      }

      this._sendUpdatePasswordRequest();
      this.close();
    });
  }

  _render() {
    if (this._state.status) {
      this._element.classList.add("popup--active");
    } else {
      this._element.classList.remove("popup--active");
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
