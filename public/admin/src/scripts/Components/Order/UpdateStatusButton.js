import { createElement } from "../../Functions/createElement.js";

export class UpdateStatusButton {
  _element = null;

  constructor(orderNumber, orderStatus, userInfo, setStateClickedHandler, { clicked }, renderHandler) {
    this._orderNumber = orderNumber;
    this._orderStatus = orderStatus;
    this._userInfo = userInfo;
    this._setStateClickedHandler = setStateClickedHandler;
    this._clicked = clicked;
    this._renderHandler = renderHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
  }

  _getTemplate() {
    return `<button class="btn btn--update btn--not-active" disabled>Обновить</button>`;
  }

  getChangesDate() {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `в ${hours}:${minutes} - ${day}.${month}.${year}`;
  }

  _sendStatusChangeRequest() {
    const orderNumber = this._orderNumber;
    const orderStatus = this._orderStatus;
    const userName = this._userInfo.name;
    const date = this.getChangesDate();

    const statusChange = JSON.stringify({
      orderNumber,
      orderStatus,
      userName,
      date,
    });

    const request = new XMLHttpRequest();
    request.open("POST", "/statusChange", true);

    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      const recievedStatusChange = JSON.parse(request.response);
      console.log(recievedStatusChange.message);
    });

    request.send(statusChange);
  }

  updateOrderStatus(status) {
    this._orderStatus = status;
  }

  _addListeners() {
    this._element.addEventListener("click", (e) => {
      e.preventDefault();
      this._sendStatusChangeRequest();
      this._setStateClickedHandler(!this._clicked);
      this._renderHandler();
    });
  }

  render() {
    this._element.removeAttribute("disabled");
    this._element.classList.remove("btn--not-active");
  }

  get element() {
    return this._element;
  }
}
