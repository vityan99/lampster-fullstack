import path from "path";
import { fileURLToPath } from "url";

export const dirname = (meta) => {
  const __filename = fileURLToPath(meta.url);
  return path.dirname(__filename);
};
