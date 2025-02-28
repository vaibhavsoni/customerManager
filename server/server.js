const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then()
  .then(() => {
    console.log("Synced db.");
  })
  .then(()=> {
    // insert some sample products
    const Products = db.products;

    for (let i = 0; i < 5; i++) {
      const product = {
        name: "SAMPLE_PRODUCT_" + i,
        price: 100 + i
      };

      Products.create(product);
      console.log("Adding sample product: ", i);
    }
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to customer order management application." });
});

require("./app/routes/customer.routes")(app);
require("./app/routes/order.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/employee.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
