import { createElement } from "../../Functions/createElement.js";

export class IconSettings {
  _element = null;
  _subElements = null;
  _state = {
    settingsOpen: false,
  };

  constructor(SettingsMenu, SettingsItem, user) {
    this._SettingsMenu = SettingsMenu;
    this._SettingsItem = SettingsItem;
    this._user = user;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
    this._render();
  }

  _getTemplate() {
    return `<div class="crm-settings">
                <i class="fa-solid fa-gear fa-xl crm-settings-icon" style="color: #2f2f44;" data-element="iconSettings"></i>
                <div class="settings-area" data-element="settingsArea"></div>
            </div>`;
  }

  _setStateSettingsOpen(state) {
    this._state.settingsOpen = state;
  }

  _generateSettingsMenu() {
    return new this._SettingsMenu(this._SettingsItem, this._user).element;
  }

  _addListeners() {
    this._subElements.iconSettings.addEventListener("click", () => {
      this._setStateSettingsOpen(!this._state.settingsOpen);
      this._render();
    });
  }

  _render() {
    if (this._state.settingsOpen) {
      this._subElements.settingsArea.append(this._generateSettingsMenu());
    } else {
      this._subElements.settingsArea.innerHTML = "";
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
