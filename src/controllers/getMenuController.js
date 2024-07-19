import Menu from "../models/menu.js";

export const getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();

    if (!menu || menu.length === 0) {
      return res.status(404).json({ message: "Меню для магазина не найдено" });
    }

    const menuConfig = menu.map((menu) => {
      const { _id, ...rest } = menu.toObject();
      return rest;
    });

    res.status(200).json(menuConfig);
  } catch (error) {
    console.error("Ошибка при получении меню магазина:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
