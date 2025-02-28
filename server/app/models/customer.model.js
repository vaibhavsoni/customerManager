module.exports = (sequelize, Sequelize) => {
  const Customer = sequelize.define("customer", {
    customer_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    middle_initial: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    }
  });

  return Customer;
};
