import Order from "../models/order.js";
import axios from "axios";
import { TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_ID, createOrderMessage } from "../utils/telegramConfig.js";

export const createOrder = async (req, res) => {
  try {
    const { userName, userSurname, userPhone, userAdress, orderData } = req.body;

    const newOrder = new Order({
      userName,
      userSurname,
      userPhone,
      userAdress,
      orderData,
    });

    await newOrder.save();

    await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      chat_id: TELEGRAM_BOT_ID,
      text: createOrderMessage(userName, userSurname, userPhone, userAdress, orderData, newOrder.orderNumber),
    });

    res.status(200).json({ message: "Заказ успешно создан", orderNumber: newOrder.orderNumber });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
