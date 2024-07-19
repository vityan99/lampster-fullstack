import express from "express";
import connectDatabase, { disconnectDatabase } from "./utils/database.js";
import clientRoute from "./routes/clientRoute.js";
import aboutRoute from "./routes/aboutRoute.js";
import contactsRoute from "./routes/contactsRoute.js";
import notFoundRoute from "./routes/notFoundRoute.js";
import adminRoute from "./routes/adminRoute.js";
import loginRoute from "./routes/loginRoute.js";
import orderRoute from "./routes/orderRoute.js";
import registerRoute from "./routes/registerRoute.js";
import passwordChangeRoute from "./routes/passwordChangeRoute.js";
import settingsRoute from "./routes/settingsRoute.js";
import logoRoute from "./routes/logoRoute.js";
import cartRoute from "./routes/cartRoute.js";
import searchRoute from "./routes/searchRoute.js";
import menuRoute from "./routes/menuRoute.js";
import filterRoute from "./routes/filterRoute.js";
import productRoute from "./routes/productRoute.js";
import path from "path";
import { dirname } from "./utils/pathUtils.js";

const app = express();

connectDatabase();

const __dirname = dirname(import.meta);

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/", express.static(path.join(__dirname, "../public/client")));
app.use("/", clientRoute);
app.use("/about", aboutRoute);
app.use("/contacts", contactsRoute);

app.use("/admin", express.static(path.join(__dirname, "../public/admin")));
app.use("/admin", adminRoute);

app.use("/", loginRoute);
app.use("/", orderRoute);
app.use("/", registerRoute);
app.use("/", passwordChangeRoute);
app.use("/", logoRoute);
app.use("/", settingsRoute);
app.use("/", cartRoute);
app.use("/", searchRoute);
app.use("/", menuRoute);
app.use("/", filterRoute);
app.use("/", productRoute);

app.use("*", notFoundRoute);

const gracefulShutdown = () => {
  console.log("Closing database connections...");
  disconnectDatabase()
    .then(() => {
      console.log("Database connections closed.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error closing database connections:", err);
      process.exit(1);
    });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default app;
