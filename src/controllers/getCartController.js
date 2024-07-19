import Cart from "../models/cart.js";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: "Корзина не найдена" });
    }

    const { _id, ...cartContent } = cart.toObject();
    res.status(200).json(cartContent);
  } catch (error) {
    console.error("Ошибка при получении корзины:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
