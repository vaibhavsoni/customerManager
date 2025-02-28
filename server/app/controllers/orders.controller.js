const { where } = require("sequelize");
const db = require("../models");
const Orders = db.orders;
const Op = db.Sequelize.Op;

// Create and Save a new orders
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customerId) {
    res.status(400).send({
      message: "customerId can not be empty!"
    });
    return;
  }

  // Create a order
  const order = {
    sales_person_id: req.body.salesPersonId,
    customer_id: req.body.customerId,
    product_id: req.body.productId,
    quantity: req.body.quantity
  };
  console.log("Creating order: ", order);
  // Save in the database
  Orders.create(order)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log("Error saving Order", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Order."
      });
    });
};

// Retrieve all from the database.
exports.findCustomerOrder = (req, res) => {
  Orders.findAll({where: {customer_id: req.params.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Orders."
      });
    });
};

// Find a single with an id
exports.findOrders = (req, res) => {
  const id = req.params.id;
  console.log("id from request: {id}",id);

  Orders.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Customer with id=" + id
      });
    });
};
