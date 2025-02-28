module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
    
    // find all products
    router.post("/", products.createProduct);
    
    router.get("/all", products.findProducts);
  
    app.use("/api/products", router);
  };
  