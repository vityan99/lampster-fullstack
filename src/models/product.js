import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  key: { type: String, required: true },
  text: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  unit: { type: String },
  groupType: { type: Number, required: true },
});

const wattsSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: Number, required: true },
  unit: { type: String, required: true },
});

const colorSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  text: { type: String, required: true },
  unit: { type: String, default: "" },
  img: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    priceType: { type: String, required: true },
    description: { type: String, required: true },
    properties: [propertySchema],
    watts: [wattsSchema],
    colors: [colorSchema],
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
