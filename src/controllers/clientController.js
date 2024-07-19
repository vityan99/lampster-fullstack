import path from "path";
import { dirname } from "../utils/pathUtils.js";

const __dirname = dirname(import.meta);

export const getClientPage = (req, res) => {
  const clientPath = path.join(__dirname, "../../public/client");
  const clientPage = path.join(clientPath, "index.html");
  res.sendFile(clientPage);
};
