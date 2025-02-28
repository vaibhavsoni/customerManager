module.exports = app => {
  const orders = require("../controllers/orders.controller.js");

  var router = require("express").Router();
  
  router.post("/", orders.create);
  
  // find all orders for customer
  router.get("/:id", orders.findCustomerOrder);

  app.use("/api/orders", router);
};
