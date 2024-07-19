import { createElement } from "../../Functions/createElement.js";

export class OrderInfo {
  _element = null;
  _subElements = null;
  _state = {
    orderDetail: false,
    updateInfo: {},
  };

  constructor(
    orderNumber,
    userName,
    userSurname,
    userPhone,
    userAdress,
    Order,
    OrderImg,
    orderData,
    status,
    OrderOptionGroup,
    OrderOption,
    UpdateStatusButton,
    userInfo,
    LastChangesDateBy,
    lastModifiedBy,
    date
  ) {
    this._orderNumber = orderNumber;
    this._userName = userName;
    this._userSurname = userSurname;
    this._userPhone = userPhone;
    this._userAdress = userAdress;
    this._Order = Order;
    this._OrderImg = OrderImg;
    this._orderData = orderData;
    this._status = status;
    this._OrderOptionGroup = OrderOptionGroup;
    this._OrderOption = OrderOption;
    this._UpdateStatusButton = UpdateStatusButton;
    this._userInfo = userInfo;
    this._LastChangesDateBy = LastChangesDateBy;
    this._lastModifiedBy = lastModifiedBy;
    this._date = date;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="order-info">
                <span class="order-info__number">Заказ №${this._orderNumber}</span>
                <span class="order-info__name">${this._userName}</span>
                <span class="order-info__surname">${this._userSurname}</span>
                <span class="order-info__phone">${this._userPhone}</span>
                <span class="order-info__adress">${this._userAdress}</span>
                <button class="btn btn--info" data-element="showDetails">Информация</button>
                <div class="order-info__details" data-element="orderDetails">
                <div>
            </div>`;
  }

  _setStateOrderDetail(state) {
    this._state.orderDetail = state;
  }

  _setStateUpdateInfo(state) {
    this._state.updateInfo = state;
  }

  _setStateUpdateInfoHandler(state) {
    this._setStateUpdateInfo(state);
    this._setUpdateInfo();
  }

  _setUpdateInfo() {
    this._lastModifiedBy = this._state.updateInfo.name;
    this._date = this._state.updateInfo.date;
    this._status = this._updateStatusInfo();
  }

  _updateStatusInfo() {
    return this._status.map((statusValue) => ({
      ...statusValue,
      selected: statusValue.text === this._state.updateInfo.selectedOption,
    }));
  }

  _generateOrder() {
    return this._orderData
      .map((info) => {
        const { productId, img, title, price, wattsText, colorText, count } = info;
        return new this._Order(this._OrderImg, productId, img, title, price, wattsText, colorText, count).element;
      })
      .flat();
  }

  _generateOptionGroup() {
    return new this._OrderOptionGroup(
      this._OrderOption,
      this._orderNumber,
      this._status,
      this._UpdateStatusButton,
      this._userInfo,
      this._LastChangesDateBy,
      this._lastModifiedBy,
      this._date,
      this._setStateUpdateInfoHandler.bind(this)
    ).element;
  }

  _addListeners() {
    this._subElements.showDetails.addEventListener("click", () => {
      this._setStateOrderDetail(!this._state.orderDetail);
      this._render();
    });
  }

  _render() {
    if (this._state.orderDetail) {
      this._subElements.showDetails.textContent = "Скрыть";
      this._subElements.orderDetails.classList.add("order-info__details--active");
      this._subElements.orderDetails.append(...this._generateOrder());
      this._subElements.orderDetails.append(this._generateOptionGroup());
    } else {
      this._subElements.showDetails.textContent = "Информация";
      this._subElements.orderDetails.classList.remove("order-info__details--active");
      this._subElements.orderDetails.innerHTML = "";
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
