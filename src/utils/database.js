import mongoose from "mongoose";

const db = ""; // Your database link

const connectDatabase = () =>
  mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to DB"))
    .catch((error) => console.log("DB connection error:", error));

const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    console.log("Database disconnected");
  } catch (err) {
    console.error("Error disconnecting from database:", err);
  }
};

export default connectDatabase;
export { disconnectDatabase };
