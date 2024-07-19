import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      unique: false,
    },
    value: {
      type: String,
      unique: true,
    },
  },
  {
    collection: "crm-settings-values",
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
