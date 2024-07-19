import Logo from "../models/logo.js";

export const getLogo = async (req, res) => {
  try {
    const logo = await Logo.findOne();
    if (!logo) {
      return res.status(404).json({ message: "Логотип не найден" });
    }

    const { _id, ...logoContent } = logo.toObject();
    res.status(200).json(logoContent);
  } catch (error) {
    console.error("Ошибка при получении логотипа:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
