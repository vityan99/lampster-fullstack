import path from "path";
import { dirname } from "../utils/pathUtils.js";

const __dirname = dirname(import.meta);

export const getNotFoundPage = (req, res) => {
  const clientPath = path.join(__dirname, "../../public/client");
  const pageNotFound = path.join(clientPath, "404.html");
  res.sendFile(pageNotFound);
};
