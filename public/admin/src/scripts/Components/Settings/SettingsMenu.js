import { createElement } from "../../Functions/createElement.js";

export class SettingsMenu {
  _element = null;
  _subElements = null;
  _state = {
    settingsData: {},
  };

  constructor(SettingsItem, user) {
    this._SettingsItem = SettingsItem;
    this._user = user;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._getSettingsData();
  }

  _getTemplate() {
    return `<div class="settings">
                <ul class="menu" data-element="menu"></menu
            </div>`;
  }

  _setStateSettingsData(state) {
    this._state.settingsData = state;
  }

  _getSettingsData() {
    fetch("/getSettings")
      .then((response) => response.json())
      .then((data) => this._setStateSettingsData(data))
      .then(() => this._render())
      .catch((error) => console.error(error));
  }

  _filterSettings() {
    const status = this._user.status;

    return this._state.settingsData.filter((item) => {
      if (status === "admin") {
        return true;
      }

      if (status === "manager") {
        return item.status === "public";
      }

      return false;
    });
  }

  _generateSettingsItems() {
    return this._filterSettings().map((item) => {
      const { value } = item;

      const userId = this._user._id;
      const userPassword = this._user.userPassword;
      return new this._SettingsItem(value, userId, userPassword).element;
    });
  }

  _render() {
    this._subElements.menu.append(...this._generateSettingsItems());
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
