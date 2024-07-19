import Product from "../models/product.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).json({ message: "Товары не найдены" });
    }

    const productList = products.map((product) => {
      const { _id, ...rest } = product.toObject();
      return rest;
    });

    res.status(200).json(productList);
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
    res.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};
