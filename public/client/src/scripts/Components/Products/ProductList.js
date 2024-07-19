import { createElement } from "../../Functions/createElement.js";

export class ProductList {
  _element = null;
  _state = {
    searchProduct: "",
    filter: [],
    productData: {},
  };

  constructor(Product, IconMore, IconFavorite, ProductImg, ProductChoice, Choice, ProductButton) {
    this._Product = Product;
    this._IconMore = IconMore;
    this._IconFavorite = IconFavorite;
    this._ProductImg = ProductImg;
    this._ProductChoice = ProductChoice;
    this._Choice = Choice;
    this._ProductButton = ProductButton;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._addListeners();
    this._getProductData();
  }

  _getTemplate() {
    return `<div class="products-list"></div>`;
  }

  _setStateProductData(state) {
    this._state.productData = state;
  }

  _getProductData() {
    fetch("/getProduct")
      .then((response) => response.json())
      .then((data) => this._setStateProductData(data))
      .then(() => this._render())
      .catch((error) => console.error(error));
  }

  _generateProduct(filteredProducts = this._state.productData, searchWord = "") {
    return filteredProducts.map(({ id, title, price, priceType, description, properties, watts, colors }) => {
      return new this._Product(
        this._IconMore,
        this._IconFavorite,
        this._ProductImg,
        this._ProductChoice,
        this._Choice,
        this._ProductButton,
        id,
        title,
        price,
        priceType,
        description,
        properties,
        watts,
        colors,
        searchWord
      ).element;
    });
  }

  _searchProducts() {
    const searchItem = this._state.searchProduct.toLowerCase();
    return this._state.productData.filter((product) => product.title.toLowerCase().includes(searchItem));
  }

  _filterProducts(products) {
    return products.filter((product) => {
      return this._state.filter.every((filter) => {
        const productProperty = product.properties.find((property) => property.key === filter.key);

        if (filter.key === "price") {
          if (filter.direction === "from") {
            return product.price >= parseFloat(filter.value);
          } else if (filter.direction === "to") {
            return product.price <= parseFloat(filter.value);
          }
          return true;
        } else if (productProperty) {
          if (filter.direction === "") {
            return productProperty.value == filter.value;
          }
        }

        return false;
      });
    });
  }

  _setStateFilter(data) {
    const { key, direction = "", value } = data;
    const existingFilterIndex = this._state.filter.findIndex((filter) => filter.key === key && filter.direction === direction);

    if (existingFilterIndex > -1) {
      if (value === "") {
        this._state.filter.splice(existingFilterIndex, 1);
      } else {
        this._state.filter[existingFilterIndex].value = value;
      }
    } else if (value !== "") {
      this._state.filter.push({
        key,
        direction,
        value,
      });
    }
    this._render();
  }

  _clearFilters() {
    this._state.filter = [];
    this._render();
  }

  _setStateSearchProduct(state) {
    this._state.searchProduct = state;
    this._render();
  }

  _addListeners() {
    document.body.addEventListener("searchProduct", (e) => {
      this._setStateSearchProduct(e.detail);
    });

    document.body.addEventListener("filterInput", (e) => {
      this._setStateFilter(e.detail);
    });

    document.body.addEventListener("clearFilters", () => {
      this._clearFilters();
    });

    document.body.addEventListener("filterOption", (e) => {
      this._setStateFilter(e.detail);
    });
  }

  _render() {
    const searchedProducts = this._searchProducts();
    const filteredProducts = this._state.filter.length ? this._filterProducts(searchedProducts) : searchedProducts;
    this._element.innerHTML = "";
    this._element.append(...this._generateProduct(filteredProducts, this._state.searchProduct));
  }

  get element() {
    return this._element;
  }
}
