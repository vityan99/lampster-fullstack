import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      unique: true,
    },
    placeholder: {
      type: String,
      unique: true,
    },
  },
  {
    collection: "search",
  }
);

const Search = mongoose.model("Search", searchSchema);

export default Search;
