import path from "path";
import { dirname } from "../utils/pathUtils.js";

const __dirname = dirname(import.meta);

export const getAdminPage = (req, res) => {
  const adminPath = path.join(__dirname, "../../public/admin");
  const adminPage = path.join(adminPath, "admin.html");
  res.sendFile(adminPage);
};
