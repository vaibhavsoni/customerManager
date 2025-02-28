module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      product_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL
      }
    });
  
    return Product;
  };
  