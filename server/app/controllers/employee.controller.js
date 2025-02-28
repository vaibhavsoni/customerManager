const db = require("../models");
const Employees = db.employees;
const Op = db.Sequelize.Op;


// Create and Save a new product
exports.create = (req, res) => {
    console.log("Body:", req.body)
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!"
    });
    return;
  }

  // Create a order
  const employee = {
    first_name: req.body.firstName,
    middle_initial: req.body.middleInitial,
    last_name: req.body.lastName
  };

  // Save Product in the database
  Employees.create(employee)
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
