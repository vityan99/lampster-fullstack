import path from "path";
import { dirname } from "../utils/pathUtils.js";

const __dirname = dirname(import.meta);

export const getAboutPage = (req, res) => {
  const clientPath = path.join(__dirname, "../../public/client");
  const aboutPage = path.join(clientPath, "about.html");
  res.sendFile(aboutPage);
};
