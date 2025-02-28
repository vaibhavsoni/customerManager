module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      employee_id: {
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
  
    return Employee;
  };
  