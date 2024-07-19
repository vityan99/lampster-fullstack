export const TELEGRAM_BOT_TOKEN = ""; // Your telegram bot token
export const TELEGRAM_BOT_ID = ""; // Your telegram bot id

export const createOrderMessage = (userName, userSurname, userPhone, userAdress, orderData, orderNumber) => {
  const itemsDetails = orderData
    .map(
      (order, index) => `
    Товар ${index + 1}:
    Наименование товара: ${order.title}
    Цена: ${order.price}
    Количество Вт: ${order.wattsText}
    Цвет: ${order.colorText}
    Количество: ${order.count}
  `
    )
    .join("\n");

  const totalPrice = orderData.reduce((acc, product) => acc + product.price * product.count, 0);

  return `Новый заказ:\nИмя: ${userName}\nФамилия: ${userSurname}\nТелефон: ${userPhone}\nАдрес: ${userAdress}\n${itemsDetails}\nОбщая стоимость заказа: ${totalPrice} руб.\nНомер заказа: ${orderNumber}`;
};
