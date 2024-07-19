import mongoose from "mongoose";

const logoSchema = new mongoose.Schema(
  {
    logoIcon: {
      type: String,
      unique: true,
    },
    textFirstPart: {
      type: String,
      unique: true,
    },
    textSecondPart: {
      type: String,
      unique: true,
    },
  },
  {
    collection: "logo",
  }
);

const Logo = mongoose.model("Logo", logoSchema);

export default Logo;
