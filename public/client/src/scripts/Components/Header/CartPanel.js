import { createElement } from "../../Functions/createElement.js";

export class CartPanel {
  _element = null;
  _subElements = null;
  _state = {
    allProducts: [],
    filteredProducts: [],
    deletedProduct: {},
  };

  constructor(cartTitle, CartItem, buttonTitle, Icon, iconDelete, setStateTotalInfoHandler) {
    this._cartTitle = cartTitle;
    this._CartItem = CartItem;
    this._buttonTitle = buttonTitle;
    this._Icon = Icon;
    this._iconDelete = iconDelete;
    this._setStateTotalInfoHandler = setStateTotalInfoHandler;
    this._init();
  }

  _init() {
    this._element = createElement(this._getTemplate());
    this._subElements = this._getSubElements();
    this._addListeners();
  }

  _getTemplate() {
    return `<div class="mini-cart-list-wrapper">
                <span class="mini-cart-list-wrapper__title">${this._cartTitle}</span>
                <div class="mini-cart-list" data-element="cartItems"></div>
                <button type="submit" class="btn btn--order" data-element="btnOrder">${this._buttonTitle}</button>
            </div>`;
  }

  _setStateAllProducts(content) {
    this._state.allProducts.push(content);
    this._filterProducts();
  }

  _setStateDeletedProduct(state) {
    this._state.deletedProduct = state;
  }

  _setStateDeletedProductHandler(state) {
    this._setStateDeletedProduct(state);
    this._updateTotalInfoAfterDelete();
  }

  _updateTotalInfoAfterDelete() {
    this._state.allProducts = this._state.allProducts.filter((product) => product.productId !== this._state.deletedProduct.productId);

    this._state.filteredProducts = this._state.filteredProducts.filter((product) => {
      if (product.productId === this._state.deletedProduct.productId) {
        product.count -= this._state.deletedProduct.count;
        product.price -= this._state.deletedProduct.price;
      }
      return !(product.price === 0 && product.count === 0);
    });

    this._setStateTotalInfoHandler(this._getTotal());
    this._render();
  }

  _filterProducts() {
    this._state.filteredProducts = Object.values(
      this._state.allProducts.reduce((acc, product) => {
        if (!acc[product.productId]) {
          acc[product.productId] = { ...product, count: 0 };
        }
        acc[product.productId].count += 1;
        return acc;
      }, {})
    );
  }

  _getTotal() {
    return this._state.filteredProducts.reduce(
      (acc, product) => {
        acc.totalCount += product.count;
        acc.totalPrice += product.price * product.count;
        return acc;
      },
      { totalPrice: 0, totalCount: 0 }
    );
  }

  _sendOrderRequest() {
    const order = JSON.stringify({
      orderData: this._state.filteredProducts,
    });

    const request = new XMLHttpRequest();
    request.open("POST", "/order", true);

    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function () {
      const recievedOrder = JSON.parse(request.response);
      console.log(recievedOrder.message);
    });
    request.send(order);
  }

  _generateCartItem() {
    return this._state.filteredProducts.map(({ productId, img, title, price, wattsId, colorId, count }) => {
      return new this._CartItem(
        this._Icon,
        this._iconDelete,
        productId,
        img,
        title,
        price,
        wattsId,
        colorId,
        count,
        this._setStateDeletedProductHandler.bind(this)
      ).element;
    });
  }

  _addListeners() {
    document.body.addEventListener("addToCart", (e) => {
      this._setStateAllProducts(e.detail);
      this._setStateTotalInfoHandler(this._getTotal());
      this._render();
    });

    this._subElements.btnOrder.addEventListener("click", (e) => {
      if (this._state.allProducts.length === 0) {
        return;
      }

      this._element.dispatchEvent(
        new CustomEvent("popupOrder", {
          bubbles: true,
          detail: this._state.filteredProducts,
        })
      );
    });
  }

  _render() {
    this._subElements.cartItems.innerHTML = "";
    this._subElements.cartItems.append(...this._generateCartItem());
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
