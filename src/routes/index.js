const express = require("express");
const router = express.Router();
const clientsController = require("../controllers/clientsController");
const productsController = require("../controllers/productsController");
const ordersController = require("../controllers/ordersController");
const authController = require("../controllers/authController");

module.exports = function () {
  
  router.post('/register', authController.register)
  router.post('/login', authController.login)
  
  
  router.post("/clients", clientsController.newClient);
  router.get("/clients", clientsController.allClients);
  router.get("/clients/:id", clientsController.showClient);
  router.put("/clients/:id", clientsController.updateClient);
  router.delete("/clients/:id", clientsController.deleteClient);
  
  router.post(
    "/products",
    productsController.uploadFile,
    productsController.newProduct
  );
  router.get("/products", productsController.allProduct);
  router.get("/products/:id", productsController.showProduct);

  router.put(
    "/products/:id",
    productsController.uploadFile,
    productsController.updateProduct
  );

  router.delete("/products/:id", productsController.deleteProduct);

  router.post("/orders", ordersController.newOrder)
  router.get("/orders", ordersController.allOrder)
  router.get("/orders/:id", ordersController.showOrder);
  router.put("/orders/:id", ordersController.updateOrder);
  router.delete("/orders/:id", ordersController.deleteOrder);

  return router;
};
