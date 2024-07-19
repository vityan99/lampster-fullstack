import { CrmPanel } from "./Components/Crm/CrmPanel.js";
import { LoginForm } from "./Components/Crm/LoginForm.js";
import { Icon } from "./Components/Crm/Icon.js";
import { LogoText } from "./Components/Crm/LogoText.js";
import { ExitButton } from "./Components/Crm/ExitButton.js";
import { IconSettings } from "./Components/Settings/IconSettings.js";
import { OrderInfo } from "./Components/Order/OrderInfo.js";
import { Order } from "./Components/Order/Order.js";
import { OrderImg } from "./Components/Order/OrderImg.js";
import { OrderOptionGroup } from "./Components/Order/OrderOptionGroup.js";
import { OrderOption } from "./Components/Order/OrderOption.js";
import { UpdateStatusButton } from "./Components/Order/UpdateStatusButton.js";
import { SettingsMenu } from "./Components/Settings/SettingsMenu.js";
import { SettingsItem } from "./Components/Settings/SettingsItem.js";
import { PopupAccountSettings } from "./Components/Settings/PopupAccountSettings.js";
import { PopupAddUser } from "./Components/Settings/PopupAddUser.js";
import { LastChangesDateBy } from "./Components/Order/LastChangesDateBy.js";

class App {
  _state = {
    login: false,
    userInfo: {},
  };

  constructor(
    root,
    LoginForm,
    CrmPanel,
    Icon,
    LogoText,
    ExitButton,
    IconSettings,
    OrderInfo,
    Order,
    OrderImg,
    OrderOptionGroup,
    OrderOption,
    UpdateStatusButton,
    SettingsMenu,
    SettingsItem,
    PopupAccountSettings,
    PopupAddUser,
    LastChangesDateBy
  ) {
    this._root = root;
    this._LoginFrom = LoginForm;
    this._CrmPanel = CrmPanel;
    this._Icon = Icon;
    this._LogoText = LogoText;
    this._ExitButton = ExitButton;
    this._IconSettings = IconSettings;
    this._OrderInfo = OrderInfo;
    this._Order = Order;
    this._OrderImg = OrderImg;
    this._OrderOptionGroup = OrderOptionGroup;
    this._OrderOption = OrderOption;
    this._UpdateStatusButton = UpdateStatusButton;
    this._SettingsMenu = SettingsMenu;
    this._SettingsItem = SettingsItem;
    this._PopupAccountSettings = PopupAccountSettings;
    this._PopupAddUser = PopupAddUser;
    this._LastChangesDateBy = LastChangesDateBy;
    this._init();
  }

  _init() {
    this._openPopupAddUser();
    this._openPopupAccountSettings();
    this._render();
  }

  _setStateLogin(state) {
    this._state.login = state;
  }

  _setStateUserInfo(state) {
    this._state.userInfo = state;
  }

  _setStateLoginHandler(state) {
    this._setStateLogin(state);
    this._render();
  }

  _setStateUserInfoHandler(state) {
    this._setStateUserInfo(state);
  }

  _openPopupAddUser() {
    document.body.addEventListener("addUser", (e) => {
      this._popupAddUser.open();
    });
  }

  _openPopupAccountSettings() {
    document.body.addEventListener("accountSettings", (e) => {
      this._popupAccountSettings.open(e.detail);
    });
  }

  _generateLoginForm() {
    return new this._LoginFrom(
      this._setStateLoginHandler.bind(this),
      { login: this._state.login },
      this._setStateUserInfoHandler.bind(this)
    ).element;
  }

  _generateCrmPanel() {
    return new this._CrmPanel(
      this._Icon,
      this._LogoText,
      this._ExitButton,
      this._IconSettings,
      this._setStateLoginHandler.bind(this),
      { login: this._state.login },
      this._OrderInfo,
      this._Order,
      this._OrderImg,
      this._OrderOptionGroup,
      this._OrderOption,
      this._UpdateStatusButton,
      { userInfo: this._state.userInfo },
      this._SettingsMenu,
      this._SettingsItem,
      this._LastChangesDateBy
    ).element;
  }

  _generatePopupAddUser() {
    this._popupAddUser = new this._PopupAddUser();

    return this._popupAddUser;
  }

  _generatePopupAccountSettings() {
    this._popupAccountSettings = new this._PopupAccountSettings();

    return this._popupAccountSettings;
  }

  _render() {
    this._root.innerHTML = "";

    if (!this._state.login) {
      this._root.append(this._generateLoginForm());
    }

    if (this._state.login) {
      this._root.append(this._generateCrmPanel());
      this._root.append(this._generatePopupAddUser().element);
      this._root.append(this._generatePopupAccountSettings().element);
    }
  }
}

const root = document.querySelector(".root");
const app = new App(
  root,
  LoginForm,
  CrmPanel,
  Icon,
  LogoText,
  ExitButton,
  IconSettings,
  OrderInfo,
  Order,
  OrderImg,
  OrderOptionGroup,
  OrderOption,
  UpdateStatusButton,
  SettingsMenu,
  SettingsItem,
  PopupAccountSettings,
  PopupAddUser,
  LastChangesDateBy
);
