import { createElement } from "../../Functions/createElement.js";

export class OrderOptionGroup {
  _element = null;
  _subElements = null;
  _state = {
    firstInit: true,
    status: "",
    clicked: false,
  };

  constructor(
    OrderOption,
    orderNumber,
    status,
    UpdateStatusButton,
    userInfo,
    LastChangesDateBy,
    lastModifiedBy,
    date,
    setStateUpdateInfoHandler
  ) {
    this._OrderOption = OrderOption;
    this._orderNumber = orderNumber;
    this._status = status;
    this._UpdateStatusButton = UpdateStatusButton;
    this._userInfo = userInfo;
    this._LastChangesDateBy = LastChangesDateBy;
    this._lastModifiedBy = lastModifiedBy;
    this._date = date;
    this._setStateUpdateInfoHandler = setStateUpdateInfoHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<div class="order-info__status">
                <div class="custom-select-wrapper">
                    <select name="status" id="order-status" data-element="optionGroup"></select>
                </div>
                <div class="order-info__change-status" data-element="changeStatus"></div>
            </div>`;
  }

  _setStateFirstInit(state) {
    this._state.firstInit = state;
  }

  _setStateStatus(state) {
    this._state.status = state;
  }

  _setStateClicked(state) {
    this._state.clicked = state;
  }

  _setStateClickedHandler(state) {
    this._setStateClicked(state);

    const updateInfo = {
      name: this._userInfo.name,
      date: this._updateStatusButton.getChangesDate(),
      selectedOption: this._state.status,
    };

    this._setStateUpdateInfoHandler(updateInfo);
    this._render(this._userInfo, this._updateStatusButton.getChangesDate());
    this._resetStateClicked();
  }

  _resetStateClicked() {
    this._state.clicked = false;
  }

  _getSelectedStatus() {
    return this._status.find((el) => el.selected === true).text;
  }

  _generateOrderOptions() {
    return this._status.map(({ selected, text }) => {
      return new this._OrderOption(selected, text).element;
    });
  }

  _generateUpdateStatusButton(orderStatus = this._getSelectedStatus()) {
    this._updateStatusButton = new this._UpdateStatusButton(
      this._orderNumber,
      orderStatus,
      this._userInfo,
      this._setStateClickedHandler.bind(this),
      { clicked: this._state.clicked },
      this._renderHandler.bind(this)
    );
    return this._updateStatusButton;
  }

  _generateLastChangesDateBy(name = null, date = null) {
    return new this._LastChangesDateBy(this._lastModifiedBy, this._date, name, date).element;
  }

  _addListeners() {
    this._subElements.optionGroup.addEventListener("change", (e) => {
      if (e.type === "change") {
        this._setStateFirstInit(false);
        this._setStateStatus(e.target.options[e.target.selectedIndex].value);
        this._updateStatusButton.updateOrderStatus(this._state.status);
        this._updateStatusButton.render();
      }
    });
  }

  _renderHandler() {
    this._render(this._userInfo.name, this._updateStatusButton.getChangesDate());
  }

  _render(name = null, date = null) {
    if (this._state.firstInit) {
      this._subElements.optionGroup.innerHTML = "";
      this._subElements.optionGroup.append(...this._generateOrderOptions());
      this._subElements.changeStatus.innerHTML = "";
      this._subElements.changeStatus.append(this._generateUpdateStatusButton().element);
      this._subElements.changeStatus.append(this._generateLastChangesDateBy());
    }
    if (this._state.status !== "") {
      this._subElements.changeStatus.innerHTML = "";
      this._subElements.changeStatus.append(this._generateUpdateStatusButton(this._state.status).element);
      this._subElements.changeStatus.append(this._generateLastChangesDateBy(name, date));
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
