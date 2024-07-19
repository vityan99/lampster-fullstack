import Filter from "../models/filter.js";

export const getFilter = async (req, res) => {
  try {
    const filter = await Filter.find();

    if (!filter || filter.length === 0) {
      return res.status(404).json({ message: "Фильтры для магазина не найдены" });
    }

    const filterConfig = filter.map((filter) => {
      const { _id, ...rest } = filter.toObject();
      return rest;
    });

    res.status(200).json(filterConfig);
  } catch (error) {
    console.error("Ошибка при получении фильтров магазина:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
