import { createElement } from "../../Functions/createElement.js";

export class Product {
  _element = null;
  _subElements = null;
  _state = {
    clickFavorite: false,
    firstStart: true,
    watts: {},
    colors: {},
  };

  constructor(
    IconMore,
    IconFavorite,
    ProductImg,
    ProductChoice,
    Choice,
    ProductButton,
    id,
    title,
    price,
    priceType,
    description,
    properties,
    watts,
    colors,
    searchWord = ""
  ) {
    this._IconMore = IconMore;
    this._IconFavorite = IconFavorite;
    this._ProductImg = ProductImg;
    this._ProductChoice = ProductChoice;
    this._Choice = Choice;
    this._ProductButton = ProductButton;
    this._id = id;
    this._title = title;
    this._price = price;
    this._priceType = priceType;
    this._description = description;
    this._properties = properties;
    this._watts = watts;
    this._colors = colors;
    this._searchWord = searchWord;
    this._init();
  }

  _init() {
    this._setStateWattsStart();
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._render();
  }

  _highlightSearchWord(text, searchWord) {
    if (!searchWord) return text;

    const regex = new RegExp(`(${searchWord})`, "gi");

    return text.replace(regex, '<span class="product__title-marker">$1</span>');
  }

  _getTemplate() {
    const highlightedTitle = this._highlightSearchWord(this._title, this._searchWord);

    return `<div class="product">
                <div class="product__more" data-element="more"></div>
                <div class="product__favorite" data-element="favorite"></div>
                <div class="product__img-wrapper product__img-wrapper--light-${this._state.watts}" data-element="imgWrapper"></div>
                <div class="product__content">
                    <h4 class="product__title">${highlightedTitle}</h4>
                    <span class="product__price">${this._price} ${this._priceType}</span>
                    <div class="product__choice-wrapper" data-element="choice"></div>
                    <p class="product__description">${this._description}</p>
                    <div class="product__btn" data-element="button"></div>
                </div>
            </div>`;
  }

  _setStateClickFavorite(state) {
    this._state.clickFavorite = state;
  }

  _setStateClickFavoriteHandler(state) {
    this._setStateClickFavorite(state);
    this._updateUI();
  }

  _setStateFirstStart(state) {
    this._state.firstStart = state;
  }

  _setStateWattsStart() {
    this._watts
      .filter((watt) => watt.id === 1)
      .map(
        ({ id, text, unit }) =>
          (this._state.watts = {
            id,
            text,
            unit,
          })
      );
  }

  _setStateWatts(id, text, unit) {
    this._state.watts = {
      id,
      text,
      unit,
    };
  }

  _setStateWattsHandler(id, text, unit) {
    this._setStateWatts(id, text, unit);
    this._updateUI();
  }

  _setStateColors(id, text, unit, img) {
    this._state.colors = {
      id,
      text,
      unit,
      img,
    };
  }

  _setStateColorsHandler(id, text, unit, img) {
    this._setStateColors(id, text, unit, img);
    this._updateUI();
  }

  _generateIconMore() {
    return new this._IconMore(this._properties).element;
  }

  _generateIconFavorite() {
    return new this._IconFavorite(this._setStateClickFavoriteHandler.bind(this), {
      active: this._state.clickFavorite,
    }).element;
  }

  _generateProductImgStart() {
    return this._colors
      .filter((color) => color.id === 1)
      .map(({ id, text, unit, img }) => {
        this._setStateColors(id, text, unit, img);
        return new this._ProductImg(img).element;
      });
  }

  _generateProductImgById() {
    return new this._ProductImg(this._state.colors.img).element;
  }

  _generateWattsChoice() {
    return new this._ProductChoice("Watt", this._Choice, this._watts, this._setStateWattsHandler.bind(this)).element;
  }

  _generateColorsChoice() {
    return new this._ProductChoice("Colors", this._Choice, this._colors, this._setStateColorsHandler.bind(this)).element;
  }

  _generateButton() {
    return new this._ProductButton(
      "Buy",
      this._id,
      this._state.colors.img,
      this._title,
      this._price,
      this._state.watts.id,
      this._state.watts.text,
      this._state.colors.id,
      this._state.colors.text
    ).element;
  }

  _render() {
    this._subElements.imgWrapper.setAttribute("class", `product__img-wrapper product__img-wrapper--light-${this._state.watts.text}`);

    this._subElements.more.innerHTML = "";
    this._subElements.imgWrapper.innerHTML = "";
    this._subElements.choice.innerHTML = "";
    this._subElements.choice.innerHTML = "";
    this._subElements.button.innerHTML = "";

    this._subElements.more.append(this._generateIconMore());
    this._subElements.favorite.append(this._generateIconFavorite());

    if (this._state.firstStart) {
      this._subElements.imgWrapper.append(...this._generateProductImgStart());
    }

    this._subElements.choice.append(this._generateWattsChoice());
    this._subElements.choice.append(this._generateColorsChoice());

    this._subElements.button.append(this._generateButton());
  }

  _updateUI() {
    this._subElements.imgWrapper.setAttribute("class", `product__img-wrapper product__img-wrapper--light-${this._state.watts.text}`);

    if (this._state.colors.img) {
      this._subElements.imgWrapper.innerHTML = "";
      this._subElements.imgWrapper.append(this._generateProductImgById());
    }

    this._subElements.favorite.innerHTML = "";
    this._subElements.favorite.append(this._generateIconFavorite());

    this._subElements.button.innerHTML = "";
    this._subElements.button.append(this._generateButton());
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
