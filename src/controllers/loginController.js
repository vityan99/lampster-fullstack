import User from "../models/user.js";

export const loginUser = async (req, res) => {
  try {
    const { userEmail, userPassword } = req.body;
    console.log(`Получен email: ${userEmail}, пароль: ${userPassword}`);

    if (!userEmail || !userPassword) {
      console.log("Email или пароль отсутствует.");
      return res.status(400).json({ message: "Email и пароль обязательны" });
    }

    const loginUser = await User.findOne({ userEmail: userEmail });
    console.log(`Найден пользователь: ${loginUser}`);

    if (!loginUser) {
      console.log("Пользователь не найден");
      return res.status(401).json({ message: "Неверный email или пароль" });
    }

    const isPasswordValid = userPassword === loginUser.userPassword;
    console.log(`Пароль верный: ${isPasswordValid}`);

    if (isPasswordValid) {
      return res.status(200).json(loginUser);
    } else {
      console.log("Несоответствие пароля");
      return res.status(401).json({ message: "Неверный email или пароль" });
    }
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
