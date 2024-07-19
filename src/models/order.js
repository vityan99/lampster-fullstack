import mongoose from "mongoose";
import Counter from "./counter.js";

const statusSchema = new mongoose.Schema({
  selected: {
    type: Boolean,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  userSurname: {
    type: String,
    required: true,
  },
  userPhone: {
    type: String,
    required: true,
  },
  userAdress: {
    type: String,
    required: true,
  },
  orderData: {
    type: Array,
    required: true,
  },
  status: {
    type: [statusSchema],
    default: [
      { selected: true, text: "Обрабатывается" },
      { selected: false, text: "Собирается" },
      { selected: false, text: "Ждет отправки" },
      { selected: false, text: "Передан в службу доставки" },
    ],
    required: true,
  },
  lastModifiedBy: { type: String, default: "", required: false },
  date: {
    type: String,
    default: "",
    required: false,
  },
});

orderSchema.pre("save", async function (next) {
  if (this.isNew) {
    const doc = this;

    try {
      const counter = await Counter.findByIdAndUpdate({ _id: "orderNumber" }, { $inc: { seq: 1 } }, { new: true, upsert: true });

      doc.orderNumber = counter.seq;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
