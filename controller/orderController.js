import Order from "../models/orderModel.js";

export const getUserOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching orders" });
  }
};
