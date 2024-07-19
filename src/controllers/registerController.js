import User from "../models/user.js";

export const newUser = async (req, res) => {
  try {
    const { name, userEmail, userPassword, status } = req.body;
    console.log(`Получен пользователь: ${name}, ${userEmail}, ${userPassword}, ${status}`);

    const existingUser = await User.findOne({ userEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Пользователь с таким email уже существует" });
    }

    const user = new User({
      name,
      userEmail,
      userPassword,
      status,
    });

    console.log(`Сохраняем пользователя: ${JSON.stringify(user, null, 2)}`);
    await user.save();
    console.log(`Создан пользователь: ${JSON.stringify(user, null, 2)}`);

    res.status(201).json(user);
  } catch (error) {
    console.error("Ошибка при создании пользователя:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
