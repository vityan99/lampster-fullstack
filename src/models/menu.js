import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
    },
    link: {
      type: String,
      unique: true,
    },
  },
  {
    collection: "menu",
  }
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
