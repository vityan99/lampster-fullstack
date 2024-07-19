import User from "../models/user.js";

export const userPasswordChange = async (req, res) => {
  try {
    const { id, oldPassword, newPassword } = req.body;

    if (!id || !oldPassword || !newPassword) {
      console.log("Missing fields:", { id, oldPassword, newPassword });
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.userPassword !== oldPassword) {
      return res.status(400).json({ message: "Incorrect old password" });
    }

    user.userPassword = newPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Ошибка при изменении пароля:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
