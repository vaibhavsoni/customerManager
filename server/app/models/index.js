const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.customers = require("./customer.model.js")(sequelize, Sequelize);
db.orders = require("./orders.model.js")(sequelize, Sequelize);
db.products = require("./products.model.js")(sequelize, Sequelize);

db.customers.hasMany(db.orders, {
  foreignKey: "customer_id",
  as: "orders"
});

db.orders.belongsTo(db.customers, {
  foreignKey: "customer_id",
  as: "customer"
});

db.orders.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product"
});

module.exports = db;
