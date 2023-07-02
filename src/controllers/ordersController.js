const Order = require("../models/Order");

exports.newOrder = async (req, res, next) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ message: "Orden Creado Correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear la Orden" });
    next();
  }
};

exports.allOrder = async (req, res, next) => {
  try {
    res.json(
      await Order.find({}).populate("client").populate({
        path: "order.product",
        model: "Product",
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al mostrar la Orden" });
    next();
  }
};

exports.showOrder = async (req, res, next) => {
  order = await Order.findById({ _id: req.params.id })
    .populate("client")
    .populate({
      path: "order.product",
      model: "Product",
    });

  if (!order) {
    res.status(404).json({ error: "la orden no existe" });
  }

  res.json(order);
};

exports.updateOrder = async (req, res, next) => {
  try {
    res.json(
      await Order.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      })
        .populate("client")
        .populate({
          path: "order.product",
          model: "Product",
        })
    );
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la Orden" });
    next();
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.findOneAndDelete({ _id: req.params.id })
    res.json({ message: "Orden Eliminada Correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al Eliminar la Orden" });
    next();
  }
};
