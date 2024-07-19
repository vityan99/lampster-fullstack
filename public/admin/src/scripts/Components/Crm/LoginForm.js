import { createElement } from "../../Functions/createElement.js";

export class LoginForm {
  _element = null;
  _subElements = null;

  constructor(setStateLoginHandler, { login }, setStateUserInfoHandler) {
    this._setStateLoginHandler = setStateLoginHandler;
    this._login = login;
    this._setStateUserInfoHandler = setStateUserInfoHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="container" id="container">
              <div class="form-container sign-in-container">
                  <form action="#" data-element="authForm">
                      <h1 class="form-title">Авторизация</h1>
                      <input type="email" placeholder="Почта" name="userEmail" data-element="mail"/>
                      <input type="password" placeholder="Пароль" name="userPassword" />
                      <button class="btn btn--auth" type="submit" id="authorization" data-element="auth">Войти</button>
                  </form>
              </div>
            </div>`;
  }

  _sendLoginRequest() {
    return new Promise((resolve, reject) => {
      const authForm = this._subElements.authForm;
      const userEmail = authForm.elements["userEmail"].value;
      const userPassword = authForm.elements["userPassword"].value;

      const user = JSON.stringify({
        userEmail,
        userPassword,
      });

      const request = new XMLHttpRequest();
      request.open("POST", "/login", true);
      request.setRequestHeader("Content-Type", "application/json");
      request.onload = () => {
        try {
          const response = JSON.parse(request.response);
          if (request.status === 200) {
            resolve(response);
          } else {
            reject(response.message);
          }
        } catch (e) {
          reject(`Ошибка парсинга ответа сервера: ${e.message}`);
        }
      };
      request.onerror = () => {
        reject("Network error");
      };
      request.send(user);
    });
  }

  _addListeners() {
    this._subElements.auth.addEventListener("click", (e) => {
      e.preventDefault();

      this._sendLoginRequest()
        .then((response) => {
          this._setStateUserInfoHandler(response);
        })
        .then(() => {
          this._setStateLoginHandler(!this._login);
        })
        .catch((error) => {
          console.error(error);
        });
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
