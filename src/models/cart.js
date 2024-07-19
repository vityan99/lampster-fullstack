import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      unique: true,
    },
    cartTitle: {
      type: String,
      unique: true,
    },
    buttonTitle: {
      type: String,
      unique: true,
    },
    iconDelete: {
      type: String,
      unique: true,
    },
  },
  {
    collection: "cart",
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
