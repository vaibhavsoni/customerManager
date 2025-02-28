const db = require("../models");
const Products = db.products;
const Op = db.Sequelize.Op;

// Retrieve all products from the database.
exports.findProducts = (req, res) => {
  Products.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};

// Create and Save a new product
exports.createProduct = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  // Create a order
  const product = {
    name: req.body.name,
    price: req.body.price
  };

  // Save Product in the database
  Products.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};
