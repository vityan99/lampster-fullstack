import path from "path";
import { dirname } from "../utils/pathUtils.js";

const __dirname = dirname(import.meta);

export const getContactsPage = (req, res) => {
  const clientPath = path.join(__dirname, "../../public/client");
  const contactsPage = path.join(clientPath, "contacts.html");
  res.sendFile(contactsPage);
};
