import Search from "../models/search.js";

export const getSearch = async (req, res) => {
  try {
    const search = await Search.findOne();
    if (!search) {
      return res.status(404).json({ message: "Информация о поиске не найдена" });
    }

    const { _id, ...searchContent } = search.toObject();
    res.status(200).json(searchContent);
  } catch (error) {
    console.error("Ошибка при получении информации о поиске:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
