import { createElement } from "../../Functions/createElement.js";

export class CartPopup {
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
                            <form class="order-form" action="#" data-element="orderForm">
                                <h1 class="order-title">Оформление заказа</h1>
                                <input class="order-input" type="text" placeholder="Имя" name="userName" />
                                <input class="order-input" type="text" placeholder="Фамилия" name="userSurname" />
                                <input class="order-input" type="text" placeholder="Телефон" name="userPhone" />
                                <input class="order-input" type="text" placeholder="Адрес" name="userAdress" />
                                <button class="btn btn--auth" type="submit" id="order" data-element="btnOrder">Оформить</button>
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

  _sendOrderRequest() {
    const orderForm = this._subElements.orderForm;
    const userName = orderForm.elements["userName"].value;
    const userSurname = orderForm.elements["userSurname"].value;
    const userPhone = orderForm.elements["userPhone"].value;
    const userAdress = orderForm.elements["userAdress"].value;

    const order = JSON.stringify({
      userName: userName,
      userSurname: userSurname,
      userPhone: userPhone,
      userAdress: userAdress,
      orderData: this._state.content,
    });

    const request = new XMLHttpRequest();
    request.open("POST", "/createOrder", true);

    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      const recievedOrder = JSON.parse(request.response);
      console.log(recievedOrder.message, recievedOrder.orderNumber);
    });
    request.send(order);
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

    this._subElements.btnOrder.addEventListener("click", (e) => {
      e.preventDefault();
      this._sendOrderRequest();
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
