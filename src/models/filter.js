import mongoose from "mongoose";

const filterOptionSchema = new mongoose.Schema({
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const filterFieldSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      unique: true,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      default: "",
    },
    groupType: {
      type: Number,
      required: true,
    },
    options: {
      type: [filterOptionSchema],
      default: [],
    },
  },
  { collection: "filters" }
);

const Filter = mongoose.model("FilterCategory", filterFieldSchema);

export default Filter;
