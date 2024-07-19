import Order from "../models/order.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Ошибка при получении заказов:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
