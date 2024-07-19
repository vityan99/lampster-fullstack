import Order from "../models/order.js";

export const statusChange = async (req, res) => {
  const { orderNumber, orderStatus, userName, date } = req.body;

  console.log(orderNumber);

  try {
    const order = await Order.findOne({ orderNumber });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status.forEach((status) => {
      status.selected = status.text === orderStatus;
    });

    order.lastModifiedBy = userName;
    order.date = date;

    await order.save();

    return res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred", error });
  }
};
