module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("order", {
      order_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sales_person_id: {
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER
      },
      product_id: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      }
    });
  
    return Order;
  };
  