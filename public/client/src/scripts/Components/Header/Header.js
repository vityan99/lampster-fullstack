import { createElement } from "../../Functions/createElement.js";

export class Header {
  _element = null;
  _subElements = null;
  _state = {
    activeMenu: "",
    logoData: {},
    menuData: {},
    searchData: {},
    cartData: {},
  };

  constructor(Icon, LogoText, MenuItem, Search, SearchButton, SearchForm, Cart, CartIcon, CartCalculate, CartPanel, CartItem) {
    this._Icon = Icon;
    this._LogoText = LogoText;
    this._MenuItem = MenuItem;
    this._Search = Search;
    this._SearchButton = SearchButton;
    this._SearchForm = SearchForm;
    this._Cart = Cart;
    this._CartIcon = CartIcon;
    this._CartCalculate = CartCalculate;
    this._CartPanel = CartPanel;
    this._CartItem = CartItem;
    this._init();
  }

  _init() {
    this._setStateActiveMenu();
    this._element = createElement(this._getTemplate());
    this._subElemenets = this._getSubElements();
    this._getAllData();
  }

  _getTemplate() {
    return `<header class="header">
                <a href="#" class="logo" data-element="logo"></a>
                <ul class="menu" data-element="menu"></ul>
                <div class="header__control" data-element="headerControl"></div>
            </header>`;
  }

  _setStateActiveMenu() {
    if (window.location.pathname.includes("") || window.location.pathname.includes("/index.html")) {
      this._state.activeMenu = "/";
    }
  }

  _setStateLogoData(state) {
    this._state.logoData = state;
  }

  _setStateMenuData(state) {
    this._state.menuData = state;
  }

  _setStateSearchData(state) {
    this._state.searchData = state;
  }

  _setStateCartData(state) {
    this._state.cartData = state;
  }

  async _getLogoData() {
    try {
      const response = await fetch("/getLogo");
      const data = await response.json();
      this._setStateLogoData(data);
    } catch (error) {
      console.error("Error fetching logo data:", error);
      throw error;
    }
  }

  async _getMenuData() {
    try {
      const response = await fetch("/getMenu");
      const data = await response.json();
      this._setStateMenuData(data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      throw error;
    }
  }

  async _getSearchData() {
    try {
      const response = await fetch("/getSearch");
      const data = await response.json();
      this._setStateSearchData(data);
    } catch (error) {
      console.error("error fetching search data");
      throw error;
    }
  }

  async _getCartData() {
    try {
      const response = await fetch("/getCart");
      const data = await response.json();
      this._setStateCartData(data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
      throw error;
    }
  }

  _getAllData() {
    Promise.all([this._getLogoData(), this._getMenuData(), this._getSearchData(), this._getCartData()])
      .then(() => {
        this._render();
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

  _generateMenuItems() {
    return this._state.menuData.map(({ title, link }) => {
      return new this._MenuItem(title, link, this._state.activeMenu).element;
    });
  }

  _generateSearch() {
    const { icon, placeholder } = this._state.searchData;

    return new this._Search(this._SearchButton, this._SearchForm, icon, placeholder).element;
  }

  _generateCart() {
    const { icon, cartTitle, buttonTitle, iconDelete } = this._state.cartData;

    return new this._Cart(
      this._Icon,
      this._CartIcon,
      this._CartCalculate,
      this._CartPanel,
      this._CartItem,
      icon,
      cartTitle,
      buttonTitle,
      iconDelete
    ).element;
  }

  _render() {
    this._subElemenets.logo.append(this._generateLogoIcon());
    this._subElemenets.logo.append(this._generateLogoText());
    this._subElemenets.menu.append(...this._generateMenuItems());
    this._subElemenets.headerControl.append(this._generateSearch());
    this._subElemenets.headerControl.append(this._generateCart());
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
