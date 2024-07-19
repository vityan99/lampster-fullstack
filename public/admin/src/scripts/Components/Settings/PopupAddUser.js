import { createElement } from "../../Functions/createElement.js";

export class PopupAddUser {
  _element = null;
  _subElements = null;
  _state = {
    status: false,
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
                        <div class="popup__container popup__container--new-user" data-element="container">
                            <button class="btn popup__btn" data-element="close">X</button>
                            <form class="popup-form" action="#" data-element="addUserForm">
                                <h1 class="popup-title">Добавить пользователя</h1>
                                <input class="popup-input" type="text" placeholder="Имя" name="name" data-element="name"/>
                                <input class="popup-input" type="email" placeholder="Почта" name="email"  data-element="email"/>
                                <input class="popup-input" type="password" placeholder="Пароль" name="password"  data-element="password"/>
                                <div class="custom-select-wrapper select-status">
                                  <select name="user-status" id="user-status" data-element="status">
                                    <option value="admin" selected>Администратор</option>
                                    <option value="manager">Менеджер</option>
                                  </select>
                                </div>
                                <button class="btn btn--popup-send" type="submit" id="addUser" data-element="btnAddUser">Добавить</button>
                            </form>
                        </div>
                    </div>
                </div>`;
  }

  _setStateStatus(status) {
    this._state.status = status;
  }

  open() {
    this._setStateStatus(!this._state.status);
    this._render();
  }

  close() {
    this._setStateStatus(!this._state.status);
    this._render();
  }

  _sendNewUserRequest() {
    const name = this._subElements.name.value;
    const userEmail = this._subElements.email.value;
    const userPassword = this._subElements.password.value;
    const status = this._subElements.status.value;

    console.log("Name:", name);
    console.log("Email:", userEmail);
    console.log("Password:", userPassword);
    console.log("Status:", status);

    const newUser = JSON.stringify({
      name,
      userEmail,
      userPassword,
      status,
    });

    const request = new XMLHttpRequest();
    request.open("POST", "/addNewUser", true);
    request.setRequestHeader("Content-Type", "application/json");

    request.addEventListener("load", function () {
      if (request.status >= 200 && request.status < 300) {
        const recievedNewUser = JSON.parse(request.response);
        console.log("User created:", recievedNewUser);
      } else {
        console.error("Failed to create user:", request.response);
      }
    });

    request.send(newUser);
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

    this._subElements.btnAddUser.addEventListener("click", (e) => {
      e.preventDefault();

      this._sendNewUserRequest();
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
