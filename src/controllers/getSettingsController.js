import Settings from "../models/settings.js";

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find();

    if (!settings || settings.length === 0) {
      return res.status(404).json({ message: "Настройки для CRM-панели не найдены" });
    }

    const settingsConfig = settings.map((setting) => {
      const { _id, ...rest } = setting.toObject();
      return rest;
    });

    res.status(200).json(settingsConfig);
  } catch (error) {
    console.error("Ошибка при получении настроек CRM-панели:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
