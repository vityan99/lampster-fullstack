import { createElement } from "../../Functions/createElement.js";

export class CrmPanel {
  _element = null;
  _subElements = null;
  _state = {
    logoData: {},
  };

  constructor(
    Icon,
    LogoText,
    ExitButton,
    IconSettings,
    setStateLoginHandler,
    { login },
    OrderInfo,
    Order,
    OrderImg,
    OrderOptionGroup,
    OrderOption,
    UpdateStatusButton,
    { userInfo },
    SettingsMenu,
    SettingsItem,
    LastChangesDateBy
  ) {
    this._Icon = Icon;
    this._LogoText = LogoText;
    this._ExitButton = ExitButton;
    this._IconSettings = IconSettings;
    this._setStateLoginHandler = setStateLoginHandler;
    this._login = login;
    this._OrderInfo = OrderInfo;
    this._Order = Order;
    this._OrderImg = OrderImg;
    this._OrderOptionGroup = OrderOptionGroup;
    this._OrderOption = OrderOption;
    this._UpdateStatusButton = UpdateStatusButton;
    this._userInfo = userInfo;
    this._SettingsMenu = SettingsMenu;
    this._SettingsItem = SettingsItem;
    this._LastChangesDateBy = LastChangesDateBy;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._getAllData();
  }

  _getTemplate() {
    return `<section class="area">
              <div class="area__top">
                <a href="#" class="logo" data-element="logo"></a>
                <h2 class="crm-greeting" data-element="userInfo"></h2>
                <div class="crm-control" data-element="controlElements"></div>
              </div>
              <div class="area__content" data-element="content"></div>
            </section>`;
  }

  _setStateLogoData(state) {
    this._state.logoData = state;
  }

  async _getLogoData() {
    try {
      const response = await fetch("/getLogo");
      const data = await response.json();
      this._setStateLogoData(data);
      this._render();
    } catch (error) {
      console.error("Error fetching logo data:", error);
      throw error;
    }
  }

  async _getOrdersData() {
    try {
      const response = await fetch("/getOrders");
      const data = await response.json();
      this._render(data);
    } catch (error) {
      console.error("Error fetching orders data:", error);
      throw error;
    }
  }

  _getAllData() {
    Promise.all([this._getLogoData(), this._getOrdersData()])
      .then(() => {
        console.log("All data fetched successfully");
      })
      .catch((error) => {
        console.error("Error during fetching all data:", error);
      });
  }

  _generateLogoIcon() {
    const { logoIcon } = this._state.logoData;

    return new this._Icon(logoIcon).element;
  }

  _generateLogoText() {
    const { textFirstPart, textSecondPart } = this._state.logoData;

    return new this._LogoText(textFirstPart, textSecondPart).element;
  }

  _generateExitButton() {
    return new this._ExitButton(this._setStateLoginHandler, this._login).element;
  }

  _generateIconSettings() {
    const user = this._userInfo;

    return new this._IconSettings(this._SettingsMenu, this._SettingsItem, user).element;
  }

  _generateOrderInfo(data) {
    return data.map((order) => {
      const { orderNumber, userName, userSurname, userPhone, userAdress, orderData, status, lastModifiedBy, date } = order;

      return new this._OrderInfo(
        orderNumber,
        userName,
        userSurname,
        userPhone,
        userAdress,
        this._Order,
        this._OrderImg,
        orderData,
        status,
        this._OrderOptionGroup,
        this._OrderOption,
        this._UpdateStatusButton,
        this._userInfo,
        this._LastChangesDateBy,
        lastModifiedBy,
        date
      ).element;
    });
  }

  _render(data = null) {
    this._subElements.logo.innerHTML = "";
    this._subElements.logo.append(this._generateLogoIcon());
    this._subElements.logo.append(this._generateLogoText());

    this._subElements.controlElements.innerHTML = "";
    this._subElements.controlElements.append(this._generateIconSettings());
    this._subElements.controlElements.append(this._generateExitButton());

    if (Object.entries(this._userInfo).length !== 0) {
      this._subElements.userInfo.textContent = `Добро пожаловать, ${this._userInfo.name}!`;
    } else {
      this._subElements.userInfo.textContent = `Добро пожаловать, Пользователь!`;
    }

    if (data) {
      this._subElements.content.innerHTML = "";
      this._subElements.content.append(...this._generateOrderInfo(data));
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
